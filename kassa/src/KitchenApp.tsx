import { RouteSectionProps } from "@solidjs/router";
import { createSignal, For, onCleanup, Show, type Component } from "solid-js";
import { OrderModel, TransactionModel } from "./models/order";
import { createTimer } from "@solid-primitives/timer";
import sound from "./assets/mixkit-small-group-cheer-and-applause-518.wav";

const [transactions, setTransactions] = createSignal<TransactionModel[]>([]);
const [getAudio, setAudio] = createSignal<HTMLAudioElement | null>(null);

function connectWebSocket() {
  // Dynamically create the WebSocket URL
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const hostname = window.location.hostname; // Same IP/Hostname as the current page
  const port = 1000; // Replace with your desired port
  const wsUrl = `${protocol}//${hostname}:${port}`;

  // Create a new WebSocket connection
  const ws = new WebSocket(wsUrl);
  ws.onopen = () => {
    console.log("WebSocket connected");
  };

  ws.onmessage = (event) => {
    const json = JSON.parse(event.data);
    if (json instanceof Array) {
      console.log(json);
      setTransactions(json);
      playAudio();
    }
  };

  ws.onerror = (event) => {
    console.error(event);
  };

  return function () {
    ws.close();
  };
}

function enableAudio() {
  const audio = new Audio(sound);
  audio.load();
  setAudio(audio);
}

function playAudio() {
  const audio = getAudio();
  if (audio)
    audio.play().catch((error) => {
      alert(error);
    });
}

const ElapsedTime: Component<{ date: Date }> = (props) => {
  const pivot = new Date(props.date);
  const [getDiff, setDiff] = createSignal<number>(
    new Date().getTime() - pivot.getTime()
  );

  function getElapsedTime() {
    const now = new Date();
    now.getTime() - pivot.getTime();

    const totalSeconds = getDiff() / 1000;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Pad with leading zeros if needed
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds.toFixed(0)).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  createTimer(
    () => setDiff(new Date().getTime() - pivot.getTime()),
    500,
    setInterval
  );

  return <span>{getElapsedTime()}</span>;
};

const KitchenApp: Component<RouteSectionProps<unknown>> = (props) => {
  const disposeWebSocket = connectWebSocket();

  onCleanup(() => {
    disposeWebSocket();
  });

  return (
    <div>
      <h1 class="text-3xl m-auto text-center">Kitchen</h1>

      <div class="text-center">
        <Show when={!getAudio()}>
          <button
            class="text-center m-auto border bg-blue-300 px-2"
            onClick={enableAudio}
          >
            Enable audio
          </button>
        </Show>
      </div>

      <For each={transactions()}>
        {(transaction, index) => (
          // rendering logic for each element

          <div class="border-2 border-slate-300 p-2 m-2 shadow-md">
            <button
              class="border border-red-400 px-2 text-red-600"
              onClick={() => closeTransaction(transaction.id)}
            >
              Close order
            </button>
            <span class="float-right">
              <ElapsedTime date={transaction.date} />
            </span>

            {transaction.orders.map((order) => (
              <div class="border border-red-300 my-2">
                <h1 class="p-1 bg-slate-600 text-white">{order.description}</h1>

                <div class="flex flex-wrap ">
                  {getOrderAttributes(order).map((attr) => (
                    <span class="border-2 rounded-md border-slate-400 m-1 px-2 whitespace-nowrap">
                      {attr}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </For>
    </div>
  );
};

function getOrderAttributes(order: OrderModel) {
  const attrs: any[] = [];

  for (const r of Object.keys(order.radio)) {
    attrs.push(`${r}=${order.radio[r].title}`);
  }

  for (const r of Object.keys(order.checkbox)) {
    attrs.push(r);
  }

  for (const r of Object.keys(order.counters)) {
    const count = order.counters[r].count;
    if (count > 0) attrs.push(`${r} X ${count}`);
  }

  return attrs;
}

function closeTransaction(trxId: string) {
  fetch("/close", {
    body: trxId,
    method: "POST",
  });
}

export default KitchenApp;

import { RouteSectionProps } from "@solidjs/router";
import { createSignal, For, onCleanup, Show, type Component } from "solid-js";
import { OrderModel, TransactionModel } from "./models/order";
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

const KitchenApp: Component<RouteSectionProps<unknown>> = (props) => {
  const disposeWebSocket = connectWebSocket();

  onCleanup(() => {
    disposeWebSocket();
  });

  return (
    <div>
      <h1>Kitchen</h1>

      <Show when={!getAudio()}>
        <button onClick={enableAudio}>Enable audio</button>
      </Show>

      <For each={transactions()}>
        {(transaction, index) => (
          // rendering logic for each element

          <div class="border border-slate-300 p-2 m-2 shadow-lg">
            <button
              class="border border-red-400 px-2 text-red-600"
              onClick={() => closeTransaction(transaction.id)}
            >
              Close order
            </button>

            {transaction.orders.map((order) => (
              <div class="border border-red-300 my-2">
                <h1 class="p-1 bg-slate-600 text-white">{order.description}</h1>

                <div class="flex flex-wrap ">
                  {getOrderAttributes(order).map((attr) => (
                    <span class="border rounded px-2 whitespace-nowrap">
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

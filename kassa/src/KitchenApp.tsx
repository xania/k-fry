import { RouteSectionProps } from "@solidjs/router";
import { createSignal, For, onCleanup, type Component } from "solid-js";
import { OrderModel } from "./models/order";
import sound from "./assets/mixkit-small-group-cheer-and-applause-518.wav";

type TransactionModel = {
  orders: OrderModel[];
};

function connectWebSocket() {
  // Dynamically create the WebSocket URL
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const hostname = window.location.hostname; // Same IP/Hostname as the current page
  const port = 1000; // Replace with your desired port
  const wsUrl = `${protocol}//${hostname}:${port}`;

  // Create a new WebSocket connection
  return new WebSocket(wsUrl);
}

const KitchenApp: Component<RouteSectionProps<unknown>> = (props) => {
  const [transactions, setTransactions] = createSignal<TransactionModel[]>([]);

  const ws = connectWebSocket();

  ws.onopen = () => {
    console.log("WebSocket connected");
  };

  ws.onmessage = (event) => {
    const json = JSON.parse(event.data);
    if (Array.isArray(json)) {
      setTransactions((x) => [...x, { orders: json }]);

      const audio = document.getElementById("myAudio") as HTMLAudioElement;
      if (audio?.play) audio.play();
    }
  };

  ws.onerror = (event) => {
    console.error(event);
  };

  onCleanup(() => {
    console.log("Cleaning up WebSocket");
  });

  return (
    <div>
      <h1>Kitchen</h1>
      <audio id="myAudio" src={sound}></audio>

      <For each={transactions()}>
        {(item, index) => (
          // rendering logic for each element

          <div class="border border-slate-300 p-3">
            {item.orders.map((x) => (
              <div>{x.description}</div>
            ))}
          </div>
        )}
      </For>
    </div>
  );
};

export default KitchenApp;

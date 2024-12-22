import { WebSocketServer } from "ws";

export interface BroadCaster {
  send(data: any): void;
}

export function start(port: number, init: () => string) {
  const wss = new WebSocketServer({ port });
  console.log(`WebSocket server running on ws://192.168.1.213:${port}`);

  const arr: { send(data: any): void }[] = [];

  wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.send(init());

    // Handle incoming messages
    ws.on("message", (message) => {
      console.log("Received from client:", message);
      ws.send(JSON.stringify({ message: `You said: ${message}` }));
    });

    // Handle client disconnection
    ws.on("close", () => {
      console.log("Client disconnected");

      const index = arr.indexOf(ws);
      if (index >= 0) {
        arr.splice(index, 1);
      }
    });

    arr.push(ws);
  });

  return {
    send(data: any) {
      console.log("broadcast data", data);
      for (const ws of arr) {
        ws.send(data);
      }
    },
  };
}

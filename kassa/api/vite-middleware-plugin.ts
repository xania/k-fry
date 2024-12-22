import type { ViteDevServer, Connect } from "vite";
import { start } from "./broadcast";
import { queue } from "./queue";
import { close } from "./close";
import type { TransactionModel } from "../src/models/order";

type Middleware = {
  route: string;
  fn: Connect.NextHandleFunction;
};

export const db: TransactionModel[] = [];

export function viteMiddlewarePlugin(...middlewares: Middleware[]) {
  return {
    name: "vite-plugin-http",
    configureServer(vite: ViteDevServer) {
      // Create an Express app
      const broadcaster = start(1000, () => JSON.stringify(db));
      vite.middlewares.use("/queue", queue(broadcaster, db));
      vite.middlewares.use("/close", close(broadcaster, db));
      // // Set up the Express app to run on the Vite server
      // for (const m of middlewares) {
      //   vite.middlewares.use(m.route, m.fn);
      // }
    },
  };
}

function runBot() {}

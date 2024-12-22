import { ViteDevServer, Connect } from "vite";
import { start } from "./broadcast";
import { queue } from "./queue";

type Middleware = {
  route: string;
  fn: Connect.NextHandleFunction;
};

export function viteMiddlewarePlugin(...middlewares: Middleware[]) {
  return {
    name: "vite-plugin-http",
    configureServer(vite: ViteDevServer) {
      // Create an Express app
      const broadcaster = start(1000);
      vite.middlewares.use("/queue", queue(broadcaster));
      // // Set up the Express app to run on the Vite server
      // for (const m of middlewares) {
      //   vite.middlewares.use(m.route, m.fn);
      // }
    },
  };
}

function runBot() {}

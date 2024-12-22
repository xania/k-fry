import { ViteDevServer, Connect } from "vite";

type Middleware = {
  route: string;
  fn: Connect.NextHandleFunction
}

export function viteBotPlugin(...middlewares: Middleware[]) {
  return {
    name: "vite-plugin-http",
    configureServer(vite: ViteDevServer) {
      // Create an Express app

      // Set up the Express app to run on the Vite server
      for(const m of middlewares) {
        vite.middlewares.use(m.route, async (req, res, next) => {
          m.fn(req, res)
      });
      }
      vite.middlewares.use("", async (req, res, next) => {
        // Use the Express app to handle HTTP requests
        const reqUrl = req.url || "";

        if (reqUrl.includes("boty")) {
          runBot();
          res.write("bot is taking over");
          res.end();
          return;
        }

        return next();
      });
    },
  };
}

function runBot() {}

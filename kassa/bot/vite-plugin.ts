import { ViteDevServer } from "vite";

import puppeteer from "puppeteer";

export function viteBotPlugin() {
  return {
    name: "vite-plugin-http",
    configureServer(vite: ViteDevServer) {
      // Create an Express app

      // Set up the Express app to run on the Vite server
      vite.middlewares.use(async (req, res, next) => {
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

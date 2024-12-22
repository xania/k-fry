import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteBotPlugin } from "./bot/vite-plugin";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    viteBotPlugin(function(req, res, next) { return next()}),
    solidPlugin(),
  ],
  server: {
    port: 3000,
    open: "/",
  },
  build: {
    target: "esnext",
  },
});

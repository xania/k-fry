import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteMiddlewarePlugin } from "./api/vite-middleware-plugin";
import { queue } from "./api/queue";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    viteMiddlewarePlugin(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: "/",
  },
  build: {
    target: "esnext",
  },
});

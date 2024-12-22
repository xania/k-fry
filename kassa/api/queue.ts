import type { Connect } from "vite";
import { rawBody } from "./utils";
import type { BroadCaster } from "./broadcast";

export const queue: (b: Promise<BroadCaster>) => Connect.NextHandleFunction = (
  b
) =>
  async function (req, res, next) {
    const data = await rawBody(req);

    (await b).send(data);

    res.setHeader("Content-Type", "application/json");
    res.write(data);
    res.end();
  };

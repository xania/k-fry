import type { Connect } from "vite";
import { rawBody } from "./utils";
import type { BroadCaster } from "./broadcast";
import type { TransactionModel } from "../src/models/order";

export const close: (
  b: BroadCaster,
  db: TransactionModel[]
) => Connect.NextHandleFunction = (broadcaster, db) =>
  async function (req, res, next) {
    const transactionId = await rawBody(req);
    const idx = db.findIndex((t) => t.id === transactionId);

    if (idx >= 0) {
      db.splice(idx, 1);
    }

    broadcaster.send(JSON.stringify(db));
    res.end();
  };

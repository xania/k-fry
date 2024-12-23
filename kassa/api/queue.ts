import type { Connect } from "vite";
import { rawBody } from "./utils";
import type { BroadCaster } from "./broadcast";
import type { TransactionModel } from "../src/models/order";

export const queue: (
  b: BroadCaster,
  db: TransactionModel[]
) => Connect.NextHandleFunction = (broadcaster, db) =>
  async function (req, res, next) {
    const data = await rawBody(req);
    const orders = JSON.parse(data);

    db.push({ id: Math.random().toString(), date: new Date(), orders });

    broadcaster.send(JSON.stringify(db));

    res.setHeader("Content-Type", "application/json");
    res.write(data);
    res.end();
  };

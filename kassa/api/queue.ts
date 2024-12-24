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
    const trx = JSON.parse(data);

    db.push(trx);

    broadcaster.send(JSON.stringify(db));

    res.setHeader("Content-Type", "application/json");
    res.write(data);
    res.end();
  };

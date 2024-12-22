import type { Connect } from "vite";

export function jsonBody<T = unknown>(req: Connect.IncomingMessage) {
  return new Promise<T>((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        const jsonBody = JSON.parse(data); // Parse the JSON body
        resolve(jsonBody);
      } catch (err) {
        console.error("Invalid JSON:", err);
        reject("Invalid JSON ");
      }
    });
  });
}

export function rawBody(req: Connect.IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      resolve(data);
    });
  });
}

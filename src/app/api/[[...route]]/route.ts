import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api").get("/", async (c) => {
  return c.text("Hello There");
});

export const GET = handle(app);
export const POST = handle(app);

export type ApiType = typeof app;

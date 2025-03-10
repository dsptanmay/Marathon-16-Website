import { Hono } from "hono";
import { handle } from "hono/vercel";
import userRouter from "./users";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/users", userRouter);

export const GET = handle(app);
export const POST = handle(app);

export type ApiType = typeof routes;

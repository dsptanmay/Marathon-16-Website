import { Hono } from "hono";
import { handle } from "hono/vercel";
import registerRouter from "./signup";
import userRouter from "./userinfo";

const app = new Hono().basePath("/api");

const routes = app
  .route("/user", userRouter)
  .route("/register", registerRouter);

export const GET = handle(app);
export const POST = handle(app);

export type ApiType = typeof routes;

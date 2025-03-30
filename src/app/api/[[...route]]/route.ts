import { Hono } from "hono";
import { handle } from "hono/vercel";
import registerRouter from "./signup";
import userRouter from "./userinfo";
import particiPantsRouter from "./participants";

const app = new Hono().basePath("/api");

const routes = app
  .route("/user", userRouter)
  .route("/register", registerRouter)
  .route("/participants", particiPantsRouter);

export const GET = handle(app);
export const POST = handle(app);

export type ApiType = typeof routes;

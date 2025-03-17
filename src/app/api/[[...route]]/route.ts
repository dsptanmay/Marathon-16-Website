import { Hono } from "hono";
import { handle } from "hono/vercel";
import registerRouter from "./signup";
import userRouter from "./userinfo";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/getuser", userRouter)
  .route("/register", registerRouter);
  

export const GET = handle(app);
export const POST = handle(app);

export type ApiType = typeof routes;

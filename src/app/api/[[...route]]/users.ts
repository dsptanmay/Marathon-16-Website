import { Hono } from "hono";

const userRouter = new Hono()
  .get("/", async (c) => {
    return c.json({ pathfinder: "there" });
  })
  // TODO: view omit documentation for zod
  .post("/:id", async (c) => {
    return c.text(`${id} created successfully!`);
  });

// /api/xyz/<content> -> Param
// /api/xyz?content=value&content2=value2&.....

export default userRouter;

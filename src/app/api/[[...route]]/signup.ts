import { db } from "@/db";
import { Hono } from "hono";
import { masterTable } from "@/db/schema";
import { createUserSchema } from "@/validations/masterSchema";
import { zValidator } from "@hono/zod-validator";

// type UserInput = {
//   unique_code: string;
//   name: string;
//   email?: string;
//   phone_no: string;
//   usn?: string;
// };

const validationMiddleware = zValidator("json", createUserSchema);

const registerRouter = new Hono()
  .post("/girls", validationMiddleware, async (c) => {
    const body = c.req.valid("json");

    const res = await db
      .insert(masterTable)
      .values({
        unique_code: body.unique_code,
        name: body.name,
        phone_no: body.phone_no,
        usn: body.usn,
        category: "girls",
      })
      .returning();

    if (res.length === 0)
      return c.json({ error: "Error in registering user!" }, 400);

    return c.json({ message: "User registered successfully" }, 201);
  })
  .post("/boys", validationMiddleware, async (c) => {
    const body = c.req.valid("json");
    cd;

    const res = await db
      .insert(masterTable)
      .values({
        unique_code: body.unique_code,
        name: body.name,
        phone_no: body.phone_no,
        usn: body.usn,
        category: "boys",
      })
      .returning();

    if (res.length === 0)
      return c.json({ error: "Error in registering user!" }, 400);

    return c.json({ message: "User registered successfully" }, 201);
  })
  .post("/walkathon", validationMiddleware, async (c) => {
    const body = c.req.valid("json");

    const res = await db
      .insert(masterTable)
      .values({
        unique_code: body.unique_code,
        name: body.name,
        phone_no: body.phone_no,
        usn: body.usn,
        category: "walkathon",
      })
      .returning();

    if (res.length === 0)
      return c.json({ message: "Error in registering user!" }, 400);

    return c.json({ message: "User registered successfully" }, 201);
  });

export default registerRouter;

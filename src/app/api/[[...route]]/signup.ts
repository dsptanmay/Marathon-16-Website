import { db } from "@/db";
import { Hono } from "hono";
import { masterTable } from "@/db/schema";
import { createUserSchema, masterSchema } from "@/validations/masterSchema";
import { zValidator } from "@hono/zod-validator";

type UserInput = {
  unique_code: string;
  name: string;
  email?: string;
  phone_no: string;
  usn?: string;
  age: number;
};

const validationMiddleware = zValidator("json", createUserSchema);

const registerRouter = new Hono()
  .post("/girls", validationMiddleware, async (c) => {
    try {
      const body_1 = await c.req.valid("json");
      // TODO : refactor to use .valid json
      // TODO : add handlers to all points individually
      const body = (await c.req.json()) as UserInput;
      const { unique_code, name, email, phone_no, usn } = body;

      if (!unique_code || !name || !phone_no) {
        return c.json({ error: "Missing required fields" }, 400);
      }

      const userData: Partial<UserInput> = { unique_code, name, phone_no };

      if (email) userData.email = email;
      if (usn) userData.usn = usn;

      await db.insert(masterTable).values(userData);

      return c.json({ message: "User registered successfully" });
    } catch (error) {
      return c.json(
        { error: "Something went wrong", details: error.message },
        500
      );
    }
  })
  .post("/boys", validationMiddleware, registerHandler)
  .post("/walkathon", validationMiddleware, registerHandler);

const registerHandler = async (c: any) => {
  try {
    const body = (await c.req.json()) as UserInput;
    const { unique_code, name, email, phone_no, usn } = body;

    if (!unique_code || !name || !phone_no) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const userData: Partial<UserInput> = { unique_code, name, phone_no, age };

    if (email) userData.email = email;
    if (usn) userData.usn = usn;

    await db.insert(masterTable).values(userData);

    return c.json({ message: "User registered successfully" });
  } catch (error) {
    return c.json(
      { error: "Something went wrong", details: error.message },
      500
    );
  }
};

export default registerRouter;

import { db } from "@/db";
import { Hono } from "hono";
import { masterTable } from "@/db/schema";
import { createUserSchema } from "@/validations/masterSchema";
import { zValidator } from "@hono/zod-validator";

type UserInput = {
  unique_code: string;
  name: string;
  email?: string;
  phone_no: string;
  usn?: string;
};

const registerHandler = async (c: any) => {
  try {
    const body = await c.req.valid("json");
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
    return c.json({ error: "Something went wrong", details: error.message }, 500);
  }
};

const validationMiddleware = zValidator("json", createUserSchema);

const registerRouter = new Hono()
  .post("/girls", validationMiddleware, registerHandler)
  .post("/boys", validationMiddleware, registerHandler)
  .post("/walkathon", validationMiddleware, async (c:any) => {
    try {
      const body = await c.req.valid("json");
      const { unique_code, name, email, phone_no} = body;

      if (!unique_code || !name || !phone_no) {
        return c.json({ error: "Missing required fields" }, 400);
      }

      const userData: Partial<UserInput> = { unique_code, name, phone_no };
      if (email) userData.email = email;

      await db.insert(masterTable).values(userData);

      return c.json({ message: "User registered successfully" });
    } catch (error) {
      return c.json({ error: "Something went wrong", details: error.message }, 500);
    }
  });

export default registerRouter;

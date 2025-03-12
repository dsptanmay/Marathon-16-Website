import { db } from "@/db";
import { Hono } from "hono";
import { master } from "@/db/schema";
import { masterSchema } from "@/validations/masterSchema";
import { zValidator } from "@hono/zod-validator";

type UserInput = {
  unique_code: string;
  name: string;
  email?: string;
  phone_no: string;
  usn?: string;
  age: number;
};

const registerRouter = new Hono();

const registerHandler = async (c: any) => {
  try {
    const body = await c.req.json() as UserInput;  
    const { unique_code, name, email, phone_no, usn, age } = body;

    if (!unique_code || !name || !phone_no) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const userData: Partial<UserInput> = { unique_code, name, phone_no, age };

    if (email) userData.email = email;
    if (usn) userData.usn = usn;

    await db.insert(master).values(userData);

    return c.json({ message: "User registered successfully" });
  } catch (error) {
    return c.json({ error: "Something went wrong", details: error.message }, 500);
  }
};

const validationMiddleware = zValidator(
  "json",
  masterSchema.omit({
    category: true,
    isCrossed: true,
    crossTime: true,
    isSitian: true,
    qrcodedata: true,
  })
);

registerRouter.post("/girls", validationMiddleware, registerHandler);
registerRouter.post("/boys", validationMiddleware, registerHandler);
registerRouter.post("/walkathon", validationMiddleware, registerHandler);

export default registerRouter;

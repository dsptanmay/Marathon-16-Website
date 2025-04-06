import { db } from "@/db";
import { Hono } from "hono";
import { masterTable } from "@/db/schema";
import { createUserSchema } from "@/validations/masterSchema";
import { zValidator } from "@hono/zod-validator";
import nodemailer from "nodemailer"

const validationMiddleware = zValidator("json", createUserSchema);

const transporters = [
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "13742shyuvraj@gmail.com",
      pass: "upcl lpqf txlq rdeb",
    },
  }),
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "email2@gmail.com",
      pass: "app_password_2",
    },
  }),
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "email3@gmail.com",
      pass: "app_password_3",
    },
  }),
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "email4@gmail.com",
      pass: "app_password_4",
    },
  }),
];

let transporterIndex = 0;

const getNextTransporter = () => {
  const transporter = transporters[transporterIndex];
  transporterIndex = (transporterIndex + 1) % transporters.length;
  return transporter;
};

const sendEmail = async (to: string, uniqueCode: string) => {
  const transporter = getNextTransporter();

  const mailOptions = {
    from: '"Team PathFinder" <pathfinder@gmail.com>',
    to,
    subject: "Registration Successful",
    text: `You have been successfully registered. Your unique code is: ${uniqueCode}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}:`, info.response);
  } catch (error) {
    console.error(`Error while sending email to ${to}:`, error);
  }
};

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

    if (body.email) await sendEmail(body.email, body.unique_code);

    return c.json({ message: "User registered successfully" }, 201);
  })
  .post("/boys", validationMiddleware, async (c) => {
    const body = c.req.valid("json");

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

    if (body.email) await sendEmail(body.email, body.unique_code);

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

    if (body.email) await sendEmail(body.email, body.unique_code);

    return c.json({ message: "User registered successfully" }, 201);
  });

export default registerRouter;

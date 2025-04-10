import { db } from "@/db";
import { Hono } from "hono";
import { masterTable } from "@/db/schema";
import { createUserSchema } from "@/validations/masterSchema";
import { zValidator } from "@hono/zod-validator";
import nodemailer from "nodemailer";


const validationMiddleware = zValidator("json", createUserSchema);

const transporters = [
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "contact.pathfindersit@gmail.com",
      pass: "wwfz arcg ejmk joao",
    },
  }),
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "marathonpathfinder@gmail.com",
      pass: "qgjq kqrj qsfj ogzb",
    },
  }),
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pathfinderoffical5@gmail.com",
      pass: "yzmx qqrj iiec trgs",
    },
  }),
];

let transporterIndex = 0;
const getNextTransporter = () => {
  const transporter = transporters[transporterIndex];
  transporterIndex = (transporterIndex + 1) % transporters.length;
  return transporter;
};


const sendEmail = async (to: string, uniqueCode: string): Promise<boolean> => {
  const transporter = getNextTransporter();
  const mailOptions = {
    from: '"Team PathFinder" <pathfinder@gmail.com>',
    to,
    subject: "Registration Successful",
    text: `Dear Participant,

Thank you for registering for the PathFinder Marathon 2025. We are excited to have you as part of this special event.

Your registration has been successfully received. Please find your unique participant code below:

Unique Code: ${uniqueCode}

Keep this code safe as it will be required for event verification and entry.

If you have any questions or need further assistance, feel free to reach out to us at pathfinder@gmail.com.

Best regards,  
Team PathFinder
`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}:`, info.response);
    return true;
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error);
    return false;
  }
};


const registerRouter = new Hono()

  // Girls registration
  .post("/girls", validationMiddleware, async (c) => {
    const body = c.req.valid("json");
    const usn = body.usn?.toUpperCase();
    const isSitian = !!usn;

    const res = await db
      .insert(masterTable)
      .values({
        unique_code: body.unique_code,
        name: body.name,
        phone_no: body.phone_no,
        usn,
        category: "girls",
        Gender: "girl",
        isSitian,
      })
      .returning();

    if (res.length === 0)
      return c.json({ error: "Error in registering user!" }, 400);

    const emailSent = body.email ? await sendEmail(body.email, body.unique_code) : false;

    return c.json(
      {
        message: "User registered successfully",
        emailSent: body.email ? emailSent : "No email provided",
      },
      201
    );
  })

  // Boys registration
  .post("/boys", validationMiddleware, async (c) => {
    const body = c.req.valid("json");
    const usn = body.usn?.toUpperCase();
    const isSitian = !!usn;

    const res = await db
      .insert(masterTable)
      .values({
        unique_code: body.unique_code,
        name: body.name,
        phone_no: body.phone_no,
        usn,
        category: "boys",
        Gender: "boy",
        isSitian,
      })
      .returning();

    if (res.length === 0)
      return c.json({ error: "Error in registering user!" }, 400);

    const emailSent = body.email ? await sendEmail(body.email, body.unique_code) : false;

    return c.json(
      {
        message: "User registered successfully",
        emailSent: body.email ? emailSent : "No email provided",
      },
      201
    );
  })

  // Walkathon registration
  .post("/walkathon", validationMiddleware, async (c) => {
    const body = c.req.valid("json");

    const genderValue = body.Gender?.toLowerCase();
    const Gender = genderValue as "girl" | "boy";
    const category = Gender === "girl" ? "walkathon_f" : "walkathon_m";

    const res = await db
      .insert(masterTable)
      .values({
        unique_code: body.unique_code,
        name: body.name,
        phone_no: body.phone_no,
        usn: body.usn,
        category,
        Gender,
      })
      .returning();

    if (res.length === 0)
      return c.json({ error: "Error in registering user!" }, 400);

    const emailSent = body.email ? await sendEmail(body.email, body.unique_code) : false;

    return c.json(
      {
        message: "User registered successfully",
        emailSent: body.email ? emailSent : "No email provided",
      },
      201
    );
  });

export default registerRouter;

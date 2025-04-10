/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db";
import { masterTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";

const markCrossedSchema = z.object({
  unique_code: z
    .string()
    .min(6, "unique_code is required")
    .regex(/^[0-9]{5}[A-Z]$/, "Invalid unique code format"),
});

const crossRouter = new Hono().post(
  "/cross",
  zValidator("json", markCrossedSchema),
  async (c) => {
    const { unique_code } = await c.req.valid("json");

    try {
      // Check if the user exists
      const user = await db
        .select()
        .from(masterTable)
        .where(eq(masterTable.unique_code, unique_code));

      if (user.length === 0) {
        return c.json({ error: "User not found" }, 404);
      }

      // Update isCrossed = true & set crossTime to now
      await db
        .update(masterTable)
        .set({
          isCrossed: true,
          crossTime: new Date(),
        })
        .where(eq(masterTable.unique_code, unique_code));

      return c.json({ success: true, message: "Marked as crossed ✅" });
    } catch (error) {
      console.error("Crossing error:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
);

export default crossRouter;

import { db } from "@/db";
import { Hono } from "hono";
import { masterTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";



const getUserInfoSchema = z.object({
  unique_code: z
    .string()
    .min(6, "unique_code is required")
    .regex(/^[0-9]{5}[A-Z]$/),
});

const userRouter = new Hono().get(
  "/info",
  zValidator("query", getUserInfoSchema),
  async (c) => {
    const { unique_code } = c.req.valid("query");

    try {
    /**   const user = await db
        .select()
        .from(masterTable)
        .where(
          and(
            eq(masterTable.unique_code, unique_code),
            eq(masterTable.isCrossed, true)
          )
        );**/
        const user = await db
      .select({isCrossed:masterTable.isCrossed,name:masterTable.name})
      .from(masterTable)
      .where(eq(masterTable.unique_code, unique_code)) 



      if (user.length === 0) {
        return c.json({ error: "User not found or has not crossed yet" }, 404);
      }

      const userData = user[0];
      return c.json(userData, 200);
    } catch (error) {
      console.error("Error fetching user info:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
);

export default userRouter;

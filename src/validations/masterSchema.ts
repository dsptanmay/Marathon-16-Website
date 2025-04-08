import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { masterTable } from "@/db/schema";


export const createUserSchema = createInsertSchema(masterTable).omit({
  isCrossed: true,
  crossTime: true,
  isSitian: true,
  category: true,
});
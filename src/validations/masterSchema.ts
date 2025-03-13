import { createInsertSchema } from "drizzle-zod";
import { masterTable } from "@/db/schema";

// export const masterSchema = z.object({
//   unique_code: z.string().min(1, "Unique code is required"),
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email format"),
//   phone_no: z.string().regex(/^\d+$/, "Phone number must be numeric"),
//   usn: z.string().min(1, "USN is required"),
//   category: z.string().min(1, "Category is required"),
//   isCrossed: z.boolean().default(false),
//   crossTime: z.date().optional(), // if null -> false else isCrossed = true
//   isSitian: z.boolean().default(false),
//   qrcodedata: z.string().url().optional(),
// });

export const createUserSchema = createInsertSchema(masterTable);

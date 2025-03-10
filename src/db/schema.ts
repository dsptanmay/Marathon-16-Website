import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";


export const master = pgTable("master", {
  id: serial("id").primaryKey(), // Auto-incrementing ID
  unique_code: text("unique_code").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone_no: text("phone_no").notNull(),
  usn: text("usn").notNull(),
  category: text("category").notNull(),
  isCrossed: boolean("isCrossed").default(false),
  crossTime: timestamp("crossTime", { withTimezone: true }).defaultNow(),
  isSitian: boolean("isSitian").default(false),
  qrcodedata: text("qrcodedata"),
});

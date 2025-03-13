import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const masterTable = pgTable("master", {
  id: serial("id").primaryKey(),
  unique_code: text("unique_code").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone_no: text("phone_no").notNull(),
  usn: text("usn"),
  category: text("category").notNull(),
  isCrossed: boolean("isCrossed").default(false).notNull(),
  crossTime: timestamp("crossTime", { withTimezone: true }).defaultNow(),
  isSitian: boolean("isSitian").default(false),
  qrcodedata: text("qrcodedata"),
});

import {
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category", ["girls", "boys", "walkathon"]);

export const masterTable = pgTable("master", {
  id: uuid("id").primaryKey().defaultRandom(),
  unique_code: text("unique_code").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone_no: text("phone_no").notNull(),
  usn: text("usn"),
  category: categoryEnum("category").notNull(),
  isCrossed: boolean("isCrossed").default(false).notNull(),
  crossTime: timestamp("crossTime", { withTimezone: true }).defaultNow(),
  isSitian: boolean("isSitian").default(false),
});

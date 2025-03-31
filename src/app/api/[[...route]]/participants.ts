/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/db";
import { Hono } from "hono";
import { masterTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const particiPantsRouter = new Hono()
  .get("/girls20", async (c) => {
    const users = await db
      .select()
      .from(masterTable)
      .where(eq(masterTable.category, "girls"))
      .orderBy(masterTable.crossTime)
      .limit(20);

    if (users.length === 0) {
      return c.json({ error: "No Participants" }, 404);
    }
    return c.json(users);
  })
  .get("/boys20", async (c) => {
    const users = await db
      .select()
      .from(masterTable)
      .where(eq(masterTable.category, "boys"))
      .orderBy(masterTable.crossTime)
      .limit(20);

    if (users.length === 0) {
      return c.json({ error: "No Participants" }, 404);
    }
    return c.json(users);
  })
  .get("/walkathon", async (c) => {
    const users = await db
    .select()
    .from(masterTable)
    .where(eq(masterTable.category, "walkathon"))
    .orderBy(masterTable.crossTime)
    .limit(10);
  

    if (users.length === 0) {
      return c.json({ error: "No Participants" }, 404);
    }
    return c.json(users);
  })
    .get("/allparticipantsboys", async(c)=>{
      const users = await db
      .select()
      .from(masterTable)
      .where(eq(masterTable.category, "boys"))
      .orderBy(masterTable.crossTime)    
  
      if (users.length === 0) {
        return c.json({ error: "No Participants" }, 404);
      }
      return c.json(users)
    })
    .get("/allparticipantgirls", async(c)=>{
      const users = await db
      .select()
      .from(masterTable)
      .where(eq(masterTable.category, "girls"))
      .orderBy(masterTable.crossTime)    
  
      if (users.length === 0) {
        return c.json({ error: "No Participants" }, 404);
      }
      return c.json(users)
    })
    .get("/allparticipantswalkathon", async(c)=>{
      const users = await db
      .select()
      .from(masterTable)
      .where(eq(masterTable.category, "walkathon"))
      .orderBy(masterTable.crossTime)    
  
      if (users.length === 0) {
        return c.json({ error: "No Participants" }, 404);
      }
      return c.json(users)
    })

export default particiPantsRouter;
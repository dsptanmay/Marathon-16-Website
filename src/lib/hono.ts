import type { ApiType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

const BASE_URL = process.env.VERCEL_URL || "http://localhost:3000";
const client = hc<ApiType>(BASE_URL);


export const api = client.api;
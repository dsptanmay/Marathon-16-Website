import type { ApiType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

const client = hc<ApiType>(process.env.VERCEL_URL!);

export const api = client.api;

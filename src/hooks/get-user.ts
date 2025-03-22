import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/hono";
import { InferResponseType } from "hono";

type User = InferResponseType<typeof api.user.info.$get,200>;

export const useUserInfo = (unique_code: string) => {
  return useQuery<User, Error>({
    queryKey: ["userInfo", unique_code],
    queryFn: async () => {
      const response = await api.user.info.$get({ query: { unique_code } });
      if (!response.ok) throw new Error("Failed to fetch user information");
      return await response.json();
    },
    enabled: !!unique_code,
  });
};
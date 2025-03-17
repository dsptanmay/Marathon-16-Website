import { useQuery } from "@tanstack/react-query";
import { InferSelectModel } from "drizzle-orm";
import { usersTable } from "@/db/schema";

type User = InferSelectModel<typeof usersTable>;

export const useUserInfo = (unique_code: string) => {
  return useQuery<User, Error>({
    queryKey: ["userInfo", unique_code],
    queryFn: async () => {
      const response = await fetch(`/api/userinfo?unique_code=${unique_code}`);
      if (!response.ok) throw new Error("Failed to fetch user information");
      return await response.json();
    },
    enabled: !!unique_code,
  });
};
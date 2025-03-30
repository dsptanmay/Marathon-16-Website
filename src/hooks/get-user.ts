import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/hono";
import { InferResponseType } from "hono";

type User = InferResponseType<typeof api.user.info.$get,200>;

export const useUserInfo = (unique_code: string) => {
  return useQuery<User, Error>({
    queryKey: ["userInfo", unique_code],
    queryFn: async () => {
    
      if (!unique_code) {
        throw new Error("Code is required");
      }
      
      try {
       
        const response = await api.user.info.$get({ 
          query: { unique_code: unique_code.trim() } 
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Failed to fetch user information");
        }
        
        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);
        throw error instanceof Error ? error : new Error("Unknown error occurred");
      }
    },
    enabled: Boolean(unique_code) && unique_code.length === 6,
  });
};
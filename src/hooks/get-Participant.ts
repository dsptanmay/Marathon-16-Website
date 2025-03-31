import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/hono";
import { InferResponseType } from "hono";

type GirlsParticipants = InferResponseType<typeof api.participants["girls20"]["$get"], 200>;
type BoysParticipants = InferResponseType<typeof api.participants["boys20"]["$get"], 200>;
type WalkathonParticipants = InferResponseType<typeof api.participants["walkathon"]["$get"], 200>;

type AllGirlsParticipants = InferResponseType<typeof api.participants["allparticipantgirls"]["$get"], 200>;
type AllBoysParticipants = InferResponseType<typeof api.participants["allparticipantsboys"]["$get"], 200>;
type AllWalkathonParticipants = InferResponseType<typeof api.participants["allparticipantswalkathon"]["$get"], 200>;

export const useGirls20 = () => {
  return useQuery<GirlsParticipants, Error>({
    queryKey: ["girls20"],
    queryFn: async () => {
      try {
        const response = await api.participants["girls20"].$get();
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Failed to fetch girls' participants");
        }
        
        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);
        throw error instanceof Error ? error : new Error("Unknown error occurred");
      }
    },
  });
};

export const useBoys20 = () => {
  return useQuery<BoysParticipants, Error>({
    queryKey: ["boys20"],
    queryFn: async () => {
      try {
        const response = await api.participants["boys20"].$get();
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Failed to fetch boys' participants");
        }
        
        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);
        throw error instanceof Error ? error : new Error("Unknown error occurred");
      }
    },
  });
};

export const useWalkathon10 = () => {
  return useQuery<WalkathonParticipants, Error>({
    queryKey: ["walkathon10"], 
    queryFn: async () => {
      try {
        console.log("Fetching walkathon10...");
        const response = await api.participants["walkathon"].$get();

        console.log("Response Status:", response.status);
        const data = await response.json();
        console.log("Response Data:", data);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Failed to fetch walkathon participants");
        }

        return data as WalkathonParticipants;
      } catch (error) {
        console.error("API request failed:", error);
        throw error instanceof Error ? error : new Error("Unknown error occurred");
      }
    },
  });
};


export const useAllGirls = () => {
  return useQuery<AllGirlsParticipants, Error>({
    queryKey: ["allparticipantgirls"],
    queryFn: async () => {
      try {
        const response = await api.participants["allparticipantgirls"].$get();

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Failed to fetch all girls' participants");
        }

        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);
        throw error instanceof Error ? error : new Error("Unknown error occurred");
      }
    },
  });
};

export const useAllBoys = () => {
  return useQuery<AllBoysParticipants, Error>({
    queryKey: ["allparticipantsboys"],
    queryFn: async () => {
      try {
        const response = await api.participants["allparticipantsboys"].$get();

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Failed to fetch all boys' participants");
        }

        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);
        throw error instanceof Error ? error : new Error("Unknown error occurred");
      }
    },
  });
};

export const useAllWalkathon = () => {
  return useQuery<AllWalkathonParticipants, Error>({
    queryKey: ["allparticipantswalkathon"],
    queryFn: async () => {
      try {
        const response = await api.participants["allparticipantswalkathon"].$get();

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Failed to fetch all walkathon participants");
        }

        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);
        throw error instanceof Error ? error : new Error("Unknown error occurred");
      }
    },
  });
};

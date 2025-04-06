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
      const response = await api.participants["girls20"].$get();
      if (!response.ok) {
        console.error("Failed to fetch participants");
        throw new Error("Failed to fetch participants");
      }
      return response.json() as Promise<GirlsParticipants>;
    },
  });
};

export const useBoys20 = () => {
  return useQuery<BoysParticipants, Error>({
    queryKey: ["boys20"],
    queryFn: async () => {
      const response = await api.participants["boys20"].$get();
      if (!response.ok) {
        console.error("Failed to fetch participants");
        throw new Error("Failed to fetch participants");
      }
      return response.json() as Promise<BoysParticipants>;
    },
  });
};

export const useWalkathon10 = () => {
  return useQuery<WalkathonParticipants, Error>({
    queryKey: ["walkathon10"],
    queryFn: async () => {
      console.log("Fetching walkathon10...");
      const response = await api.participants["walkathon"].$get();
      console.log("Response Status:", response.status);
      if (!response.ok) {
        console.error("Failed to fetch participants");
        throw new Error("Failed to fetch participants");
      }
      return response.json() as Promise<WalkathonParticipants>;
    },
  });
};

export const useAllGirls = () => {
  return useQuery<AllGirlsParticipants, Error>({
    queryKey: ["allparticipantgirls"],
    queryFn: async () => {
      const response = await api.participants["allparticipantgirls"].$get();
      if (!response.ok) {
        console.error("Failed to fetch all girls' participants");
        throw new Error("Failed to fetch all girls' participants");
      }
      return response.json() as Promise<AllGirlsParticipants>;
    },
  });
};

export const useAllBoys = () => {
  return useQuery<AllBoysParticipants, Error>({
    queryKey: ["allparticipantsboys"],
    queryFn: async () => {
      const response = await api.participants["allparticipantsboys"].$get();
      if (!response.ok) {
        console.error("Failed to fetch all boys' participants");
        throw new Error("Failed to fetch all boys' participants");
      }
      return response.json() as Promise<AllBoysParticipants>;
    },
  });
};

export const useAllWalkathon = () => {
  return useQuery<AllWalkathonParticipants, Error>({
    queryKey: ["allparticipantswalkathon"],
    queryFn: async () => {
      const response = await api.participants["allparticipantswalkathon"].$get();
      if (!response.ok) {
        console.error("Failed to fetch all walkathon participants");
        throw new Error("Failed to fetch all walkathon participants");
      }
      return response.json() as Promise<AllWalkathonParticipants>;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/hono";
import { InferResponseType } from "hono";

// Types from backend responses
type GirlsParticipants = InferResponseType<typeof api.participants["girls20"]["$get"], 200>;
type BoysParticipants = InferResponseType<typeof api.participants["boys20"]["$get"], 200>;
type WalkathonGirlsTop10 = InferResponseType<typeof api.participants["walkathonTop10"]["girls"]["$get"], 200>;
type WalkathonBoysTop10 = InferResponseType<typeof api.participants["walkathonTop10"]["boys"]["$get"], 200>;

type AllGirlsParticipants = InferResponseType<typeof api.participants["allparticipantgirls"]["$get"], 200>;
type AllBoysParticipants = InferResponseType<typeof api.participants["allparticipantsboys"]["$get"], 200>;
type AllWalkathonParticipants = InferResponseType<typeof api.participants["allparticipantswalkathon"]["$get"], 200>;





export const useGirls20 = () => {
  return useQuery<GirlsParticipants, Error>({
    queryKey: ["girls20"],
    queryFn: async () => {
      const res = await api.participants["girls20"].$get();
      if (!res.ok) throw new Error("Failed to fetch girls20");
      return res.json();
    },
  });
};


export const useBoys20 = () => {
  return useQuery<BoysParticipants, Error>({
    queryKey: ["boys20"],
    queryFn: async () => {
      const res = await api.participants["boys20"].$get();
      if (!res.ok) throw new Error("Failed to fetch boys20");
      return res.json();
    },
  });
};


export const useWalkathonTop10Girls = () => {
  return useQuery<WalkathonGirlsTop10, Error>({
    queryKey: ["walkathonTop10Girls"],
    queryFn: async () => {
      const res = await api.participants["walkathonTop10"]["girls"].$get();
      if (!res.ok) throw new Error("Failed to fetch walkathon girls top 10");
      return res.json();
    },
  });
};


export const useWalkathonTop10Boys = () => {
  return useQuery<WalkathonBoysTop10, Error>({
    queryKey: ["walkathonTop10Boys"],
    queryFn: async () => {
      const res = await api.participants["walkathonTop10"]["boys"].$get();
      if (!res.ok) throw new Error("Failed to fetch walkathon boys top 10");
      return res.json();
    },
  });
};


export const useAllGirls = () => {
  return useQuery<AllGirlsParticipants, Error>({
    queryKey: ["allparticipantgirls"],
    queryFn: async () => {
      const res = await api.participants["allparticipantgirls"].$get();
      if (!res.ok) throw new Error("Failed to fetch all girls");
      return res.json();
    },
  });
};

// All Boys
export const useAllBoys = () => {
  return useQuery<AllBoysParticipants, Error>({
    queryKey: ["allparticipantsboys"],
    queryFn: async () => {
      const res = await api.participants["allparticipantsboys"].$get();
      if (!res.ok) throw new Error("Failed to fetch all boys");
      return res.json();
    },
  });
};


export const useAllWalkathonParticipants = () => {
  return useQuery<AllWalkathonParticipants, Error>({
    queryKey: ["allparticipantswalkathon"],
    queryFn: async () => {
      const res = await api.participants["allparticipantswalkathon"].$get();
      if (!res.ok) throw new Error("Failed to fetch all walkathon participants");
      return res.json();
    },
  });
};


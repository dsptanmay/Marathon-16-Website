import { api } from "@/lib/hono";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetUser() {
  const query = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const res = await api.users.$get();
      if (res.ok) return await res.json();
    },
  });
  return query;
}

export function useCreateUser() {
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.users[":id"].$post({ param: { id: "xyz" } });
      if (res.ok) return await res.json();
    },
  });
  return mutation;
}

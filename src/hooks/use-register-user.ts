import { api } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseTypeBoys = InferResponseType<typeof api.register.boys.$post, 201>;
type RequestTypeBoys = InferRequestType<typeof api.register.boys.$post>["json"];

export const useRegisterBoys = () => {
  const mutation = useMutation<ResponseTypeBoys, Error, RequestTypeBoys>({
    mutationFn: async (data) => {
      const response = await api.register.boys.$post({ json: data });
      if (!response.ok) throw new Error("Failed to register participant");
      return await response.json();
    },
    onSuccess: async (data, variables) => {
      console.log(`${variables.name} registered successfully`);
    },
    onError: async (error, data) => {
      console.log(`Failed to register user ${data.name}`);
      console.error(error);
    },
  });
  return mutation;
};

export const useRegisterGirls = () => {};
export const useRegisterWalkathon = () => {};

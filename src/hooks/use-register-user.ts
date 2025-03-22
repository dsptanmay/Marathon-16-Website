import { api } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseTypeBoys = InferResponseType<typeof api.register.boys.$post, 201>;
type RequestTypeBoys = InferRequestType<typeof api.register.boys.$post>["json"];

type ResponseTypeGirls = InferResponseType<
  typeof api.register.girls.$post,
  201
>;
type RequestTypeGirls = InferRequestType<
  typeof api.register.girls.$post
>["json"];

type ResponseTypeWalkathon = InferResponseType<
  typeof api.register.walkathon.$post,
  201
>;
type RequestTypeWalkathon = InferRequestType<
  typeof api.register.walkathon.$post
>["json"];

export const useRegisterBoys = () => {
  const mutation = useMutation<ResponseTypeBoys, Error, RequestTypeBoys>({
    mutationFn: async (data) => {
      const response = await api.register.boys.$post({ json: data }); // POST call -> /api/register/boys/
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

// 1. mutationFn -> if successful -> onSuccess else onError

// TODO: write custom hooks for registering girls and walkathon members

export const useRegisterGirls = () => {
  const mutation = useMutation<ResponseTypeGirls, Error, RequestTypeGirls>({
    mutationFn: async (data) => {
      const response = await api.register.girls.$post({ json: data }); // POST call -> /api/register/girls/
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

export const useRegisterWalkathon = () => {
  const mutation = useMutation<
    ResponseTypeWalkathon,
    Error,
    RequestTypeWalkathon
  >({
    mutationFn: async (data) => {
      const response = await api.register.walkathon.$post({ json: data }); // POST call -> /api/register/walkathon/
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

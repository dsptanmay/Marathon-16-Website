import { api } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<typeof api.qrcode.cross.$post>["json"];
type ResponseType = InferResponseType<typeof api.qrcode.cross.$post, 200>;

export const useMarkUserCrossed = () => {
    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const res = await api.qrcode.cross.$post({ json: data });
            if (!res.ok) throw new Error("User not found or already crossed");
            return await res.json();
        },
    });
};

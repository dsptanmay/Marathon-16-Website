"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterGirls } from "@/hooks/use-register-user";

const formSchema = z.object({
  name: z.string().min(3, "Name is required").nonempty("Name is required"),
  phone_no: z.string().min(10, "Enter a valid phone number").nonempty("Phone number is required"),
  email: z.string().email("Invalid email"),
  unique_code: z.string().nonempty("Unique Code is required"),
  usn: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function GirlsRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useRegisterGirls();

  const onSubmit = (data: FormData) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-pink-300 via-pink-500 to-pink-700">
      <div className="bg-pink-200 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">
          Girls Marathon Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Ex: Jane Doe" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-semibold mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input type="tel" placeholder="Ex: 9876543210" {...register("phone_no")} />
            {errors.phone_no && (
              <p className="text-red-500 text-sm">{errors.phone_no.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <Input type="email" placeholder="Ex: yourname@email.com" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Unique Code */}
          <div>
            <label className="block font-semibold mb-1">
              Unique Code <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Ex: 12345G" {...register("unique_code")} />
            {errors.unique_code && (
              <p className="text-red-500 text-sm">{errors.unique_code.message}</p>
            )}
          </div>

          {/* USN */}
          <div>
            <label className="block font-semibold mb-1">USN</label>
            <Input placeholder="Ex: 1SIXXYYXXX" {...register("usn")} />
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
              {mutation.isPending ? "Registering..." : "Register"}
            </Button>
          </div>

          {/* Error Message */}
          {mutation.isError && (
            <p className="text-red-500 text-sm text-center mt-2">
              {mutation.error.message}
            </p>
          )}

          {/* Success Message */}
          {mutation.isSuccess && (
            <p className="text-green-500 text-sm text-center mt-2">
              Registration successful! 🎉
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

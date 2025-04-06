"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterWalkathon } from "@/hooks/use-register-user";

const formSchema = z.object({
  name: z.string().min(3, "Name is required").nonempty("Name is required"),
  phone_no: z.string().min(10, "Enter a valid phone number").nonempty("Phone number is required"),
  email: z.string().email("Invalid email"),
  unique_code: z.string().nonempty("Unique Code is required"),
  gender: z.enum(["boy", "girl"], {
    required_error: "Gender is required",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function WalkathonRegistration() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useRegisterWalkathon();

  const onSubmit = (data: FormData) => {
    const extendedData = {
      ...data,
      category: data.gender === "girl" ? "walkathon_f" as const : "walkathon_m" as const,
    };

    mutation.mutate(extendedData, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-green-400 via-green-600 to-green-900">
      <div className="bg-green-200 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
          Walkathon Registration
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Ex: John Doe" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-semibold mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input type="tel" placeholder="Ex: 9876543210" {...register("phone_no")} />
            {errors.phone_no && <p className="text-red-500 text-sm">{errors.phone_no.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <Input type="email" placeholder="Ex: yourname@email.com" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Unique Code */}
          <div>
            <label className="block font-semibold mb-1">
              Unique Code <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Ex: 12345W" {...register("unique_code")} />
            {errors.unique_code && <p className="text-red-500 text-sm">{errors.unique_code.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block font-semibold mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("gender")}
              defaultValue=""
            >
              <option value="" disabled>Select Gender</option>
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              {mutation.isPending ? "Registering..." : "Register"}
            </Button>
          </div>

          {/* Error Message */}
          {mutation.isError && (
            <p className="text-red-500 text-sm text-center mt-2">{mutation.error.message}</p>
          )}

          {/* Success Message */}
          {mutation.isSuccess && (
            <p className="text-green-500 text-sm text-center mt-2">Registration successful! 🎉</p>
          )}
        </form>
      </div>
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterGirls } from "@/hooks/use-register-user";


function isValidCode(code: string): boolean {
  if (!/^\d{5}[A-Z]{1}$/.test(code)) return false;
  const digits = code.slice(0, 5);
  const letter = code.slice(5);
  const sum = Array.from(digits).reduce(
    (acc, digit) => acc + Number.parseInt(digit),
    0
  );
  const remainder = sum % 26;
  const expectedLetter = String.fromCharCode(65 + remainder);

  return letter === expectedLetter;
}

const formSchema = z.object({
  name: z.string().min(3, "Name is required").nonempty("Name is required"),
  phone_no: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .refine((val) => /^\d{10}$/.test(val), {
      message: "Phone number must contain only digits",
    }),
  email: z.string().email("Invalid email"),
  unique_code: z
    .string()
    .min(6, "Unique code must be 6 characters")
    .max(6, "Unique code must be 6 characters")
    .refine((code) => isValidCode(code), {
      message: "Invalid unique code format",
    }),
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
         
          <div>
            <label className="block font-semibold mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Ex: Jane Doe" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          
          <div>
            <label className="block font-semibold mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input type="tel" placeholder="Ex: 9876543210" {...register("phone_no")} />
            {errors.phone_no && (
              <p className="text-red-500 text-sm">{errors.phone_no.message}</p>
            )}
          </div>

         
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <Input type="email" placeholder="Ex: yourname@email.com" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Unique Code <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Ex: 12345G" {...register("unique_code")} />
            {errors.unique_code && (
              <p className="text-red-500 text-sm">{errors.unique_code.message}</p>
            )}
          </div>

         
          <div>
            <label className="block font-semibold mb-1">USN</label>
            <Input placeholder="Ex: 1SIXXYYXXX" {...register("usn")} />
          </div>

          
          <div>
            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
              {mutation.isPending ? "Registering..." : "Register"}
            </Button>
          </div>

          
          {mutation.isError && (
            <p className="text-red-500 text-sm text-center mt-2">
              {mutation.error.message}
            </p>
          )}

          
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

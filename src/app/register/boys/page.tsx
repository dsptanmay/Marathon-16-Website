"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// ✅ Updated Form Validation Schema (Field Names Fixed)
const formSchema = z.object({
  name: z.string().min(3, "Name is required").nonempty("Name is required"),
  phone_no: z.string().min(10, "Enter a valid phone number").nonempty("Phone number is required"), // FIXED
  email: z.string().email("Invalid email"),
  unique_code: z.string().nonempty("Unique Code is required"), // FIXED
  usn: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // ✅ Updated API Call (Field Names Fixed)
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/register/boys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // ✅ No need to rename fields manually
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to register: ${errorMessage}`);
      }

      return response.json();
    },
    onSuccess: () => {
      reset(); // ✅ Clear form after success
    },
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#056cf4] via-[#0985e4] to-[#2b5995] p-4">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Boys Marathon Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label className="block font-semibold mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Ex: John Doe" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </motion.div>

          {/* Phone Number (Updated field name) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <label className="block font-semibold mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input type="tel" placeholder="Ex: 9876543210" {...register("phone_no")} /> {/* FIXED */}
            {errors.phone_no && <p className="text-red-500 text-sm">{errors.phone_no.message}</p>}
          </motion.div>

          {/* Email */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <label className="block font-semibold mb-1">Email</label>
            <Input type="email" placeholder="Ex: yourname@email.com" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </motion.div>

          {/* Unique Code (Updated field name) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <label className="block font-semibold mb-1">
              Unique Code <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Ex: MARA123" {...register("unique_code")} /> {/* FIXED */}
            {errors.unique_code && <p className="text-red-500 text-sm">{errors.unique_code.message}</p>}
          </motion.div>

          {/* USN */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <label className="block font-semibold mb-1">USN</label>
            <Input placeholder="Ex: 1SIXXYYXXX" {...register("usn")} />
          </motion.div>

          {/* Submit Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {mutation.isPending ? "Registering..." : "Register"}
            </Button>
          </motion.div>

          {/* Error Message Display */}
          {mutation.isError && (
            <p className="text-red-500 text-sm text-center mt-2">{mutation.error.message}</p>
          )}

          {/* Success Message Display */}
          {mutation.isSuccess && (
            <p className="text-green-500 text-sm text-center mt-2">Registration successful! 🎉</p>
          )}
        </form>
      </motion.div>
    </div>
  );
}

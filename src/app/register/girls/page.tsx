"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Import Framer Motion

const formSchema = z.object({
  name: z.string().min(3, "Name is required").nonempty("Name is required"),
  phone: z.string().min(10, "Enter a valid phone number").nonempty("Phone number is required"),
  email: z.string().email("Invalid email"),
  uniqueCode: z.string().nonempty("Unique Code is required"),
  usn: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function GirlsRegistration() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/register/girls", { // Changed API endpoint for girls
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to register");
    },
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-pink-300 via-pink-500 to-pink-700"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-pink-200 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl font-bold mb-6 text-pink-600 text-center"
        >
          Girls Marathon Registration
        </motion.h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Name */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block font-semibold mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Ex: John Doe" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </motion.div>

          {/* Phone Number */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block font-semibold mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input type="tel" placeholder="Ex: 9876543210" {...register("phone")} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </motion.div>

          {/* Email */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block font-semibold mb-1">Email</label>
            <Input type="email" placeholder="Ex: yourname@email.com" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </motion.div>

          {/* Unique Code */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label className="block font-semibold mb-1">
              Unique Code <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Ex: MARA123" {...register("uniqueCode")} />
            {errors.uniqueCode && <p className="text-red-500 text-sm">{errors.uniqueCode.message}</p>}
          </motion.div>

          {/* USN */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label className="block font-semibold mb-1">USN</label>
            <Input placeholder="Ex: 1SIXXYYXXX" {...register("usn")} />
          </motion.div>

          {/* Submit Button */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
              {mutation.isPending ? "Registering..." : "Register"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}

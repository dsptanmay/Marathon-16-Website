"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Define Zod schema (matches backend validation)
const signupSchema = z.object({
  unique_code: z.string().min(3, "Unique code is required"),
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email").optional(),
  phone_no: z.string().min(10, "Phone number is required"),
  usn: z.string().optional(),
  age: z.number().min(1, "Age is required"),
  category: z.enum(["girls", "boys", "walkathon"], {
    errorMap: () => ({ message: "Select a category" }),
  }),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const category = watch("category", "girls"); // Default category

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/register/${data.category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        setMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Marathon Sign-Up</h2>

      {message && (
        <p className="text-center text-lg font-semibold text-green-600">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <select
          {...register("category")}
          className="w-full p-2 border rounded"
        >
          <option value="girls">Girls Marathon</option>
          <option value="boys">Boys Marathon</option>
          <option value="walkathon">Walkathon</option>
        </select>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}

        <input
          {...register("unique_code")}
          placeholder="Unique Code"
          className="w-full p-2 border rounded"
        />
        {errors.unique_code && (
          <p className="text-red-500">{errors.unique_code.message}</p>
        )}

        <input
          {...register("name")}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          {...register("email")}
          type="email"
          placeholder="Email (optional)"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("phone_no")}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />
        {errors.phone_no && (
          <p className="text-red-500">{errors.phone_no.message}</p>
        )}

        <input
          {...register("usn")}
          placeholder="USN (optional)"
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          placeholder="Age"
          className="w-full p-2 border rounded"
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;

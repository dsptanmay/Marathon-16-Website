"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { use } from "react";

const SignupForm = () => {
  const params = useParams();
  const category = (params?.category as string) || "default";

  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    phone: "",
    email: "",
  });

  // Simulated API request function
  const registerUser = async (data: typeof formData & { category: string }) => {
    return new Promise<typeof data>((resolve) =>
      setTimeout(() => resolve(data), 1000)
    );
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert(`Successfully registered for ${data.category.toUpperCase()}!`);
    },
    onError: (error) => {
      alert("Registration failed. Please try again.");
      console.error(error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...formData, category });
  };

  // Define styles based on category
  const categoryStyles: Record<string, string> = {
    boys: "bg-blue-100 border-blue-500 text-blue-800",
    girls: "bg-pink-100 border-pink-500 text-pink-800",
    walkathon: "bg-green-100 border-green-500 text-green-800",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 border-2 rounded-lg shadow-lg w-96 space-y-4 ${
        categoryStyles[category] || "bg-gray-100"
      }`}
    >
      <h2 className="text-xl font-bold text-center">
        Register for {category.toUpperCase()}
      </h2>

      {/* Name */}
      <label className="block font-semibold">
        Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="name"
        placeholder="Eg: John Doe"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
        required
        disabled={mutation.isPending}
      />

      {/* USN */}
      <label className="block font-semibold">USN</label>
      <input
        type="text"
        name="usn"
        placeholder="Eg: 1SIxxYYxxx"
        value={formData.usn}
        onChange={handleChange}
        className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
        disabled={mutation.isPending}
      />

      {/* Phone Number */}
      <label className="block font-semibold">
        Phone Number <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        name="phone"
        placeholder="Eg: 9876543210"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 w-full rounded-md focus:ring-2 focus:ring-gray-950"
        required
        disabled={mutation.isPending}
      />

      {/* Email */}
      <label className="block font-semibold">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        placeholder="Eg: aviral@gmail.com"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
        required
        disabled={mutation.isPending}
      />

      <button
        type="submit"
        className="w-full py-2 rounded-lg text-white font-bold disabled:opacity-50"
        disabled={mutation.isPending}
        style={{
          backgroundColor:
            category === "boys"
              ? "#1E40AF"
              : category === "girls"
              ? "#DB2777"
              : "#047857",
        }}
      >
        {mutation.isPending ? "Registering..." : "Register"}
      </button>

      {mutation.isError && (
        <p className="text-red-600 mt-2 text-sm">
          Error submitting form. Try again.
        </p>
      )}
    </form>
  );
};

export default SignupForm;
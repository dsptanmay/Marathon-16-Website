"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const SignupForm = ({ params }: { params: { category: string } }) => {
  const router = useRouter();
  const category = params.category || "default";

  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    phone: "",
    email: "",
  });

  const registerUser = async (data: typeof formData & { category: string }) => {
    return new Promise<typeof data>((resolve) =>
      setTimeout(() => resolve(data), 1000)
    );
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert(`Successfully registered for ${data.category.toUpperCase()}!`);
      router.push("/");
    },
    onError: () => alert("Registration failed. Please try again."),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...formData, category });
  };

  const categoryStyles: Record<string, string> = {
    boys: "bg-blue-100 border-blue-500 text-blue-900",
    girls: "bg-pink-100 border-pink-500 text-pink-900",
    walkathon: "bg-green-100 border-green-500 text-green-900",
    default: "bg-gray-100 border-gray-500 text-gray-900",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      
      <header className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center text-lg font-bold shadow-lg">
        Marathon-16 Registration Portal
      </header>

      {/* Main Content (Centered) */}
      <main className={`flex-grow flex flex-col items-center justify-center ${categoryStyles[category]} py-10`}>
        <form
          onSubmit={handleSubmit}
          className="p-6 border-2 rounded-lg shadow-xl w-96 bg-white text-gray-900"
        >
          <h2 className="text-xl font-bold mb-6 text-center">
            Register for {category.toUpperCase()}
          </h2>

          {/* Name */}
          <label className="block font-semibold mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="eg: John Doe"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full mb-4 rounded-md"
            required
            disabled={mutation.isPending}
          />

          {/* USN */}
          <label className="block font-semibold mb-1">USN</label>
          <input
            placeholder="eg: 1SIXXYYXXX"
            type="text"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
            className="border p-2 w-full mb-4 rounded-md"
            required
            disabled={mutation.isPending}
          />

          {/* Phone */}
          <label className="block font-semibold mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="eg: 9876543210"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full mb-4 rounded-md"
            required
            disabled={mutation.isPending}
          />

          {/* Email */}
          <label className="block font-semibold mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="eg: aviral@gmail.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full mb-4 rounded-md"
            required
            disabled={mutation.isPending}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-bold disabled:opacity-50 transition transform hover:scale-105"
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
      </main>

     
      <footer className="w-full py-4 bg-gray-800 text-white text-center text-sm">
        © 2025 Marathon-16 Registration | Team Pathfinder | All Rights Reserved
      </footer>
    </div>
  );
};

export default SignupForm;

"use client";
import { useRouter } from "next/navigation";

const CategoryPage = () => {
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    router.push(`/register/${category}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      {/* Header (Fixed at Top) */}
      <header className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center text-lg font-bold shadow-lg">
        Event Registration Portal
      </header>

      {/* Main Content (Centered) */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-extrabold mb-8">Select Your Category</h1>
        <div className="flex flex-col space-y-6">
          <button
            onClick={() => handleCategorySelect("girls")}
            className="px-8 py-3 bg-pink-500 text-white rounded-xl shadow-lg hover:bg-pink-600 transition transform hover:scale-105 text-lg"
          >
            Girls
          </button>
          <button
            onClick={() => handleCategorySelect("boys")}
            className="px-8 py-3 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition transform hover:scale-105 text-lg"
          >
            Boys
          </button>
          <button
            onClick={() => handleCategorySelect("walkathon")}
            className="px-8 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition transform hover:scale-105 text-lg"
          >
            Walkathon
          </button>
        </div>
      </main>

      {/* Footer (Fixed at Bottom) */}
      <footer className="w-full py-4 bg-gray-800 text-white text-center text-sm">
        © 2025 Event Registration | All Rights Reserved
      </footer>
    </div>
  );
};

export default CategoryPage;

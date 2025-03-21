"use client";
import { useRouter } from "next/navigation";

const CategoryPage = () => {
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    router.push(`/register/${category}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-500 text-white">

  
  <header className="h-24 w-full bg-gradient-to-r from-purple-900 via-indigo-700 to-blue-500 text-white font-bold shadow-xl flex items-center justify-center relative px-6">
    <img src="/pf_logo.png" alt="Marathon-16 Logo" className="h-12 absolute left-6 drop-shadow-lg" />
    <span className="hidden sm:block text-center tracking-wide text-xl md:text-2xl">
      🏆 Marathon-16 | Run for Glory!
    </span>
  </header>

  
  <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-500">
      Ready to Make History? 🏃‍♂️🔥
    </h1>
    <p className="text-lg text-blue-100 mb-8 max-w-lg">
      Lace up your shoes and **own the track!**
      Choose your category & get ready for the ultimate challenge!
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-lg">
      <button
        onClick={() => handleCategorySelect("girls")}
        className="px-6 py-4 bg-pink-500 text-white rounded-xl shadow-xl hover:bg-pink-600 transition-all transform hover:scale-105 text-lg font-semibold"
      >
        👧 Girls Category
      </button>
      <button
        onClick={() => handleCategorySelect("boys")}
        className="px-6 py-4 bg-blue-500 text-white rounded-xl shadow-xl hover:bg-blue-600 transition-all transform hover:scale-105 text-lg font-semibold"
      >
        👦 Boys Category
      </button>
      <button
        onClick={() => handleCategorySelect("walkathon")}
        className="px-6 py-4 bg-green-500 text-white rounded-xl shadow-xl hover:bg-green-600 transition-all transform hover:scale-105 text-lg font-semibold"
      >
        🚶 Walkathon
      </button>
    </div>
  </main>

  
  <footer className="w-full py-6 bg-purple-900 text-blue-200 text-center text-sm">
    © 2025 Marathon-16 | Team Pathfinder
  </footer>
</div>

  );
};

export default CategoryPage;

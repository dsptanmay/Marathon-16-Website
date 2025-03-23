"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0628a3] via-[#6137bc] to-[#21114a] text-white">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full py-4 px-6 bg-black/30 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Marathon Logo" width={40} height={40} />
          <h1 className="text-xl font-bold">Marathon Registration</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="text-center mt-20">
        {/* Heading with emerging effect */}
        <motion.h1 
          className="text-4xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 50 }} // Starts hidden and below
          animate={{ opacity: 1, y: 0 }} // Moves up into position
          transition={{ duration: 0.8, ease: "easeOut" }} 
        >
          Select Your Category
        </motion.h1>

        {/* Button Container */}
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Boys Marathon Button */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} // Starts hidden and below
            animate={{ opacity: 1, y: 0 }} // Moves up into position
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Delayed effect
          >
            <Button
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105 transition-transform px-6 py-3 rounded-lg text-lg shadow-lg"
              onClick={() => router.push("/register/boys")}
            >
              Boys Marathon
            </Button>
          </motion.div>

          {/* Girls Marathon Button */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <Button
              className="bg-gradient-to-r from-pink-400 to-pink-600 hover:scale-105 transition-transform px-6 py-3 rounded-lg text-lg shadow-lg"
              onClick={() => router.push("/register/girls")}
            >
              Girls Marathon
            </Button>
          </motion.div>

          {/* Walkathon Button */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <Button
              className="bg-gradient-to-r from-green-400 to-green-600 hover:scale-105 transition-transform px-6 py-3 rounded-lg text-lg shadow-lg"
              onClick={() => router.push("/register/walkathon")}
            >
              Walkathon
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full py-3 text-center bg-black/30">
        <p>© 2025 Marathon Event | <a href="https://www.pathfindersit.in/">Team Pathfinder</a></p>
      </footer>
    </div>
  );
}

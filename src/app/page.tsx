"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0628a3] via-[#6137bc] to-[#21114a] text-white">


      <header className="fixed top-0 left-0 w-full py-4 px-6 bg-black/30 flex justify-center items-center z-50">
        <h1 className="text-xl font-bold text-center">Marathon Registration</h1>
      </header>


      <main className=" w-full px-6 max-w-md text-center">
        <h1 className="text-4xl font-extrabold mb-14">Select Your Category :</h1>

        <div className="flex flex-col gap-12 w-full">

          <Button
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 px-8 py-8 rounded-lg text-xl shadow-lg"
            onClick={() => router.push("/register/boys")}
          >
            Boys Marathon
          </Button>


          <Button
            className="w-full bg-gradient-to-r from-pink-400 to-pink-600 px-8 py-8 rounded-lg text-xl shadow-lg"
            onClick={() => router.push("/register/girls")}
          >
            Girls Marathon
          </Button>


          <Button
            className="w-full bg-gradient-to-r from-green-400 to-green-600 px-8 py-8 rounded-lg text-xl shadow-lg"
            onClick={() => router.push("/register/walkathon")}
          >
            Walkathon
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-violet-400 to-violet-800 px-8 py-8 rounded-lg text-xl shadow-lg"
            onClick={() => router.push("/certificate")}
          >
            GET CERTIFICATE
          </Button>
        </div>
       

      </main>


      <footer className="fixed bottom-0 left-0 w-full py-3 text-center bg-black/30 text-sm">
        <p>
          © 2025 Marathon Event |{" "}
          <a href="https://www.pathfindersit.in/" className="underline hover:text-gray-300">
            Team Pathfinder
          </a>
        </p>
      </footer>
    </div>
  );
}
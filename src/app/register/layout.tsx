import { ReactNode } from "react";
import Image from "next/image";

export default function RegistrationLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header */}
       <header className="fixed top-0 left-0 w-full py-4 px-6 bg-black/30 flex items-center justify-between z-50">
              <div className="flex items-center gap-2">
                <Image src="/pf_logo.png" alt="Marathon Logo" width={40} height={40} />
                <h1 className="text-xl font-bold">Marathon registration</h1>
              </div>
            </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center">{children}</main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full py-3 text-center bg-black/30">
        <p>© 2025 Marathon Event | <a href="https://www.pathfindersit.in/">Team Pathfinder</a></p>
      </footer>
    </div>
  );
}

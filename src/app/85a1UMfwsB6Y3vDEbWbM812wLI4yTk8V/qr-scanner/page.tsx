"use client";

import Scanner from "@/components/Scanner"; // Scanner component
import { useMarkUserCrossed } from "@/hooks/scanner-hook"; // Mutation hook

export default function ScannerFunction() {
  const {
    mutate: markUserCrossed,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useMarkUserCrossed();

  const handleScan = async (data: string) => {
    if (!/^\d{5}[A-Z]$/.test(data)) {
      console.warn("❌ Invalid code format. Skipping.");
      return;
    }

    console.log("📦 Valid scanned code:", data);
    markUserCrossed({ unique_code: data });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold mb-2">QR Code Scanner</h1>

      <Scanner onScanAction={handleScan} autoStart />

      <div className="mt-4 text-center">
        {isPending && <p className="text-blue-600">🔄 Processing...</p>}
        {isSuccess && <p className="text-green-600">✅ User marked as crossed!</p>}
        {isError && <p className="text-red-600">❌ Failed to mark user as crossed.</p>}
        {(isSuccess || isError) && (
          <button
            onClick={reset}
            className="mt-2 text-sm text-gray-500 underline"
          >
            Scan another
          </button>
        )}
      </div>
    </div>
  );
}

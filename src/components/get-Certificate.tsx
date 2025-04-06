"use client";

import { AlertDescription } from "@/components/ui/alert";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUserInfo } from "@/hooks/get-user";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default function CodeValidator() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValidCode, setIsValidCode] = useState(true);

  const { data: user, isLoading: isQueryLoading, isError, error: queryError } = useUserInfo(code);

  const validateCode = (input: string) => {
    const regex = /^[0-9]{5}[A-Z]$/;
    return regex.test(input);
  };





  const generateCertificatePDF = async (participantName: string): Promise<Uint8Array | null> => {
    try {
      const pdfDoc = await PDFDocument.create();
      const pageWidth = 842; // A4 width in points (landscape)
      const pageHeight = 595; // A4 height in points (landscape)
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const imageUrl = "https://i.imgur.com/BtPP8WS.png";
      const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
      const backgroundImage = await pdfDoc.embedPng(imageBytes);

      page.drawImage(backgroundImage, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
      });

      const nameSize = 28;
      const nameTextWidth = font.widthOfTextAtSize(participantName, nameSize);
      const nameX = (pageWidth - nameTextWidth) / 2;
      const nameY = pageHeight / 2 + 60;

      page.drawText(participantName, {
        x: nameX,
        y: nameY,
        size: nameSize,
        font,
        color: rgb(0, 0, 0),
      });

      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      page.drawText(`Date: ${today}`, {
        x: pageWidth - 170,
        y: 120,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });

      page.drawText("Team Pathfinder", {
        x: pageWidth - 170,
        y: 105,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });

      return await pdfDoc.save();
    } catch (error) {
      console.error("PDF Generation Failed:", error);
      return null;
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsValidating(true);


    if (!validateCode(code)) {
      setError("Invalid Code! It must be 5 digits followed by 1 uppercase letter (e.g., 12345A).");
      setIsValidCode(false);
      setIsValidating(false);
      return;
    }

    setIsValidCode(true);

    if (isQueryLoading) return;

    if (isError) {
      setError(queryError instanceof Error ? queryError.message : "Something went wrong");
      setIsValidating(false);
      return;
    }

    if (!user) {
      setError("Failed to retrieve user information. Please try again.");
      setIsValidating(false);
      return;
    }

    try {
      const pdfBytes = await generateCertificatePDF(user.name);

      if (pdfBytes) {
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `Certificate-${user.name}.pdf`;
        a.click();

        window.URL.revokeObjectURL(url);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Certificate generation error:", error);
      setError("Failed to process your request. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-gradient-to-b from-blue-100 to-white">
      <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">Marathon 16.0</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-blue-700">Enter Your Code</h2>
            <p className="text-gray-600">Please enter your 6-character unique code</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter code (e.g., 12345A)"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className={`text-center text-xl tracking-widest h-14 border ${isValidCode ? "border-blue-300" : "border-red-500"} focus-visible:ring-blue-500`}
              maxLength={6}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isValidating}
            >
              {isValidating ? "Validating..." : "Validate Code"}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4 bg-red-50 border-red-300 text-red-700">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 bg-green-50 border-green-300 text-green-700">
              <AlertDescription>Certificate generated and downloaded successfully!</AlertDescription>
            </Alert>
          )}
        </div>
      </main>

      <footer className="border-t p-4 flex justify-between items-center text-sm bg-white shadow-sm">
        <p className="text-blue-600 font-medium">Team Pathfinder</p>
        <p className="text-gray-600">2024-25</p>
      </footer>
    </div>
  );
}

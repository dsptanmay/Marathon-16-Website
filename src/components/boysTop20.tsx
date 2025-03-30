/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useBoys20 } from "@/hooks/get-Participant"; 
import React, { useState } from "react";
import { PDFDocument, StandardFonts, PageSizes, rgb } from "pdf-lib";
import { z } from "zod";
  
const CrossDataSchema = z.object({
  id: z.string().uuid(),
  unique_code: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  phone_no: z.string(),
  usn: z.string().nullable(),
  category: z.enum(["girls", "boys", "walkathon"]),
  isCrossed: z.boolean(),
  crossTime: z.string().nullable(),
  isSitian: z.boolean().nullable(),
});

type CrossData = z.infer<typeof CrossDataSchema>;

const BoysCrossComponent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: participants, isLoading, error } = useBoys20();

  const validatedParticipants = participants?.filter((p) =>
    CrossDataSchema.safeParse(p).success
  ) ?? [];

  async function generatePdf(data: CrossData[], title?: string) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage(PageSizes.A2);
    const { width, height } = page.getSize();

    page.drawText(title || "Top 20 Participants - Boys", {
      x: 50,
      y: height - 50,
      size: 30,
      color: rgb(0, 0, 0),
    });

    data.forEach((participant, idx) => {
      const formattedTime = participant.crossTime ? new Date(participant.crossTime).toLocaleString() : "N/A";
      page.drawText(`${idx + 1}. ${participant.name} - ${formattedTime}`, {
        x: 50,
        y: height - 80 - idx * 20,
        size: 12,
        color: rgb(0, 0, 0),
      });
    });

    return pdfDoc.save();
  }

  const handleDownload = async () => {
    if (!validatedParticipants.length) return;
    setLoading(true);
    const pdfBytes = await generatePdf(validatedParticipants, "Top 20 Participants - Boys");
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Top20-Boys.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 rounded-md shadow-md p-4 text-center">
      <h1 className="text-xl font-bold mb-4">Top 20 Participants - Boys</h1>
      {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">Error fetching data</p> : (
        <button onClick={handleDownload} disabled={loading} className="bg-blue-500 p-3 rounded-lg text-white">
          {loading ? "Generating PDF..." : "Download PDF"}
        </button>
      )}
    </div>
  );
};

export default BoysCrossComponent;

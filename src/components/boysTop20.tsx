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
  const [logoBytes, setLogoBytes] = useState<ArrayBuffer>();
  
  const { data: participants, isLoading, error } = useBoys20();
  
  const validatedParticipants = participants?.filter((p) =>
    CrossDataSchema.safeParse(p).success
  ) ?? [];

  async function generatePdf(data: CrossData[], title?: string) {
    const pdfDoc = await PDFDocument.create();
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page = pdfDoc.addPage(PageSizes.A2);
    const { width, height } = page.getSize();
    const fontSize = 12;
    const margin = 50;
    const rowHeight = 40; 

    if (logoBytes) {
      const pngImage = await pdfDoc.embedPng(logoBytes);
      const pngDims = pngImage.scale(0.015);
      page.drawImage(pngImage, {
        x: width - margin - pngDims.width,
        y: height - margin + 10 - pngDims.height,
        width: pngDims.width,
        height: pngDims.height,
      });
    }

    let y = height - margin * 2;
    page.setFont(helveticaBoldFont);
    page.drawText(title || "Top 20 Participants - Boys", {
      x: margin,
      y,
      color: rgb(0, 0, 0),
      size: 30,
    });
    y -= rowHeight;

    page.setFont(helveticaFont);
    data.forEach((participant, idx) => {
      const formattedTime = participant.crossTime
        ? new Date(participant.crossTime).toLocaleString()
        : "N/A";
      const phoneNumber = participant.phone_no || "No Phone";
      const usn = participant.usn ? `USN: ${participant.usn}` : "USN: N/A";

      page.drawText(
        `${idx + 1}. ${participant.name} - ${formattedTime}`,
        { x: margin, y, size: fontSize, color: rgb(0, 0, 0) }
      );
      y -= 20; 
      page.drawText(
        `   Phone: ${phoneNumber} | ${usn}`,
        { x: margin, y, size: fontSize, color: rgb(0, 0, 0) }
      );
      y -= rowHeight;
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
    <div className="bg-gray-50 rounded-md shadow-md m-3 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 mx-auto p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-4 text-center">
        Top 20 Participants - Boys
      </h1>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error fetching data</p>
      ) : (
        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-black rounded-lg"
        >
          <span className="bg-blue-500 rounded-lg -translate-y-1 block gap-4 p-4 border-2 border-black text-xl hover:-translate-y-2 active:translate-x-0 active:translate-y-0 transition-all">
            {loading ? "Generating PDF..." : "Download PDF"}
          </span>
        </button>
      )}
    </div>
  );
};

export default BoysCrossComponent;

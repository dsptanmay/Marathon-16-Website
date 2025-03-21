"use client";

import { useUserInfo } from "@/hooks/get-user"; 
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ucSchema = z.object({
  unique_code: z.string().length(6, "Unique code must be 6 characters"),
});

type FormData = z.infer<typeof ucSchema>;

const GetCertificateComponent = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(ucSchema),
  });

  const unique_code = watch("unique_code");
  const { data: user, error, isFetching } = useUserInfo(unique_code);

  // Function to generate PDF certificate
  const generateCertificatePDF = async (participantName: string) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); 

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 30;
    const { width, height } = page.getSize();

    page.drawText("Certificate of Participation", {
      x: width / 2 - 150,
      y: height - 100,
      size: fontSize,
      color: rgb(0, 0, 0),
      font,
    });

    page.drawText(participantName, {
      x: width / 2 - 100,
      y: height - 200,
      size: fontSize,
      color: rgb(0, 0, 1),
      font,
    });

    return await pdfDoc.save();
  };


  const onSubmit = async () => {
    if (!user) return;

    if (!user.isCrossed) {
      alert("You are not eligible to download the certificate.");
      return;
    }

    const pdfBytes = await generateCertificatePDF(user.name);

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Certificate-${user.name}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center">Download Certificate</h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("unique_code")}
            className="p-3 border border-gray-400 rounded"
            placeholder="Enter Unique Code"
          />
          {errors.unique_code && <p className="text-red-500">{errors.unique_code.message}</p>}

          {isFetching && <p className="text-blue-500">Fetching user info...</p>}
          {error && <p className="text-red-500">User not found</p>}

          {/* Show error message if user exists but isCrossed is false */}
          {user && !user.isCrossed && (
            <p className="text-red-500">You are not eligible to download the certificate.</p>
          )}

          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={!user || isFetching || (user && !user.isCrossed)}
          >
            Download Certificate
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetCertificateComponent;

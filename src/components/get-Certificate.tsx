"use client"

import { AlertDescription } from "@/components/ui/alert"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useUserInfo } from "@/hooks/get-user"
import { PDFDocument, StandardFonts } from "pdf-lib"

export default function CodeValidator() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  // Use the hook with proper dependency
  const userInfoQuery = useUserInfo(code.length === 6 ? code : "")

  const generateCertificatePDF = async (participantName: string) => {
    try {
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([612, 792])
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      
      // Certificate title
      page.drawText("Certificate of Participation", { 
        x: 180, 
        y: 700, 
        size: 30, 
        font 
      })
      
      // Participant name
      page.drawText(`This certifies that`, { 
        x: 230, 
        y: 650, 
        size: 16, 
        font 
      })
      
      page.drawText(participantName, { 
        x: 230, 
        y: 600, 
        size: 25, 
        font 
      })
      
      page.drawText(`has successfully completed Marathon 16.0`, { 
        x: 175, 
        y: 550, 
        size: 16, 
        font 
      })
      
      // Date
      const today = new Date()
      const dateString = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      
      page.drawText(`Date: ${dateString}`, { 
        x: 250, 
        y: 450, 
        size: 14, 
        font 
      })
      
      // Signature
      page.drawText(`Team Pathfinder`, { 
        x: 240, 
        y: 400, 
        size: 14, 
        font 
      })

      return await pdfDoc.save()
    } catch (error) {
      console.error("PDF Generation Failed:", error)
      setError("Failed to generate certificate. Please try again.")
      return null
    }
  }

  const validateCode = (inputCode: string) => {
    if (!inputCode) return "Please enter a code"
    
  
    if (inputCode.length !== 6) return "Code must be exactly 6 characters"
    
  
    if (!/^[0-9]{5}[A-Z]$/.test(inputCode)) {
      return "Invalid format. Use 5 digits + 1 uppercase letter (e.g., 12345A)"
    }
    

    const digits = inputCode.slice(0, 5)
    const lastChar = inputCode.charAt(5)
    const expectedChar = String.fromCharCode(
      (digits.split("").reduce((sum, d) => sum + Number(d), 0) % 26) + 65
    )
    
    return lastChar === expectedChar ? null : `Invalid code. Expected last character: ${expectedChar}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    
    
    const validationError = validateCode(code)
    if (validationError) {
      setError(validationError)
      return
    }
    
    setIsValidating(true)
    
    try {
      // Refetch the user data
      await userInfoQuery.refetch()
      
      // Handle errors from the query
      if (userInfoQuery.isError) {
        const errorMessage = userInfoQuery.error instanceof Error 
          ? userInfoQuery.error.message 
          : "Something went wrong";
        
        setError(errorMessage);
        setIsValidating(false);
        return;
      }
      
      // Check if we have data
      if (!userInfoQuery.data) {
        setError("Failed to retrieve user information. Please try again.");
        setIsValidating(false);
        return;
      }

      const user = userInfoQuery.data;
      
   
      if (!user.isCrossed) {
        setError("You are not eligible to download the certificate.");
        setIsValidating(false);
        return;
      }
      
      // Generate and download the certificate
      const pdfBytes = await generateCertificatePDF(user.name);
      
      if (pdfBytes) {
        // Create a blob from the PDF bytes
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        
        // Create a download URL
        const url = window.URL.createObjectURL(blob);
        
        // Create and click a download link
        const a = document.createElement("a");
        a.href = url;
        a.download = `Certificate-${user.name}.pdf`;
        a.click();
        
        // Clean up
        window.URL.revokeObjectURL(url);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Certificate generation error:", error);
      setError("Failed to process your request. Please try again.");
    } finally {
      setIsValidating(false);
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-gradient-to-b from-blue-100 to-white">
      <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">Marathon 16.0</h1>
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">M16</div>
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
              className="text-center text-xl tracking-widest h-14 border-blue-300 focus-visible:ring-blue-500" 
              maxLength={6} 
            />
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={isValidating || userInfoQuery.isLoading}
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
  )
}
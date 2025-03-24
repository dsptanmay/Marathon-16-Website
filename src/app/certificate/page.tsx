// Use client-side rendering since this page contains interactive elements
"use client"

import CodeValidator from "@/components/get-Certificate"

export default function CertificatePage() {
  return (
    <div>
      <CodeValidator />
    </div>
  )
}

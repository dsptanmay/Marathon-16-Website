/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Html5Qrcode,
  Html5QrcodeScannerState,
  Html5QrcodeResult,
} from "html5-qrcode";
import { Button } from "@/components/ui/button";

interface QRScannerProps {
  onScanAction: (data: string) => Promise<void>;
  fps?: number;
  autoStart?: boolean;
}

export default function Scanner({
  onScanAction,
  fps = 15,
  autoStart = false,
}: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<
    "prompt" | "granted" | "denied" | "unavailable"
  >("prompt");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerId = "qr-scanner-element";

  useEffect(() => {
    scannerRef.current = new Html5Qrcode(scannerId);
    checkCameraPermission();

    return () => {
      stopScanner();
    };
  }, []);

  useEffect(() => {
    if (permissionState === "granted" && autoStart && !isScanning) {
      startScanner();
    }
  }, [permissionState]);

  const checkCameraPermission = async () => {
    try {
      if (navigator.permissions) {
        const result = await navigator.permissions.query({
          name: "camera" as PermissionName,
        });
        setPermissionState(result.state);
        result.addEventListener("change", () =>
          setPermissionState(result.state)
        );
      } else {
        setPermissionState("unavailable");
      }
    } catch {
      setPermissionState("unavailable");
    }
  };

  const requestCameraAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setPermissionState("granted");
    } catch {
      setError("Camera access denied. Please allow camera access.");
      setPermissionState("denied");
    }
  };

  const startScanner = async () => {
    if (!scannerRef.current) return;

    const config = {
      fps,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    try {
      await scannerRef.current.start(
        { facingMode: "environment" },
        config,
        async (decodedText: string, result: Html5QrcodeResult) => {
          console.log(" QR detected:", decodedText);
          if (/^\d{5}[A-Z]$/.test(decodedText)) {
            try {
              await onScanAction(decodedText);
              stopScanner(); // Stop after valid scan
            } catch (err) {
              console.error("Scan action failed", err);
              setError("Scan processing failed.");
            }
          } else {
            setError("Invalid QR format. Use 5 digits + 1 capital letter.");
          }
        },
        (errMsg) => {
          console.warn("No QR match:", errMsg);
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Failed to start scanner", err);
      setError("Failed to start scanner. Check permissions.");
    }
  };

  const stopScanner = async () => {
    if (
      scannerRef.current &&
      scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING
    ) {
      await scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-100 p-3 rounded-md">
        <div id={scannerId} className="aspect-square rounded-md overflow-hidden" />
      </div>

      {error && (
        <p className="text-red-500 mt-2 text-center">{error}</p>
      )}

      <div className="mt-4 flex justify-center">
        <Button
          onClick={() => {
            if (permissionState !== "granted") {
              requestCameraAccess();
            } else {
              isScanning ? stopScanner() : startScanner();
            }
          }}
        >
          {isScanning ? "Stop Scanner" : "Start Scanner"}
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import QRCode from "qrcode";

interface QRCodeDisplayProps {
  feedbackUrl: string;
  businessName: string;
}

export function QRCodeDisplay({ feedbackUrl, businessName }: QRCodeDisplayProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(feedbackUrl, {
          width: 300,
          margin: 2,
          color: {
            dark: "#1e40af",
            light: "#ffffff",
          },
        });
        setQrCodeDataUrl(dataUrl);
      } catch (err) {
        console.error("Error generating QR code:", err);
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [feedbackUrl]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = `${businessName.replace(/\s+/g, "-").toLowerCase()}-qr-code.png`;
    link.href = qrCodeDataUrl;
    link.click();
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Your Feedback QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {isLoading ? (
          <div className="w-[300px] h-[300px] flex items-center justify-center bg-gray-100 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <img
              src={qrCodeDataUrl}
              alt="Feedback QR Code"
              className="w-[300px] h-[300px]"
            />
          </div>
        )}

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Customers scan this code to leave feedback
          </p>
          <p className="text-xs text-gray-500 break-all">{feedbackUrl}</p>
        </div>

        <Button onClick={handleDownload} disabled={isLoading} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>

        <div className="bg-blue-50 p-4 rounded-lg w-full">
          <h4 className="font-medium text-blue-900 mb-2">How to use:</h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Print this QR code</li>
            <li>Display it at your checkout or service area</li>
            <li>Happy customers go to Google to leave a review</li>
            <li>Unhappy customers send feedback directly to you</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}

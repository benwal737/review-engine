"use client";

import { UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function QRCodePage() {
  const businessSlug = "demo-business";
  const businessName = "Demo Business";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const feedbackUrl = `${appUrl.replace("https://", "").replace("http://", "")}/feedback/${businessSlug}`;

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-primary">ReviewEngine</h1>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Your Feedback QR Code
          </h2>
          <p className="text-muted-foreground mt-2">
            Print this QR code and display it at your business
          </p>
        </div>

        <QRCodeDisplay feedbackUrl={feedbackUrl} businessName={businessName} />
      </main>
    </div>
  );
}

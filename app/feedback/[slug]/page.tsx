"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FeedbackForm } from "@/components/FeedbackForm";
import { ExternalLink } from "lucide-react";

type FeedbackStep = "initial" | "happy" | "unhappy";

export default function FeedbackPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [step, setStep] = useState<FeedbackStep>("initial");

  // In a real app, we would fetch the business details using the slug
  const businessName = "Demo Business";
  const googleReviewUrl = "https://www.google.com/maps"; // Placeholder

  if (step === "happy") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🌟</div>
            <CardTitle className="text-2xl">We&apos;re so glad!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600">
              Would you mind taking a moment to share your experience on Google?
              It really helps us out!
            </p>

            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full" size="lg">
                Leave a Google Review
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>

            <Button
              variant="ghost"
              className="w-full text-gray-500"
              onClick={() => setStep("initial")}
            >
              Maybe later
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "unhappy") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">💬</div>
            <CardTitle className="text-2xl">We want to make it right</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center mb-6">
              We&apos;re sorry to hear that. Please share your feedback and
              we&apos;ll do our best to improve.
            </p>
            <FeedbackForm businessSlug={slug} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{businessName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-xl text-center text-gray-700">
            How was your experience?
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-green-50 hover:border-green-300"
              onClick={() => setStep("happy")}
            >
              <span className="text-5xl">😊</span>
              <span className="font-medium">Great!</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-orange-50 hover:border-orange-300"
              onClick={() => setStep("unhappy")}
            >
              <span className="text-5xl">😐</span>
              <span className="font-medium">Could be better</span>
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            Your feedback helps us improve our service
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

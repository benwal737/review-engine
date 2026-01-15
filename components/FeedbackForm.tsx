"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle } from "lucide-react";

interface FeedbackFormProps {
  businessSlug: string;
  onSubmitSuccess?: () => void;
}

export function FeedbackForm({ businessSlug, onSubmitSuccess }: FeedbackFormProps) {
  const [feedbackText, setFeedbackText] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessSlug,
          sentiment: "negative",
          feedbackText,
          customerEmail: email || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit feedback");
      }

      setIsSubmitted(true);
      onSubmitSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Thank you for your feedback!
        </h3>
        <p className="text-gray-600">
          We appreciate you taking the time to share your experience. We&apos;ll use
          this to improve our service.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="feedback"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tell us about your experience
        </label>
        <Textarea
          id="feedback"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="We'd love to hear your thoughts and how we can improve..."
          rows={4}
          required
          className="w-full"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email (optional)
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave your email if you&apos;d like us to follow up with you
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Feedback"
        )}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import { MockReview } from "@/lib/mockData";

interface ReviewCardProps {
  review: MockReview;
  businessName?: string;
  onReplyGenerated?: (reviewId: string, reply: string) => void;
}

export function ReviewCard({
  review,
  businessName = "Your Business",
  onReplyGenerated,
}: ReviewCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [editedReply, setEditedReply] = useState(review.actualReply || "");
  const [showReplyBox, setShowReplyBox] = useState(false);

  const generateReply = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewText: review.text,
          rating: review.rating,
          businessName,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate reply");

      const data = await response.json();
      setEditedReply(data.reply);
      setShowReplyBox(true);
      onReplyGenerated?.(review.id, data.reply);
    } catch (error) {
      console.error("Error generating reply:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-warning text-warning"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className={review.responded ? "border-success/30 bg-success/8" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{review.authorName}</span>
              <span className="text-xs text-muted-foreground">
                via {review.platform}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {renderStars(review.rating)}
              <span className="text-sm text-muted-foreground">
                {formatDate(review.reviewDate)}
              </span>
            </div>
          </div>
          {review.responded && (
            <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
              Responded
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">{review.text}</p>

        {review.actualReply && (
          <div className="mt-4 p-3 bg-card/50 rounded-lg border border-accent">
            <p className="text-xs font-medium text-accent-foreground mb-1">Your Reply:</p>
            <p className="text-sm text-foreground">{review.actualReply}</p>
          </div>
        )}

        {showReplyBox && !review.responded && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">AI-Generated Reply:</p>
            <Textarea
              value={editedReply}
              onChange={(e) => setEditedReply(e.target.value)}
              rows={4}
              className="text-sm"
            />
          </div>
        )}
      </CardContent>
      {!review.responded && (
        <CardFooter className="flex gap-2">
          {!showReplyBox ? (
            <Button
              onClick={generateReply}
              disabled={isGenerating}
              variant="default"
              size="sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Reply"
              )}
            </Button>
          ) : (
            <>
              <Button size="sm" variant="default">
                Post Reply
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowReplyBox(false)}
              >
                Cancel
              </Button>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Star, MessageSquare, Clock, TrendingUp, QrCode } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ReviewCard } from "@/components/ReviewCard";
import { mockReviews, mockBusinessStats } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const [reviews, setReviews] = useState(mockReviews);

  const pendingReviews = reviews.filter((r) => !r.responded);

  const handleReplyGenerated = (reviewId: string, reply: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, aiSuggestedReply: reply } : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-primary">ReviewEngine</h1>
            <div className="flex items-center gap-4">
              <Link href="/dashboard/qr-code">
                <Button variant="outline" size="sm">
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your reviews and track customer feedback
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Average Rating"
            value={mockBusinessStats.averageRating.toFixed(1)}
            description="Based on all reviews"
            icon={<Star className="h-4 w-4" />}
          />
          <StatCard
            title="Total Reviews"
            value={mockBusinessStats.totalReviews}
            description="All time"
            icon={<MessageSquare className="h-4 w-4" />}
          />
          <StatCard
            title="Pending Responses"
            value={mockBusinessStats.pendingResponses}
            description="Reviews awaiting reply"
            icon={<Clock className="h-4 w-4" />}
          />
          <StatCard
            title="Reply Rate"
            value={`${mockBusinessStats.replyRate}%`}
            description="Reviews responded to"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Pending Reviews ({pendingReviews.length})
            </h3>
            <Button variant="outline" size="sm">
              View All Reviews
            </Button>
          </div>

          {pendingReviews.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">
                All caught up!
              </h3>
              <p className="text-muted-foreground">
                You&apos;ve responded to all your reviews
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  businessName="Your Business"
                  onReplyGenerated={handleReplyGenerated}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Recently Responded
          </h3>
          <div className="grid gap-4">
            {reviews
              .filter((r) => r.responded)
              .slice(0, 3)
              .map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}

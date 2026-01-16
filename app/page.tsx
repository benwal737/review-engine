import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, QrCode, MessageSquare, TrendingUp } from "lucide-react";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-primary">ReviewEngine</h1>
            <div className="flex gap-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Turn Happy Customers Into
            <span className="text-primary"> 5-Star Reviews</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Automatically collect feedback, filter unhappy customers, and boost
            your Google reviews with AI-powered response suggestions.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/feedback/demo-business">
              <Button size="lg" variant="outline" className="text-lg px-8">
                See Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold text-center text-foreground mb-12">
          How it works
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<QrCode className="h-8 w-8 text-primary" />}
            title="QR Code Feedback"
            description="Generate QR codes for customers to scan and leave feedback instantly"
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8 text-primary" />}
            title="Smart Filtering"
            description="Happy customers go to Google, unhappy ones send feedback to you privately"
          />
          <FeatureCard
            icon={<Star className="h-8 w-8 text-primary" />}
            title="AI Responses"
            description="Generate professional, personalized replies to reviews in seconds"
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8 text-primary" />}
            title="Analytics Dashboard"
            description="Track your review performance and response rates over time"
          />
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Get more 5-star reviews
          </h3>
          <p className="text-primary-foreground/70 text-lg mb-8">
            Start collecting feedback in minutes
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} ReviewEngine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

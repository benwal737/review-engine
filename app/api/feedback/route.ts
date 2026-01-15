import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const feedbackSchema = z.object({
  businessSlug: z.string().min(1, "Business slug is required"),
  sentiment: z.enum(["positive", "negative"]),
  feedbackText: z.string().optional(),
  customerEmail: z.string().email().optional().or(z.literal("")),
  customerName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = feedbackSchema.parse(body);

    const business = await prisma.business.findUnique({
      where: { feedbackPageSlug: validatedData.businessSlug },
    });

    if (!business) {
      // Dev mode: return success even if business doesn't exist yet
      console.log("Business not found, returning mock success");
      return NextResponse.json({
        success: true,
        message: "Feedback received (development mode)",
        id: "mock-feedback-id",
      });
    }

    const feedback = await prisma.feedback.create({
      data: {
        businessId: business.id,
        sentiment: validatedData.sentiment,
        feedbackText: validatedData.feedbackText || null,
        customerEmail: validatedData.customerEmail || null,
        customerName: validatedData.customerName || null,
        wentToGoogle: validatedData.sentiment === "positive",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully",
      id: feedback.id,
    });
  } catch (error) {
    console.error("Error saving feedback:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}

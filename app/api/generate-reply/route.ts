import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const requestSchema = z.object({
  reviewText: z.string().min(1, "Review text is required"),
  rating: z.number().min(1).max(5),
  businessName: z.string().min(1, "Business name is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewText, rating, businessName } = requestSchema.parse(body);

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return a mock response if no API key is configured
      const mockReply = generateMockReply(rating, businessName);
      return NextResponse.json({ reply: mockReply });
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `You are a helpful assistant that writes professional, friendly business responses to customer reviews.

Business Name: ${businessName}
Customer Review Rating: ${rating}/5 stars
Customer Review: "${reviewText}"

Write a concise, professional response to this review. The response should:
- Be warm and appreciative
- Address any specific points mentioned in the review
- ${rating >= 4 ? "Thank them for their kind words and invite them back" : "Apologize for any issues, show empathy, and offer to make things right"}
- Be 2-3 sentences long
- Not be overly formal or robotic

Response:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("No response generated");
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error generating reply:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate reply" },
      { status: 500 }
    );
  }
}

function generateMockReply(rating: number, businessName: string): string {
  if (rating >= 4) {
    return `Thank you so much for your wonderful feedback! We're thrilled to hear you had a great experience at ${businessName}. We look forward to welcoming you back soon!`;
  } else if (rating === 3) {
    return `Thank you for taking the time to share your feedback. At ${businessName}, we're always looking to improve, and your input helps us do that. We hope to exceed your expectations on your next visit!`;
  } else {
    return `We sincerely apologize that your experience at ${businessName} didn't meet your expectations. Your feedback is valuable to us, and we'd love the opportunity to make things right. Please reach out to us directly so we can address your concerns.`;
  }
}

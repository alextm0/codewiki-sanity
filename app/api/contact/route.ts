import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email, type, message } = data;

  // Validate the input fields
  if (!name || !email || !type || !message) {
    return NextResponse.json(
      {
        message: "All fields are required",
      },
      { status: 400 }
    );
  }

  try {
    // Create a new feedback comment in Sanity
    const newFeedbackComment = await client.create({
      _type: "feedbackComment",
      name,
      email,
      type,
      message,
      createdAt: new Date().toISOString(),
      published: false,  // By default, set published to false
    });

    return NextResponse.json(
      { message: "Feedback submitted successfully", feedbackComment: newFeedbackComment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to submit feedback", error },
      { status: 500 }
    );
  }
}

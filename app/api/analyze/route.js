import { NextResponse } from "next/server";
import { callLLM } from "@/lib/llm";

export async function POST(request) {
  try {
    const body = await request.json();
    const skills = (body?.skills || "").trim();
    const targetRole = (body?.targetRole || "").trim();

    if (!skills || !targetRole) {
      return NextResponse.json(
        { error: "Both 'skills' and 'targetRole' are required." },
        { status: 400 }
      );
    }

    const result = await callLLM({ skills, targetRole });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Analyze route error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong while analyzing." },
      { status: 500 }
    );
  }
        }

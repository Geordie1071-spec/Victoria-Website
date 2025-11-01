// app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Review } from "@/app/lib/reviews";

const DATA_FILE = path.join(process.cwd(), "data", "reviews.json");

async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readReviews(): Promise<Review[]> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeReviews(reviews: Review[]): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2));
}

export async function GET() {
  try {
    const reviews = await readReviews();
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, content } = await request.json();

    if (!name || !content) {
      return NextResponse.json(
        { error: "Name and content are required" },
        { status: 400 }
      );
    }

    const reviews = await readReviews();

    const newReview: Review = {
      id: Date.now().toString(),
      name,
      content,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    await writeReviews(reviews);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}

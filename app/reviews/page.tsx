import { Review } from "@/app/api/reviews/route";
import { Navbar, ReviewsMain } from "@/components";

async function getReviews(): Promise<Review[]> {
  try {
    const response = await fetch("/api/reviews", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export default async function ReviewsPage() {
  const initialReviews = await getReviews();

  return (
    <>
      <Navbar />
      <ReviewsMain initialReviews={initialReviews} />
    </>
  );
}

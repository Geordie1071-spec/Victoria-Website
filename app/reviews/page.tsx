import { ReviewsMain } from "@/components";
import { Review } from "@/types";

async function getReviews(): Promise<Review[]> {
  try {
    const response = await fetch("http://localhost:5000/api/reviews", {
      cache: "no-store",
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched reviews:", data);
      return data;
    }
    
    throw new Error("Failed to fetch reviews");
    
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export default async function ReviewsPage() {
  const initialReviews = await getReviews();

  return (
    <>
      <ReviewsMain initialReviews={initialReviews} />
    </>
  );
}

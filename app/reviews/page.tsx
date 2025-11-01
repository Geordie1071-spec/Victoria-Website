// app/reviews/page.tsx
import { Review } from "@/app/lib/reviews";
import { Navbar, ReviewsMain } from "@/components";

async function getReviews(): Promise<Review[]> {
  try {
    const response = await fetch('http://localhost:3000/api/reviews', {
      cache: 'no-store', 
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export default async function ReviewsPage() {
  const initialReviews = await getReviews();

  return (
    <>
      <Navbar/>
     <ReviewsMain initialReviews={initialReviews} />
    </>
 )
  ;
}
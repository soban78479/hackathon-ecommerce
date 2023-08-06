"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
export default function detailPage({ params }) {
    const router = useRouter(); 
    const { id } = params;
    console.log(id);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/api/postReviewApi/${id}`);
        const data = await response.json();
        setReviews(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="mt-20">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center sm:text-4xl">Products Reviews</h1>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {reviews.map((review) => (
               <li key={review.id} className="flex justify-between gap-x-6 py-5">
               <div className="flex gap-x-4">
                 <img
                   className="h-12 w-12 flex-none rounded-full bg-gray-50"
                   src="/icons8-user-100.png"
                   alt=""
                 />
                 <div className="min-w-0 flex-auto">
                   <p className="text-m font-semibold leading-6 text-gray-900">
                     {review.rating}
                   </p>
                   <p className="mt-1 truncate text-m leading-5 text-gray-500">
                     {review.description}
                   </p>
                 </div>
               </div>
               
             </li>
              ))}
            </div>
          )}
        </div>
      );
}

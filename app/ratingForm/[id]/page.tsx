"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
export default function RatingForm({ params }) {
    const router = useRouter(); 
    const { id } = params;
    const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const { data: session } = useSession();

  const addRating = async (event) => {
    event.preventDefault();
    const user = session?.user?.id;
    console.log('User ID:', user);
    console.log('Post ID:', id);
    // Check if the user is authenticated before adding the post to the cart
    if (!session?.user) {
      // Redirect the user to the login page or show a message indicating they need to be logged in
      return router.push('/login');
    }

    try {
      // Add the post to the cart by calling the addToCart API route
      const response = await fetch('https://hackathon-ecommerce-lyart.vercel.app/api/postRatingApi', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          id,
          rating,
          description
        }),
      });

      if (response.ok) {
        router.push(`/detailPage/${id}`);
        // Handle the success case (e.g., show a success message)
        console.log("Post added to cart successfully");
      } else {
        // Handle the error case (e.g., show an error message)
        console.error("Error adding post to cart");
      }
    } catch (error) {
      console.error("Error adding post to cart:", error);
    }
  };

return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-20">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    
            <img className="mx-auto h-10 w-auto" src="/icons8-user-100.png" alt="Your Company">
            </img>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Rate The Product</h2>
    
    
          </div>
    
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={addRating}>
            
              <div>
                <label htmlFor="rate" className="block text-sm font-medium leading-6 text-gray-900">Rate Product</label>
                <div className="mt-2">
                  <input value={rating} onChange={(e) => setRating(e.target.value)} id="rate" name="rate" type="text" placeholder="3 star"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  </input>
                </div>
              </div>
    
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
    
                </div>
                <div className="mt-2">
                  <input value={description} onChange={(e) => setDescription(e.target.value)} id="description" name="description" type="description"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  </input>
                </div>
              </div>
    
              <div>
              <button type="submit"
              className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
               Send review
                </button> </div>
            </form>
            {/* <br />
            <p style={{ display: 'flex', alignItems: 'center' }}>
              Already member? Click here to&nbsp;
              <span> 
              </span>
            </p> */}
          </div>
        </div>
      )

}
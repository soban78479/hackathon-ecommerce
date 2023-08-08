"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log(userId);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://hackathon-ecommerce-lyart.vercel.app/api/allCartPostsApi/${userId}`
      );
      const data = await response.json();
      setPosts(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const getTotalPrice = () => {
    let totalPrice = 0;
    posts.forEach((post) => {
      totalPrice += parseFloat(post.price);
    });
    return totalPrice;
  };

  // Function to handle when the "Order" button is clicked
  const handleOrderClick = () => {
    // Open the popup
    setIsPopupOpen(true);
  };

  // Function to handle when the "Ship My Order" button in the popup is clicked
  const handleShipOrderClick = () => {
    // Close the popup
    setIsPopupOpen(false);

    // Show the message that the order has been delivered
    alert("Your order has been delivered!");
  };

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-400">
      <div className="mt-20">
        {isPopupOpen && (
          <div style={{ zIndex: 100 }} className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4">Enter your address:</h2>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="mt-4 flex justify-end">
                <button
                  className="text-white bg-green-500 px-4 py-2 rounded-md font-bold mr-2"
                  onClick={handleShipOrderClick}
                >
                  Ship My Order
                </button>
                <button
                  className="text-white bg-red-500 px-4 py-2 rounded-md font-bold"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <h1
          style={{ paddingTop: 20 }}
          className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Manage Your Cart Produts
        </h1>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Total Price: ${getTotalPrice().toFixed(2)}
          </h2>
        </div>
        <div
          style={{ marginTop: 30 }}
          className="min-h-screen flex justify-center items-center "
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* Use the grid CSS class with different columns based on screen size */}
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="max-w-xs container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl allPosts"
                >
                  <div>
                    <span className="text-white text-xs font-bold rounded-lg bg-green-500 inline-block mt-4 ml-4 py-1.5 px-4 cursor-pointer">
                      <button
                        type="button"
                        onClick={() => router.push(`/detailPage/${post.id}`)}
                        className="post-link"
                      >
                        Detail
                      </button>
                    </span>
                    <button
                      onClick={handleOrderClick}
                      className="text-white text-xs font-bold rounded-lg bg-green-500 inline-block mt-4 ml-4 py-1.5 px-4 cursor-pointer"
                    >
                      Order
                    </button>
                    <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 hover:cursor-default hover:text-gray-900 transition duration-100">
                      {post.title}
                    </h1>
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        maxHeight: "3rem", // Adjust this value as per your desired line height
                      }}
                      className="ml-4 mt-1 mb-2 hover:cursor-default text-gray-700 cursor-arrow"
                    >
                      $ {post.price}
                    </p>
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        maxHeight: "3rem", // Adjust this value as per your desired line height
                      }}
                      className="ml-4 mt-1 mb-2 hover:cursor-default text-gray-700 cursor-arrow"
                    >
                      {post.description}
                    </p>
                  </div>
                  <img
                    style={{ height: "300px" }}
                    className="w-full"
                    src={post.image} // Use the post image URL directly
                    alt="image"
                  />
                  <div className="flex p-4 justify-between">
                    <div className="flex items-center space-x-2">
                      {/* Add your user profile details here */}
                    </div>
                    <div className="flex space-x-2">
                      {/* Add your like and dislike buttons here */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

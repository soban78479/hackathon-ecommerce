"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Righteous } from "next/font/google";
export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const router = useRouter();
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/allPostsApi");
      const data = await response.json();
      setPosts(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const filteredPosts = posts.filter((post) =>
  categoryFilter.toLowerCase() === "all" || post.category.toLowerCase() === categoryFilter.toLowerCase()
);

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-400" >
      <div className="mt-20" >
      <h1 style={{ paddingTop: 20 }} className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
       Produts 
       <select style={{ width: 150 , float:"right"}}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm font-medium text-gray-900"
          >
            <option value="all">All</option>
            <option value="clothing">Clothing</option>
            <option value="shoes">Shoes</option>
            <option value="others">Others</option>
          </select>
      </h1>
     
      <div
        style={{ marginTop: 30 }}
        className="min-h-screen flex justify-center items-center "
      >
        
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Use the grid CSS class with different columns based on screen size */}
            {filteredPosts.map((post) => (
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
                  className="ml-4 mt-1 mb-2 hover:cursor-default text-gray-700 cursor-arrow">
                    ${post.price}
                  </p>
                  <p 
                   style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    maxHeight: "3rem", // Adjust this value as per your desired line height
                  }}
                  className="ml-4 mt-1 mb-2 hover:cursor-default text-gray-700 cursor-arrow">
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

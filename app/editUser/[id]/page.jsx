'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function EditUser({ params }) {
  const { id } = params;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api/oneUserApi/${id}`);
      const data = await response.json();
      setUser(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/editUserApi/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      // Handle the response data as needed
      console.log(data);
        // Navigate to the All Users page
        router.push('/allUsers');
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
 
    <img class="mx-auto h-10 w-auto" src="/icons8-user-100.png" alt="Your Company">
 </img>
 <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Update Account</h2>

   
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" onSubmit={updateUser}>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input  placeholder={isLoading ? "Loading..." : user?.email}    onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </input>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          
        </div>
        <div class="mt-2">
          <input placeholder={isLoading ? "Loading..." : user?.password}    onChange={(e) => setPassword(e.target.value)}  id="password" name="password" type="text" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </input>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
      </div>
    </form>

    
  </div>
</div>
  );
}

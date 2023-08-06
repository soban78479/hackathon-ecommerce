'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/loginApi', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log(data); // Handle the response data accordingly
              router.push("/allUsers"); // Navigate to the All Users page
            } else {
              throw new Error("Login failed");
            }
          } catch (error) {
            console.error("Error login user:", error);
            router.push("/");
          }
        };
    return (
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-20">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">

                <img class="mx-auto h-10 w-auto" src="/icons8-user-100.png" alt="Your Company">
                </img>
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>


            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" onSubmit={loginUser}>
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </input>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>

                        </div>
                        <div class="mt-2">
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </input>
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                    </div>
                </form>


            </div>
        </div>
    )
}



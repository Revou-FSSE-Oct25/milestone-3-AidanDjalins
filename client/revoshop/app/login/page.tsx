"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Login succesful!");

                // Check user role for apropriate redirection
                const response = await fetch("/api/auth/session");
                const session = await response.json();

                if (session?.user?.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/");
                }
            }
        } catch (error) {
            console.error("Error: ", error);
            toast.error("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to continue to RevShop</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="john@mail.com"
                        required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter your password..."
                        required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>                    
                </form>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Demo accounts:</p>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>Customer: john@mail.com / password: changeme</p>
                        <p>Admin: admin@mail.com / password: admin123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
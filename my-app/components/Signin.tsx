"use client"
//what ever part will be required clent components
//amake that part only cline components by make seperate them 

import { useState } from "react";

import Button from "./Button";
import { useRouter } from "next/navigation";

export default function SignInComponenets() {

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Sign In
                </h1>

                <form className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>

                        <input
                            onChange = {(e) => setUsername(e.target.value)}
                            value={username}
                            type="text"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <input
                            onChange = {(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Sign In Button */}
                    <Button username={username} password={password} />

                </form>
            </div>
        </div>
    );
}
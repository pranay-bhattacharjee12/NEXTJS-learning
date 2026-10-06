"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signin } from "@/app/actions/user";

type ButtonProps = {
  username: string;
  password: string;
};

export default function Button({ username, password }: ButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitHandler() {
    setLoading(true);
    setError("");

    const success = await signin(username, password);

    setLoading(false);

    if (success) {
      router.push("/");
    } else {
      setError("Failed to sign in. Please check your credentials.");
    }
  }

  return (
    <div>
      <button
        onClick={submitHandler}
        disabled={loading}
        type="button"
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
"use client"

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Appbar() {
    // session = logged-in user info (or null)
    // status = "loading" | "authenticated" | "unauthenticated"
    const { data: session, status } = useSession();

    return (
        <nav className="flex items-center justify-between border-b px-6 py-3">
            <Link href="/" className="text-xl font-bold">
                MyApp
            </Link>

            <div className="flex items-center gap-4">
                {status === "loading" && (
                    <span className="text-sm text-gray-500">Loading...</span>
                )}

                {status === "unauthenticated" && (
                    <>
                        {/* signIn() with no arguments goes to your
                            pages.signIn page ("/signin") */}
                        <button
                            onClick={() => signIn()}
                            className="rounded bg-black px-4 py-2 text-sm text-white"
                        >
                            log out 
                        </button>
                        <Link
                            href="/signin"
                            className="rounded border px-4 py-2 text-sm"
                        >
                            Sign in
                        </Link>
                    </>
                )}

                {status === "authenticated" && (
                    <>
                        <span className="text-sm">
                            Hi, <b>{session.user?.name}</b>
                        </span>
                        {/* signOut() clears the session cookie,
                            then sends the user to callbackUrl */}
                        <button
                            onClick={() => signOut({ callbackUrl: "/signin" })}
                            className="rounded bg-red-500 px-4 py-2 text-sm text-white"
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
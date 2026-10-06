// To start: npm run dev
// page.tsx inside /app is the file for the "/" route (home page).

// ─── SERVER COMPONENT ────────────────────────────────────────────
// No "use client" at the top → this is a SERVER component (the default).
// It runs only on the server, never in the browser. That means:
//   ✅ it can be async
//   ✅ it can talk to the database directly (prisma), no API route needed
//   ✅ secrets like DATABASE_URL stay safe on the server
//   ❌ no hooks (useState, useEffect) and no event handlers (onClick)
// ────────────────────────────────────────────────────────────────

import { prisma } from "@/lib/prisma";

// A plain async helper that reads from the DB.
// Because this file is a server component, we can call it directly
// instead of doing fetch("/api/user") or axios.get(...).
// In a CLIENT component this would NOT work: the browser can't access
// the database, so there you must call an API route instead.
async function fetchUserDetails() {
  // findFirst() returns the first row, or null if the table is empty
  const user = await prisma.user.findFirst({
    orderBy: { id: "desc" }, // get the most recent user
  });

  return {
    // "?." (optional chaining) avoids a crash when user is null
    username: user?.username,
  };
}

// Server components can be async functions.
// Next.js waits for the data, builds the HTML on the server,
// and sends the ready page to the browser (good for speed and SEO).
export default async function Home() {
  // "await" works directly in the component. No useEffect needed.
  const userDetails = await fetchUserDetails();

  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        hi there, welcome to home page learn next.js
      </h1>
      <div className="w-full max-w-sm rounded-2xl bg-gray-900 p-6 shadow-xl">
        {/* Only use fields that fetchUserDetails actually returns */}
        <h2 className="text-xl font-semibold text-white">
          {userDetails.username ?? "No user found"}
        </h2>
      </div>
    </>
  );
}
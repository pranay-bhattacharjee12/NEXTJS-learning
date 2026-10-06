// "use server" marks every function in this file as a SERVER ACTION.
// - The code here runs ONLY on the server, never in the browser.
// - Users can't see this code or your database details in their browser.
// - Next.js lets client components call these functions directly,
//   so you don't need an API route, fetch or axios.
// - It must be the very first line of the file.
"use server"

// Import the shared Prisma client from lib/prisma.ts.
// Prisma is an ORM: it lets you talk to the database with TypeScript
// instead of writing raw SQL queries.
// We reuse one client instead of creating a new one on every call,
// which avoids opening too many database connections.
import { prisma } from "@/lib/prisma";

// "export" lets other files (like Button.tsx) import and call this function.
// "async" is needed because database calls take time and return a Promise.
//
// OLD WAY (API route): data came from the request -> await req.json()
// NEW WAY (server action): data arrives directly as function arguments.
// Typing them as string makes TypeScript check that callers pass the right kind of data.
export async function signin(username: string, password: string) {

    // try/catch: if anything inside "try" fails (duplicate username,
    // database down, etc.), the code jumps to "catch" instead of crashing.
    try {

        // prisma.user    -> the "User" table/model from your schema.prisma
        // .create()      -> inserts a new row into that table
        // data: { ... }  -> the column values for the new row
        // "await" pauses here until the database finishes saving.
        await prisma.user.create({
            data: {
                username: username,   // column: value (could be shortened to just `username`)
                password: password    // ⚠️ stored as plain text; hash it with bcryptjs in real apps
            }
        });

        // OLD WAY: return Response.json({ ... })
        // NEW WAY: return a plain value. Next.js sends it back to the
        // client automatically, and the caller receives it as a normal result:
        //   const success = await signin(username, password);  // success = true
        return true;

    } catch (e) {
        // console.error prints in your TERMINAL (server), not the browser console,
        // because this code runs on the server.
        console.error("Error creating user:", e);

        // Tell the caller it failed, so the UI can show an error message
        // instead of redirecting.
        return false;
    }
}

// HOW IT'S USED (in a "use client" component):
//
//   import { signin } from "@/app/actions/user";
//
//   const success = await signin(username, password);
//   if (success) router.push("/");
//   else setError("Signin failed");
//
// Behind the scenes, Next.js still sends a POST request to the server,
// but it handles all of that for you, so the call looks like a normal function.
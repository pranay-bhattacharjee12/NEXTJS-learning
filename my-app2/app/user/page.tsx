
import { getServerSession } from "next-auth/next";
import Appbar from "@/components/Appbar";
import { NEXT_AUTH } from "@/lib/auth";


export default async function UserPage() {
    const session = await getServerSession(NEXT_AUTH);
  return (
    <div>
      <h1>User Page</h1>
      <p>This is the user page.</p>
      <Appbar />
      {JSON.stringify(session)}
    </div>
  );
}
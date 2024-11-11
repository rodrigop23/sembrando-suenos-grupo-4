import { getCurrentUser } from "@/actions/user/action";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <div>Home</div>;
}

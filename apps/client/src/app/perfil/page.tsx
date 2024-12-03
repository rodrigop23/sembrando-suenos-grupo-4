import { getCurrentUser } from "@/actions/user/action";
import UserProfile from "@/components/user-profile";
import { redirect } from "next/navigation";

export default async function UserProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const data = {
    username: user.username,
    name: user.name ?? "",
    lastName: user.lastName ?? "",
    email: user.email,
    bio: user.bio ?? "",
  };

  return <UserProfile id={user.id} data={data} />;
}

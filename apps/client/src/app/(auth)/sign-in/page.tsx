import { getCurrentUser } from "@/actions/user/action";
import SignInForm from "@/components/forms/sign-in-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-3 sm:px-0">
      <SignInForm />
    </div>
  );
}

import { getCurrentUser } from "@/actions/user/action";
import SignInForm from "@/components/forms/sign-in-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-0 my-10 sm:my-14 md:my-20">
      <SignInForm />
    </div>
  );
}

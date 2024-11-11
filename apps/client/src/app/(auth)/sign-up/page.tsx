import { getCurrentUser } from "@/actions/user/action";
import SignUpForm from "@/components/forms/sign-up-form";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-0 my-10 sm:my-14 md:my-20">
      <SignUpForm />
    </div>
  );
}

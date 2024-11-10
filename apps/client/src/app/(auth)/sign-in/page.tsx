import SignInForm from "@/components/forms/sign-in-form";

export default async function SignInPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-3 sm:px-0">
      <SignInForm />
    </div>
  );
}

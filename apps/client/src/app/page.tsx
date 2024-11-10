import { getCurrentUser, logoutUserAction } from "@/actions/user/action";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <form action={logoutUserAction}>
        <Button type="submit">Cerrar sesión</Button>
      </form>
    </div>
  );
}

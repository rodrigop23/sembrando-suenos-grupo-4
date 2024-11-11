import { getCurrentUser } from "@/actions/user/action";
import NavbarMain from "./navbar-main";

export default async function NavbarWrapper() {
  const user = await getCurrentUser();

  return <NavbarMain userData={user} />;
}

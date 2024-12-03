import { LogOut, User } from "lucide-react";
import { logoutUserAction } from "@/actions/user/action";
import { IUser } from "@/interface/user.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface UserNavProps {
  userData: IUser | null;
}

export function UserNav({ userData }: Readonly<UserNavProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
            <AvatarFallback>
              {userData?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userData?.username}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/perfil">
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => logoutUserAction()}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

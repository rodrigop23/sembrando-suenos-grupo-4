"use client";

import { useEffect, useState } from "react";
import { LogOut, Menu, Settings, User } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { UserNav } from "./user-nav";
import NavbarItems from "./navbar-items";
import logo from "@/assets/logo.png";
import { IUser } from "@/interface/user.interface";

interface NavbarListProps {
  userData: IUser | null;
}

export default function NavbarMain({ userData }: Readonly<NavbarListProps>) {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <Image src={logo} alt="Logo" width={35} height={35} />
            <span className="text-xl font-bold">Sembrando Sueños</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavbarItems />

            {userData ? (
              <UserNav userData={userData} />
            ) : (
              <Button onClick={() => router.push("sign-in")} className="w-full">
                Comenzar
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      <Icons.user />
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium">{userData?.username}</p>
                    <p className="text-xs text-muted-foreground">
                      {userData?.email}
                    </p>
                  </div>
                </div>
                <NavbarItems />
                <Separator className="my-4" />
                <Button variant="ghost" className="justify-start px-2">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Button>
                <Button variant="ghost" className="justify-start px-2">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </Button>
                <Button variant="ghost" className="justify-start px-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}

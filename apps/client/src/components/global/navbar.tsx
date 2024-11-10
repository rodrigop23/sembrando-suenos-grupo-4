"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import NarvarList from "./navbar-list";

export default function NavBar() {
  return (
    <nav className="flex items-center p-2 md:p-4">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="Logo" width={35} height={35} />
        <span className="font-medium text-lg">Sembrando Sueños</span>
      </div>

      <div className="ml-auto">
        {/* Desktop */}
        <div className="hidden md:flex items-center md:gap-2 lg:gap-4">
          <NarvarList />
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col items-center gap-4 p-4">
                <NarvarList />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

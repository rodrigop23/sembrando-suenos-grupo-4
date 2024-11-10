"use client";

import Link from "next/link";
import { cn } from "../lib/utils";

import { usePathname } from "next/navigation";

interface LinkButtonProps {
  name: string;
  path: string;
}

const LinkButton = ({ name, path }: LinkButtonProps) => {
  const pathname = usePathname();

  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={cn(
        "text-base w-full flex-1 text-center hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md",
        isActive ? "bg-accent text-accent-foreground" : ""
      )}
    >
      <span>{name}</span>
    </Link>
  );
};

export default LinkButton;

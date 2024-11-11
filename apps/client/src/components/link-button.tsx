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
        "text-sm font-medium hover:text-primary transition-colors",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      <span>{name}</span>
    </Link>
  );
};

export default LinkButton;

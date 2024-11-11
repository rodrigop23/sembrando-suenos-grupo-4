"use client";

import { useRouter } from "next/navigation";
import LinkButton from "../link-button";
import { Button } from "../ui/button";

export default function NarbarList() {
  const router = useRouter();

  return (
    <>
      <LinkButton name="Equipo" path="/equipo" />
      <LinkButton name="Actividades" path="/actividades" />
      <LinkButton name="Eventos" path="/eventos" />
      <LinkButton name="Blog" path="/blog" />
      <Button onClick={() => router.push("sign-in")} className="w-full">
        Comenzar
      </Button>
    </>
  );
}

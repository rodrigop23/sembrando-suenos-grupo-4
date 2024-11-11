import LinkButton from "@/components/link-button";

export default function NavbarItems() {
  return (
    <>
      <LinkButton name="Equipo" path="/equipo" />
      <LinkButton name="Actividades" path="/actividades" />
      <LinkButton name="Eventos" path="/eventos" />
      <LinkButton name="Blog" path="/blog" />
    </>
  );
}

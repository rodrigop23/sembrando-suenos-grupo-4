import { getHomeDataAction } from "@/actions/home/action";
import GetInvolvedSection from "@/components/home-page/get-involved-section";
import HeroSection from "@/components/home-page/hero-section";
import MissionSection from "@/components/home-page/mission-section";
import ProyectSection from "@/components/home-page/proyect-section";

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.mission-section": MissionSection,
  "layout.proyect-section": ProyectSection,
  "layout.get-involved-section": GetInvolvedSection,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function blockRenderer(block: any) {
  const Component =
    blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block as never} /> : null;
}

export default async function HomePage() {
  const { ok, data } = await getHomeDataAction();

  if (!ok) {
    return <div>Reload Page</div>;
  }

  return <main className="flex-grow">{data?.map(blockRenderer)}</main>;
}

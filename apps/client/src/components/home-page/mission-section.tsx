import { MissionSectionType } from "@/lib/zod-schemas/home.schema";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Icon from "../DynamicIcon";
import Image from "next/image";
import { icons } from "lucide-react";

interface MissionSectionProps {
  data: MissionSectionType;
}

export default function MissionSection({
  data,
}: Readonly<MissionSectionProps>) {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4 text-pretty">
        <h2 className="text-3xl font-bold text-center mb-12">{data.title}</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {data.missions.map((mission) => (
            <Card className="flex flex-col h-full" key={mission.id}>
              <CardHeader>
                <div className="mb-2">
                  <Icon
                    name={mission.icon as keyof typeof icons}
                    className="h-8 w-8 text-primary mb-2"
                  />
                </div>
                <CardTitle className="text-xl">{mission.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4">{mission.description}</p>
              </CardContent>
              <div className="px-6 pb-6">
                <Image
                  src={mission.image.url}
                  alt={data.title}
                  width={300}
                  height={250}
                  className="rounded-md shadow-md object-cover w-full h-[325px] lg:h-[250px]"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

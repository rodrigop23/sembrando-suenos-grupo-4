import { ProyectSectionType } from "@/lib/zod-schemas/home.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

interface ProyectSectionProps {
  data: ProyectSectionType;
}

export default function ProyectSection({ data }: ProyectSectionProps) {
  return (
    <section id="projects" className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-pretty">
        <h2 className="text-3xl font-bold text-center mb-12">{data.title}</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {data.proyects.map((proyect) => (
            <Card key={proyect.id}>
              <CardHeader>
                <CardTitle className="text-xl">{proyect.title}</CardTitle>
                <CardDescription className="font-medium">
                  {proyect.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Image
                  src={proyect.image.url}
                  alt={data.title}
                  width={400}
                  height={300}
                  className="rounded-md shadow-md object-cover w-full h-[425px] lg:h-[400px]"
                />
                <p>{proyect.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

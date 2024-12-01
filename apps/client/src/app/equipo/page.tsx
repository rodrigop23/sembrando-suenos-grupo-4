import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { getTeamDataAction } from "@/actions/team/action";
import Link from "next/link";

export default async function TeamPage() {
  const { data } = await getTeamDataAction();

  if (!data) {
    return <div>Error al cargar los datos del equipo</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-pretty">
      <h1 className="text-4xl font-bold text-start mb-8">{data.title}</h1>
      <p className="text-xl text-start text-muted-foreground mb-12">
        {data.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.teamMember.map((member, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
            <div className="relative h-64 w-full">
              <Image
                src={member.image.url}
                alt={member.name}
                fill
                sizes="100%"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <CardContent className="p-6 flex-grow flex flex-col">
              <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
              <Badge variant="secondary" className="mb-4 w-fit">
                {member.job}
              </Badge>
              <p className="text-muted-foreground mb-4 flex-grow">
                {member.description}
              </p>
              <div className="flex space-x-4">
                {member.socialLink.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link.icon === "Twitter" && <Twitter className="h-5 w-5" />}
                    {link.icon === "Facebook" && (
                      <Facebook className="h-5 w-5" />
                    )}
                    {link.icon === "Linkedin" && (
                      <Linkedin className="h-5 w-5" />
                    )}
                    {link.icon === "Mail" && <Mail className="h-5 w-5" />}
                    <span className="sr-only">
                      {link.icon} de {member.name}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

// Datos de ejemplo para los miembros del equipo
const teamMembers = [
  {
    name: "Ana García",
    role: "Directora Ejecutiva",
    image: "/placeholder.svg",
    bio: "Ana lidera nuestra organización con pasión y visión estratégica. Con más de 10 años de experiencia en el sector sin fines de lucro, ella guía nuestros esfuerzos para crear un impacto positivo en la comunidad.",
    socialMedia: {
      twitter: "https://twitter.com/anagarcia",
      linkedin: "https://linkedin.com/in/anagarcia",
      email: "ana@jovenesporelcambio.org",
    },
  },
  {
    name: "Carlos Rodríguez",
    role: "Coordinador de Proyectos",
    image: "/placeholder.svg",
    bio: "Carlos es el motor detrás de nuestros proyectos exitosos. Su habilidad para gestionar múltiples iniciativas y su enfoque en resultados medibles han sido fundamentales para nuestro crecimiento.",
    socialMedia: {
      twitter: "https://twitter.com/carlosrodriguez",
      linkedin: "https://linkedin.com/in/carlosrodriguez",
      email: "carlos@jovenesporelcambio.org",
    },
  },
  {
    name: "Laura Martínez",
    role: "Responsable de Voluntariado",
    image: "/placeholder.svg",
    bio: "Laura tiene un don para inspirar y coordinar a nuestros valiosos voluntarios. Su energía contagiosa y su dedicación han fortalecido nuestra red de apoyo comunitario.",
    socialMedia: {
      facebook: "https://facebook.com/lauramartinez",
      linkedin: "https://linkedin.com/in/lauramartinez",
      email: "laura@jovenesporelcambio.org",
    },
  },
  {
    name: "Miguel Sánchez",
    role: "Especialista en Comunicación",
    image: "/placeholder.svg",
    bio: "Miguel es la voz de nuestra organización. Su creatividad y habilidades en redes sociales han aumentado significativamente nuestra visibilidad y engagement con la comunidad.",
    socialMedia: {
      twitter: "https://twitter.com/miguelsanchez",
      facebook: "https://facebook.com/miguelsanchez",
      email: "miguel@jovenesporelcambio.org",
    },
  },
  {
    name: "Elena Gómez",
    role: "Coordinadora de Educación",
    image: "/placeholder.svg",
    bio: "Elena lidera nuestros programas educativos con innovación y empatía. Su experiencia en pedagogía ha sido clave para desarrollar currículos que realmente impactan en la vida de los jóvenes.",
    socialMedia: {
      linkedin: "https://linkedin.com/in/elenagomez",
      twitter: "https://twitter.com/elenagomez",
      email: "elena@jovenesporelcambio.org",
    },
  },
  {
    name: "Javier López",
    role: "Gestor de Alianzas",
    image: "/placeholder.svg",
    bio: "Javier es experto en crear y mantener relaciones estratégicas. Su habilidad para establecer colaboraciones ha ampliado significativamente el alcance y recursos de nuestra organización.",
    socialMedia: {
      linkedin: "https://linkedin.com/in/javierlopez",
      email: "javier@jovenesporelcambio.org",
    },
  },
];

export default async function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-pretty">
      <h1 className="text-4xl font-bold text-start mb-8">Nuestro Equipo</h1>
      <p className="text-xl text-start text-muted-foreground mb-12">
        Conoce a las personas apasionadas que trabajan incansablemente para
        hacer realidad nuestra misión de empoderar a los jóvenes y crear un
        cambio positivo en nuestra comunidad.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
            <div className="relative h-64 w-full">
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <CardContent className="p-6 flex-grow flex flex-col">
              <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
              <Badge variant="secondary" className="mb-4 w-fit">
                {member.role}
              </Badge>
              <p className="text-muted-foreground mb-4 flex-grow">
                {member.bio}
              </p>
              <div className="flex space-x-4">
                {member.socialMedia.twitter && (
                  <a
                    href={member.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter de {member.name}</span>
                  </a>
                )}
                {member.socialMedia.facebook && (
                  <a
                    href={member.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook de {member.name}</span>
                  </a>
                )}
                {member.socialMedia.linkedin && (
                  <a
                    href={member.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn de {member.name}</span>
                  </a>
                )}
                {member.socialMedia.email && (
                  <a
                    href={`mailto:${member.socialMedia.email}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email de {member.name}</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

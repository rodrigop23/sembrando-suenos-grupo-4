"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, ChevronRight, Heart, Users } from "lucide-react";
// import { getHomeData } from "@/actions/home/action";
import Image from "next/image";
// import Link from "next/link";

export default function Component() {
  // const data = await getHomeData();

  return (
    <main className="flex-grow">
      <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-2">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Impulsando el Cambio Positivo
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Somos una Organización Juvenil dedicada a generar participación
              social y buenas prácticas para promover el bienestar y el
              desarrollo de las personas.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Únete a Nosotros <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg"
              alt="Jóvenes voluntarios en acción"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestra Misión
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-2">
                  <Heart className="h-8 w-8 text-primary mb-2" />
                </div>
                <CardTitle>Prevención de Enfermedades</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4">
                  Desarrollamos campañas de prevención para promover la salud y
                  el bienestar en nuestra comunidad.
                </p>
              </CardContent>
              <div className="px-6 pb-6">
                <Image
                  src="/placeholder.svg"
                  alt="Imagen representativa de la misión"
                  width={300}
                  height={150}
                  className="w-full h-auto rounded-md"
                />
              </div>
            </Card>
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-2">
                  <Users className="h-8 w-8 text-primary mb-2" />
                </div>
                <CardTitle>Labor Social</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4">
                  Realizamos intervenciones de labor social para apoyar a los
                  más necesitados y fomentar la solidaridad.
                </p>
              </CardContent>
              <div className="px-6 pb-6">
                <Image
                  src="/placeholder.svg"
                  alt="Imagen representativa de la misión"
                  width={300}
                  height={150}
                  className="w-full h-auto rounded-md"
                />
              </div>
            </Card>
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-2">
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                </div>
                <CardTitle>Educación de Calidad</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4">
                  Ofrecemos sesiones educativas para promover el desarrollo
                  personal y profesional de los jóvenes.
                </p>
              </CardContent>
              <div className="px-6 pb-6">
                <Image
                  src="/placeholder.svg"
                  alt="Imagen representativa de la misión"
                  width={300}
                  height={150}
                  className="w-full h-auto rounded-md"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Proyectos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Campaña de Salud Mental</CardTitle>
                <CardDescription>Concientización y apoyo</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg"
                  alt="Jóvenes participando en una charla sobre salud mental"
                  width={400}
                  height={200}
                  className="w-full h-auto rounded-md mb-4"
                />
                <p>
                  Organizamos talleres y charlas para promover la importancia de
                  la salud mental entre los jóvenes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Programa de Mentorías</CardTitle>
                <CardDescription>Guiando el futuro</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg"
                  alt="Mentor y estudiante trabajando juntos"
                  width={400}
                  height={200}
                  className="w-full h-auto rounded-md mb-4"
                />
                <p>
                  Conectamos a estudiantes con profesionales para brindar
                  orientación y apoyo en su desarrollo académico y profesional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            ¿Listo para hacer la diferencia?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a nuestra misión de crear un impacto positivo en la sociedad.
            Juntos podemos lograr grandes cambios.
          </p>
          <div className="flex justify-center gap-4 flex-col md:flex-row">
            <Button size="lg">Hazte Voluntario</Button>
            <Button size="lg" variant="outline">
              Haz una Donación
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

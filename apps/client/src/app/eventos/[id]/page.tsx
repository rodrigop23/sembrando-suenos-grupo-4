"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocialShareDialog } from "@/components/social-share-dialog";

// Esta función simularía la obtención de datos de un evento específico
const getEventDetails = (id: number) => {
  // En una aplicación real, aquí se haría una llamada a una API
  return {
    id: id,
    title: "Limpieza de Playa",
    date: "2024-07-15",
    time: "09:00",
    location: "Playa del Sol",
    participants: 30,
    maxParticipants: 50,
    image: "/placeholder.svg?height=400&width=800",
    description:
      "Únete a nosotros para limpiar la playa y proteger nuestro ecosistema marino. Juntos podemos hacer la diferencia. Esta actividad es parte de nuestro compromiso continuo con el medio ambiente y la preservación de nuestras costas.",
    longDescription:
      "Durante esta jornada de limpieza, trabajaremos en equipo para recoger basura, clasificar materiales reciclables y aprender sobre la importancia de mantener nuestras playas limpias. Esta actividad no solo beneficia al medio ambiente, sino que también crea conciencia sobre la contaminación marina y fomenta un sentido de comunidad entre los participantes. ¡Ven y sé parte del cambio!",
    requirements: [
      "Llevar guantes de trabajo",
      "Usar protector solar",
      "Traer una botella de agua reutilizable",
      "Vestir ropa cómoda y apropiada para la playa",
    ],
    schedule: [
      { time: "08:30", activity: "Registro de participantes" },
      { time: "09:00", activity: "Bienvenida y briefing de seguridad" },
      { time: "09:30", activity: "Inicio de la limpieza" },
      { time: "11:30", activity: "Descanso y refrigerio" },
      { time: "12:00", activity: "Continuación de la limpieza" },
      {
        time: "13:30",
        activity: "Finalización y recuento de residuos recolectados",
      },
      { time: "14:00", activity: "Cierre del evento y agradecimientos" },
    ],
    organizer: {
      name: "Eco Amigos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  };
};

export default function EventDetail({ id = 1 }: { id?: number }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const event = getEventDetails(id);

  const handleRegister = () => {
    setIsRegistered(true);
    // Aquí se implementaría la lógica para registrar al usuario en el evento
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link
        href="/eventos"
        className="inline-flex items-center text-primary hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a eventos
      </Link>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative w-full h-64 md:h-96 mb-6">
            <Image
              src={event.image}
              alt={event.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg shadow-lg"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <Badge variant="secondary" className="text-lg py-1 px-3">
              <Calendar className="h-5 w-5 mr-2" />
              {event.date}
            </Badge>
            <Badge variant="secondary" className="text-lg py-1 px-3">
              <Clock className="h-5 w-5 mr-2" />
              {event.time}
            </Badge>
            <Badge variant="secondary" className="text-lg py-1 px-3">
              <MapPin className="h-5 w-5 mr-2" />
              {event.location}
            </Badge>
          </div>

          <Tabs defaultValue="details" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="requirements">Requisitos</TabsTrigger>
              <TabsTrigger value="schedule">Cronograma</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <h3 className="text-xl font-semibold mb-2">
                Descripción del Evento
              </h3>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <p className="text-muted-foreground">{event.longDescription}</p>
            </TabsContent>
            <TabsContent value="requirements" className="mt-4">
              <h3 className="text-xl font-semibold mb-2">
                Requisitos para Participar
              </h3>
              <ul className="list-none list-inside text-muted-foreground">
                {event.requirements.map((req, index) => (
                  <li key={index} className="mb-2">
                    <CheckCircle className="inline-block h-5 w-5 mr-2 text-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="schedule" className="mt-4">
              <h3 className="text-xl font-semibold mb-2">
                Cronograma del Evento
              </h3>
              <ul className="space-y-4">
                {event.schedule.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Badge variant="outline" className="mr-3 mt-1">
                      {item.time}
                    </Badge>
                    <span className="text-muted-foreground">
                      {item.activity}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>EA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Organizado por</p>
                  <p className="text-sm text-muted-foreground">
                    {event.organizer.name}
                  </p>
                </div>
              </div>
              <Progress
                value={(event.participants / event.maxParticipants) * 100}
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground mb-4">
                {event.participants} de {event.maxParticipants} participantes
              </p>
              <Button
                className="w-full mb-4"
                onClick={handleRegister}
                disabled={isRegistered}
              >
                {isRegistered
                  ? "¡Estás registrado!"
                  : "Registrarse para el evento"}
              </Button>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Comparte este evento
                </span>
                <SocialShareDialog />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">
                Ubicación del evento
              </h3>
              <div className="relative w-full h-48 mb-2">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Mapa de ubicación del evento"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
              </div>
              <p className="text-sm text-muted-foreground">{event.location}</p>
              <Button variant="outline" className="w-full mt-4">
                Ver en Google Maps
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

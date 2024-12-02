import { EventDetailType } from "@/lib/zod-schemas/event.schema";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { SocialShareDialog } from "../social-share-dialog";

interface EventDetailsProps {
  data: EventDetailType;
}

export default function EventDetail({ data }: Readonly<EventDetailsProps>) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link
        href="/eventos"
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "mb-6"
        )}
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Volver a eventos
      </Link>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative w-full h-64 md:h-96 mb-6">
            <Image
              src={data.image.url}
              alt={data.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg shadow-lg"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <Badge variant="secondary" className="text-lg py-1 px-3">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {data.date}
            </Badge>
            <Badge variant="secondary" className="text-lg py-1 px-3">
              <ClockIcon className="h-5 w-5 mr-2" />
              {data.time}
            </Badge>
            <Badge variant="secondary" className="text-lg py-1 px-3">
              <MapPinIcon className="h-5 w-5 mr-2" />
              {data.location}
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
              <p className="text-muted-foreground mb-4">{data.description}</p>
              <p className="text-muted-foreground">{data.details}</p>
            </TabsContent>
            <TabsContent value="requirements" className="mt-4">
              <h3 className="text-xl font-semibold mb-2">
                Requisitos para Participar
              </h3>
              <ul className="list-none list-inside text-muted-foreground">
                {data.requirements.map((req) => (
                  <li key={req.id} className="mb-2">
                    <CheckCircleIcon className="inline-block h-5 w-5 mr-2 text-primary" />
                    {req.description}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="schedule" className="mt-4">
              <h3 className="text-xl font-semibold mb-2">
                Cronograma del Evento
              </h3>
              <ul className="space-y-4">
                {data.schedule.map((item) => (
                  <li key={item.id} className="flex items-start">
                    <Badge variant="outline" className="mr-3 mt-1">
                      {item.time}
                    </Badge>
                    <span className="text-muted-foreground">
                      {item.description}
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
                    {data.organizer}
                  </p>
                </div>
              </div>
              <Progress
                value={(10 / data.numberOfParticipants) * 100}
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground mb-4">
                10 de {data.numberOfParticipants} participantes
              </p>
              <Button className="w-full mb-4">
                Registrarse para el evento
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
                  src="/google-maps.png"
                  alt="Mapa de ubicación del evento"
                  fill
                  sizes="100%"
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
              </div>
              <p className="text-sm text-muted-foreground">{data.location}</p>

              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${data.location}`}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "w-full mt-4"
                )}
                target="_blank"
              >
                Ver en Google Maps
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

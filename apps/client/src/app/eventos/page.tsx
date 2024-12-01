"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

// Datos de ejemplo para los eventos
const events = [
  {
    id: 1,
    title: "Limpieza de Playa",
    date: "2024-07-15",
    time: "09:00",
    location: "Playa del Sol",
    participants: 30,
    maxParticipants: 50,
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Únete a nosotros para limpiar la playa y proteger nuestro ecosistema marino.",
  },
  {
    id: 2,
    title: "Taller de Reciclaje Creativo",
    date: "2024-07-22",
    time: "15:00",
    location: "Centro Comunitario",
    participants: 20,
    maxParticipants: 30,
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Aprende a crear arte y objetos útiles con materiales reciclados.",
  },
  {
    id: 3,
    title: "Maratón Solidario",
    date: "2024-08-05",
    time: "07:00",
    location: "Parque Central",
    participants: 100,
    maxParticipants: 500,
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Corre por una buena causa. Los fondos recaudados apoyarán programas educativos.",
  },
  {
    id: 4,
    title: "Plantación de Árboles",
    date: "2024-08-12",
    time: "10:00",
    location: "Bosque Municipal",
    participants: 40,
    maxParticipants: 100,
    image: "/placeholder.svg?height=200&width=300",
    description: "Ayuda a reforestar nuestra ciudad plantando árboles nativos.",
  },
  {
    id: 5,
    title: "Feria de Emprendimiento Social",
    date: "2024-08-19",
    time: "11:00",
    location: "Plaza Mayor",
    participants: 50,
    maxParticipants: 200,
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Descubre y apoya proyectos sociales innovadores de jóvenes emprendedores.",
  },
  {
    id: 6,
    title: "Concierto Benéfico",
    date: "2024-08-26",
    time: "19:00",
    location: "Auditorio Municipal",
    participants: 200,
    maxParticipants: 1000,
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Disfruta de música en vivo mientras apoyas programas de educación musical.",
  },
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "all" ||
        (filter === "thisMonth" &&
          new Date(event.date).getMonth() === new Date().getMonth()))
    );
  });

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const pageCount = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Próximos Eventos</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          placeholder="Buscar eventos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="thisMonth">Este mes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentEvents.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <div className="relative w-full h-48">
              <Image
                src={event.image}
                alt={event.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">
                {event.description}
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  <span>
                    {event.participants}/{event.maxParticipants}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Link href={`/eventos/${event.id}`}>Ver Detalles</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          {[...Array(pageCount)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              className={
                currentPage === pageCount
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

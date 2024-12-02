"use client";

import { EventType } from "@/lib/zod-schemas/event.schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface EventsProps {
  event: EventType;
}

export default function Events({ event }: EventsProps) {
  const router = useRouter();

  return (
    <Card key={event.id} className="flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={event.image.url}
          alt={event.title}
          fill
          sizes="100%"
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
            <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-2 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <UsersIcon className="h-4 w-4 mr-2 text-primary" />
            <span>
              {event.numberOfParticipants}
              {/* {event.participants}/{event.maxParticipants} */}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => router.push(`eventos/${event.documentId}`)}
        >
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
}

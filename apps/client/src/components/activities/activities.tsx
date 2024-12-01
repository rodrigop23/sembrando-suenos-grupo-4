"use client";

import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { ActivityType } from "@/lib/zod-schemas/activity.schema";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

interface ActivitesProps {
  activity: ActivityType;
}

export default function Activities({ activity }: ActivitesProps) {
  const router = useRouter();

  return (
    <Card key={activity.id} className="flex flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={activity.image.url}
          alt={activity.title}
          sizes="100%"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <CardHeader>
        <CardTitle>{activity.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {activity.descripcion}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" /> {activity.date}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4" /> {activity.time}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" /> {activity.location}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" /> {activity.numberOfParticipants}{" "}
          participantes
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => router.push(`actividades/${activity.documentId}`)}
        >
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
}

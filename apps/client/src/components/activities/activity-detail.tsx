"use client";

import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Heart,
  CreditCard,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActivityDetailType } from "@/lib/zod-schemas/activity.schema";
import { SocialShareDialog } from "../social-share-dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ActivityDetailsProps {
  data: ActivityDetailType;
}

export default function ActivityDetail({
  data: activity,
}: Readonly<ActivityDetailsProps>) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/actividades"
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "mb-6"
        )}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a actividades
      </Link>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <div className="relative h-64 md:h-96">
            <Image
              src={activity.image.url}
              alt={activity.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              {activity.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{activity.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{activity.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{activity.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{activity.numberOfParticipants} participantes</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground">{activity.descripcion}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Detalles adicionales
              </h3>
              <p className="text-muted-foreground">{activity.details}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Requisitos</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {activity.requirements.map((req) => (
                  <li key={req.id}>{req.description}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Cronograma</h3>
              <ul className="space-y-2">
                {activity.schedule.map((item) => (
                  <li key={item.id} className="flex items-start">
                    <span className="font-semibold mr-2">{item.time}</span>
                    <span className="text-muted-foreground">
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {activity.organizer[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Organizado por</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.organizer}
                  </p>
                </div>
              </div>
              <Button className="w-full mb-4">Participar</Button>
              <div className="flex justify-between">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <SocialShareDialog />
                <Button variant="outline" size="icon">
                  <CreditCard className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

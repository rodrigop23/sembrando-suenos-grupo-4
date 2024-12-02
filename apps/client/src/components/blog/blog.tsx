import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { CalendarIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { BlogType } from "@/lib/zod-schemas/blog.schema";

interface Props {
  data: BlogType;
}

export default function Blog({ data }: Props) {
  return (
    <Card key={data.id} className="flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={data.image.url}
          alt={data.title}
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
          className="rounded-t-lg"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{data.category}</Badge>
          <span className="text-sm text-muted-foreground">
            {data.readTime} de lectura
          </span>
        </div>
        <CardTitle className="text-2xl mb-2">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{data.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <UserIcon className="h-4 w-4 mr-1" />
          {data.author}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4 mr-1" />
          {data.date}
        </div>
      </CardFooter>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/data/${data.id}`}>Leer más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

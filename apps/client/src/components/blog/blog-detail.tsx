"use client";

import { ArrowLeftIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { BlogDetailType } from "@/lib/zod-schemas/blog.schema";
import { cn } from "@/lib/utils";
import { SocialShareDialog } from "../social-share-dialog";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Typography } from "../typography";

interface Props {
  data: BlogDetailType;
}

export default function BlogDetail({ data: blog }: Props) {
  console.log(blog.content);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "mb-6"
        )}
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Volver a blog
      </Link>

      <article>
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">
            {blog.category}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="" alt={blog.author} />
                <AvatarFallback>{blog.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{blog.author}</p>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
            <span>{blog.readTime} de lectura</span>
          </div>
        </header>

        <div className="relative w-full h-96 mb-8">
          <Image
            src={blog.image.url}
            alt={blog.title}
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>

        <div className="prose max-w-none">
          <BlocksRenderer
            content={blog.content}
            blocks={{
              // You can use the default components to set class names...
              paragraph: ({ children }) => (
                <p className="text-neutral900">{children}</p>
              ),
              // ...or point to a design system
              heading: ({ children, level }) => {
                switch (level) {
                  case 1:
                    return <Typography variant="h1">{children}</Typography>;
                  case 2:
                    return <Typography variant="h2">{children}</Typography>;
                  case 3:
                    return <Typography variant="h3">{children}</Typography>;
                  default:
                    return <Typography variant="h1">{children}</Typography>;
                }
              },

              // For links, you may want to use the component from your router or framework
              link: ({ children, url }) => <Link href={url}>{children}</Link>,
            }}
            modifiers={{
              bold: ({ children }) => <strong>{children}</strong>,
              italic: ({ children }) => (
                <span className="italic">{children}</span>
              ),
            }}
          />
        </div>

        <footer className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Sobre el autor</h2>
          <div className="flex items-center">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src="" alt={blog.author} />
              <AvatarFallback>{blog.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{blog.author}</h3>
              <p className="text-muted-foreground">{blog.aboutAuthor}</p>
            </div>
          </div>
        </footer>
      </article>

      <div className="mt-8 flex justify-between items-center">
        <Button variant="outline" asChild>
          <Link href="/blog">Volver al blog</Link>
        </Button>

        <SocialShareDialog />
      </div>
    </div>
  );
}

import { type HeroSectionType } from "@/lib/zod-schemas/home.schema";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  data: HeroSectionType;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-2">
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 text-balance">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{data.title}</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{data.subtitle}</p>
          <Link
            href={data.ctaButton?.url || "/"}
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "bg-white text-primary hover:bg-gray-100"
            )}
            target={data.ctaButton?.isExternal ? "_blank" : "_self"}
          >
            {data.ctaButton?.text} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="md:w-3/4 lg:w-1/2 w-full">
          <div className="h-64 lg:h-auto">
            <Image
              src={data.image.url}
              alt={data.image.alternativeText}
              layout="responsive"
              width={800}
              height={533}
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { GetInvolvedSectionType } from "@/lib/zod-schemas/home.schema";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

interface GetInvolvedSectionProps {
  data: GetInvolvedSectionType;
}

export default function GetInvolvedSection({ data }: GetInvolvedSectionProps) {
  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4 text-center text-pretty">
        <h2 className="text-3xl font-bold mb-8">{data.title}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">{data.description}</p>
        <div className="flex justify-center gap-4 flex-col md:flex-row">
          <Link
            href={data.volunteerButton?.url || "/"}
            className={buttonVariants({
              size: "lg",
            })}
            target={data.volunteerButton?.isExternal ? "_blank" : "_self"}
          >
            {data.volunteerButton?.text}
          </Link>
          <Link
            href={data.donationButton?.url || "/"}
            className={buttonVariants({
              size: "lg",
              variant: "outline",
            })}
            target={data.donationButton?.isExternal ? "_blank" : "_self"}
          >
            {data.donationButton?.text}
          </Link>
        </div>
      </div>
    </section>
  );
}

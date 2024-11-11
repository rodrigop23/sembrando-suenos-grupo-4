import Image from "next/image";
import logo from "@/assets/logo.png";
import { Icons } from "../icons";
import { MailIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="Sembrando Sueños Logo"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <h2 className="text-2xl font-bold text-primary">
                Sembrando Sueños
              </h2>
            </div>
            <p className="text-muted-foreground">
              Buscamos promover la EDUCACIÓN y SALUD en el Perú mediante
              proyectos de desarrollo social
            </p>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Síguenos</h3>
            <Separator className="w-16 bg-primary/20" />
            <div className="space-y-3">
              <Link
                href="#"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icons.facebook className="h-5 w-5 flex-shrink-0" />
                <span className="break-all">Sembrando Sueños</span>
              </Link>
              <Link
                href="https://www.instagram.com/sembrandosuenos.peru"
                target="_blank"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icons.instagram className="h-5 w-5 flex-shrink-0" />
                <span className="break-all">sembrandosuenos.peru</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icons.tiktok className="h-5 w-5 flex-shrink-0" />
                <span className="break-all">sembrandosuenos.peru</span>
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Contáctanos</h3>
            <Separator className="w-16 bg-primary/20" />
            <div className="space-y-3">
              <Link
                href="tel:+51945123059"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icons.whatsapp className="h-5 w-5 flex-shrink-0" />
                <span>+51 945 123 059</span>
              </Link>
              <Link
                href="mailto:sembrandosuenos.peru@gmail.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <MailIcon className="h-5 w-5 flex-shrink-0" />
                <span className="break-all">
                  sembrandosuenos.peru@gmail.com
                </span>
              </Link>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Acerca de</h3>
            <Separator className="w-16 bg-primary/20" />
            <div className="flex flex-col space-y-3">
              <Link
                href="equipo"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Equipo
              </Link>
              <Link
                href="actividades"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Actividades
              </Link>
              <Link
                href="eventos"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Eventos
              </Link>
              <Link
                href="blog"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-primary/10" />
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sembrando Sueños. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}

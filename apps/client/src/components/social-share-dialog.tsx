"use client";

import { Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FacebookShare, TwitterShare, LinkedinShare } from "react-share-kit";
import ButtonClipboard from "./ui/button-clipboard";
import { usePathname } from "next/navigation";

export function SocialShareDialog() {
  const path = usePathname();

  const completeUrl = `${process.env.NEXT_PUBLIC_HOST_URL}${path}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartir enlace</DialogTitle>
          <DialogDescription>
            Cualquiera que tenga este enlace podrá verlo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={completeUrl} readOnly />
          </div>
          <ButtonClipboard text={completeUrl} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold">Compartir en Redes Sociales</div>
          <div className="flex gap-6 items-center">
            <FacebookShare
              url={completeUrl}
              quote={
                "react-share-kit - social share buttons for next & react apps."
              }
              hashtag={"#SembradoSueñosPerú #SembrandoSueños"}
              blankTarget
              borderRadius={10}
            />
            <TwitterShare
              url={completeUrl}
              title="Mira este post!"
              blankTarget
              borderRadius={10}
            />
            <LinkedinShare url={completeUrl} blankTarget borderRadius={10} />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

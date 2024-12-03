"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserType } from "@/lib/zod-schemas/user-schema";
import { useForm } from "react-hook-form";
import { updateUserAction } from "@/actions/user/action";

interface Props {
  id: number;
  data: UserType;
}

export default function UserProfile({ id, data }: Props) {
  const { toast } = useToast();

  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...data,
    },
  });

  const onSubmit = async (data: UserType) => {
    await updateUserAction(data, id.toString());

    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados exitosamente.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Tu Perfil</CardTitle>
          <CardDescription>
            Actualiza tu información personal y preferencias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de Usuario</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" autoComplete="off" />
                      </FormControl>
                      <FormDescription>Opcional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" autoComplete="off" />
                      </FormControl>
                      <FormDescription>Opcional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biografía</FormLabel>
                      <FormControl>
                        <Textarea {...field} autoComplete="off" />
                      </FormControl>
                      <FormDescription>Opcional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full text-end ">
                <Button type="submit" className="w-full sm:w-fit">
                  Guardar cambios
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

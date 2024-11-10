"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Icons } from "../icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, LoginUserType } from "@/lib/zod-schemas/user-schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function SignInForm() {
  const form = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginUserType) => {
    console.log(data);
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tus datos para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Contraseña</FormLabel>
                      <Link
                        href="forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <FormControl>
                      <Input {...field} type="password" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    O ingresa con
                  </span>
                </div>
              </div>

              <Button variant="outline" type="button">
                <Icons.google />
                Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              No tienes una cuenta?{" "}
              <Link href="sign-up" className="underline">
                Regístrate
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

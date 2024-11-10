"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "../icons";

import {
  registerUserSchema,
  RegisterUserType,
} from "@/lib/zod-schemas/user-schema";
import { registerUserAction } from "@/actions/user/action";

export default function SignUpForm() {
  const [genericError, setGenericError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<RegisterUserType>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: RegisterUserType) => {
    try {
      const result = await registerUserAction(data);

      if (!result.ok) {
        return setGenericError(result.message);
      }

      router.push("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setGenericError(error.message);
    }
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl">Regístrate</CardTitle>
        <CardDescription>
          Regístrate para acceder a la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="grid gap-4" disabled={isSubmitting}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar la contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-[0.8rem] font-medium text-destructive">
                {genericError}
              </p>

              <Button type="submit" className="w-full">
                {isSubmitting && <Icons.spinner className="animate-spin" />}
                Registrarse
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    O regístrate con
                  </span>
                </div>
              </div>

              <Button variant="outline" type="button">
                <Icons.google />
                Google
              </Button>
            </fieldset>
            <div className="mt-4 text-center text-sm">
              Ya tienes una cuenta?{" "}
              <Link href="sign-in" className="underline">
                Inicia sesión
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

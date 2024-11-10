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
import { loginUserAction } from "@/actions/user/action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const [genericError, setGenericError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: LoginUserType) => {
    try {
      const result = await loginUserAction(data);

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
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tus datos para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="grid gap-4" disabled={isSubmitting}>
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

              {genericError && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {genericError}
                </p>
              )}

              <Button type="submit" className="w-full">
                {isSubmitting && <Icons.spinner className="animate-spin" />}
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
            </fieldset>
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

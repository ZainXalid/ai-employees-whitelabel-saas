"use client";

// import LoginButton from "./login-button";
import { useState } from "react";

import * as z from "zod";
import React from "react";
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Separator } from "@/components/ui/separator"

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoaderIcon } from "lucide-react"

const formSchema = z.object({
  email: z.string().min(5, {
    message: "Email is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

export default function LoginForm() {

  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.post("/api/authusers/login", values);
      // toast({
      //     description : "Success."
      // });

      router.refresh();
      router.push("/dashboard");
    }
    catch (e) {
      setIsLoading(false);

      toast({
        variant: "destructive",
        description: "Login Failed",
      });

      const error = e as AxiosError;

      // alert(error.message);
    }
  }



  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">

      <div className="p-10 rounded-xl bg-slate-100">


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full pb-10">
            <div className="space-y-2 w-full  text-center">

              <h3 className="text-lg text-black font-medium">
                Login
              </h3>
              <p className="text-sm text-gray-500">
                Enter you valid email address & password to login.
              </p>


              <Separator className="bg-primary/10" />
            </div>


            <div className="grid grid-cols-1 gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 text-black">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-white"
                        disabled={isLoading}
                        placeholder={"Enter your email address"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />

                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 text-black">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className=" text-white"
                        disabled={isLoading}
                        placeholder={"Enter your Password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />

                  </FormItem>
                )}
              />

            </div>


            <div className="w-full flex justify-center">
              <Button size="lg" className="text-white bg-black hover:text-black hover:border" disabled={isLoading}>
                Login
              </Button>
            </div>
            {isLoading ?

              <div className="w-full flex justify-center gap-2">
                <LoaderIcon className="animate-spin text-black" />
              </div>
              : <div className="w-full flex justify-center gap-2">

              </div>
            }


            <div className="w-full flex justify-center text-black hover:text-blue-400">
              <Link href={"/signup"}>
                Go to Sign Up
              </Link>
            </div>

          </form>
        </Form>

      </div>


    </div>
  )
}
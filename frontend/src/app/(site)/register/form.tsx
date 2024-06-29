"use client";

import { register as registerAPI } from "@/apis/user/auth";

import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SubmitButton from "@/components/site/common/submit-button";

export default function RegisterForm() {
  const router = useRouter();

  const formSchema = z.object({
    display_name: z.string(),
    username: z.string().min(2, "Username must be at least 2 characters."),
    email: z.string().email(),
    password: z
      .string()
      // password must be at least 8 characters
      .min(8, "Must be at least 8 characters.")
      // password must contain at least one number
      .regex(/^(?=.*[0-9])/, "Must contain at least one number.")
      // password must contain at least one special character
      .regex(
        /^(?=.*[!@#$%^&*])/,
        "Must contain at least one special character."
      )
      // password must contain at least one uppercase letter
      .regex(/^(?=.*[A-Z])/, "Must contain at least one uppercase letter.")
      // password must contain at least one lowercase letter
      .regex(/^(?=.*[a-z])/, "Must contain at least one lowercase letter."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => registerAPI(data),
    onSuccess: () => {
      toast.success("Registered successfully");
      toast.info("Please verify your email");
      router.replace("/login");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        const fields = Object.keys(data) as (keyof z.infer<
          typeof formSchema
        >)[];
        fields.forEach((field) => {
          return form.setError(field, { message: data[field] });
        });
        toast.error("Invalid inputs");
      } else {
        toast.error("Something went wrong");
        console.log(error);
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto"
      >
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  {...field}
                />
              </FormControl>
              <button
                tabIndex={-1}
                type="button"
                className="absolute bottom-2 right-2 outline-none"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOff /> : <Eye />}
              </button>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className="w-full" isLoading={isPending}>
          Register
        </SubmitButton>
      </form>
    </Form>
  );
}

"use client";

import { login as loginAPI } from "@/apis/user/auth";

import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useUserStore } from "@/stores/useUser";
import { useRouter } from "next/navigation";

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
import SubmitButton from "@/components/site/common/submit-button";

const formSchema = z.object({
  email: z.string().email().describe("Your Email"),
  password: z
    .string()
    // password must be at least 8 characters
    .min(8, "Must be at least 8 characters.")
    // password must contain at least one number
    .regex(/^(?=.*[0-9])/, "Must contain at least one number.")
    // password must contain at least one special character
    .regex(/^(?=.*[!@#$%^&*])/, "Must contain at least one special character.")
    // password must contain at least one uppercase letter
    .regex(/^(?=.*[A-Z])/, "Must contain at least one uppercase letter.")
    // password must contain at least one lowercase letter
    .regex(/^(?=.*[a-z])/, "Must contain at least one lowercase letter.")
    .describe("Your password"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const userStore = useUserStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => loginAPI(data),
    onSuccess: (data) => {
      console.log(data.data);
      userStore.login(data.data.access);
      toast.success("Logged in successfully");
      window.location.href = "/";
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        const fields = Object.keys(data) as (keyof FormData)[];
        fields.forEach((field) => {
          return form.setError(field, { message: data[field] });
        });
        toast.error(error.response?.data?.non_field_errors || "Invalid inputs");
      } else {
        toast.error("Something went wrong");
        console.log(error);
      }
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className="w-full" isLoading={isPending}>
          Login
        </SubmitButton>
      </form>
    </Form>
  );
}

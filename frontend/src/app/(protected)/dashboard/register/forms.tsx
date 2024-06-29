"use client";

import { registerAPI as donorRegisterAPI } from "@/apis/donor/register";
import { registerAPI as nonProfitRegisterAPI } from "@/apis/nonprofit/register";

import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useUserStore } from "@/stores/useUser";
import { useRouter } from "next/navigation";

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
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/site/submit-button";

export function DonorRegisterForm() {
  const formSchema = z.object({
    balance: z.string(),
  });

  type FormData = z.infer<typeof formSchema>;

  const router = useRouter();

  const { user, setUser } = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: donorRegisterAPI,
    onSuccess: () => {
      toast.success("Registration successful");
      if (user) {
        setUser({ ...user, role: "donor" });
      }
      router.push("/dashboard");
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 400) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Balance</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Balance"
                    {...field}
                    min={0}
                    max={100000000}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton isLoading={isPending} className="w-full">
          Register
        </SubmitButton>
      </form>
    </Form>
  );
}

export function NonProfitRegisterForm() {
  const formSchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  type FormData = z.infer<typeof formSchema>;

  const router = useRouter();

  const { user, setUser } = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: nonProfitRegisterAPI,
    onSuccess: () => {
      toast.success("Registration successful");
      if (user) {
        setUser({ ...user, role: "nonprofit" });
      }
      router.push("/dashboard");
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 400) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton className="w-full" isLoading={isPending}>
          Register
        </SubmitButton>
      </form>
    </Form>
  );
}

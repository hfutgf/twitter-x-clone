"use client";
import React, { useCallback, useState } from "react";
import Modal from "../ui/modal";
import useLoaginModal from "@/hooks/useLoginModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Button from "../ui/button";
import * as z from "zod";
import { loginSchema } from "@/lib/validation";
import useRegisterModal from "@/hooks/useRegisterModal";

export default function LoginModal() {
  const [data, setData] = useState({ email: "", password: "" });
  const loginModal = useLoaginModal();

  const registerModal = useRegisterModal();

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setData(values);
  }

  const { isSubmitting } = form.formState;

  const bodyConetent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          label="Sign in"
          type="submit"
          secondary
          fullWidth
          large
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mb-4 ">
      <p>
        First time using X?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          {" "}
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={bodyConetent}
      footer={footerContent}
      onClose={loginModal.onClose}
      isOpen={loginModal.isOpen}
    />
  );
}

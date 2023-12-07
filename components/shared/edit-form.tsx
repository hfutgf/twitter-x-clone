"use client";

import { userSchema } from "@/lib/validation";
import { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Button from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import useEditModal from "@/hooks/useEditModal";

interface Props {
  user: IUser;
}

const EditForm = ({ user }: Props) => {
  const router = useRouter();

  const editModal = useEditModal();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name || " ",
      username: user.username || " ",
      bio: user.bio || " ",
      location: user.location || " ",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    console.log(values);
    try {
      await axios.put(`/api/users/${user._id}`, values);
      router.refresh();
      editModal.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative -top-8 mx-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ filed }: any) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...filed} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ filed }: any) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...filed} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ filed }: any) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Location" {...filed} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ filed }: any) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Bio" {...filed} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>

      <Button
        type="submit"
        label="Save"
        secondary
        large
        fullWidth
        disabled={isSubmitting}
      />
    </Form>
  );
};

export default EditForm;

"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Bot, Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  WILLIAM_FAULKNER_PREAMBLE,
  WILLIAM_FAULKNER_SEED_CHAT,
} from "@/lib/placeholder-data";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  imageSource: z.string().min(1, {
    message: "Image is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
  preabmle: z.string().min(250, {
    message: "Preabmle cannot be less than 250 characters",
  }),
  seedChat: z.string().min(250, {
    message: "Seed Chat cannot be less than 250 characters",
  }),
});

interface BotCreateFormProps {
  currentBotData: Bot | null;
  categories: Category[];
}

export const BotCreateForm = ({
  currentBotData,
  categories,
}: BotCreateFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentBotData || {
      imageSource: "",
      name: "",
      description: "",
      categoryId: "",
      preabmle: "",
      seedChat: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mb-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            name="imageSource"
            render={({ field }) => (
              <FormItem className="self-center">
                <FormControl>
                  <SingleImageDropzone
                    width={300}
                    height={300}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="William Faulkner"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="William Faulkner"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a category"
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category: Category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="preabmle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preamble</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    rows={4}
                    placeholder={WILLIAM_FAULKNER_PREAMBLE}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seedChat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seed Chat</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    rows={8}
                    placeholder={WILLIAM_FAULKNER_SEED_CHAT}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="self-center">
            {currentBotData ? "Update the Bot" : "Create the Bot"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

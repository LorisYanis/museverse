"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/image-upload";

const formSchema = z.object({
  imageSource: z.string().min(1, { message: "Image is required" }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
  preamble: z.string().min(150, {
    message: "Preabmle cannot be less than 150 characters",
  }),
  seedChat: z.string().min(150, {
    message: "Seed Chat cannot be less than 150 characters",
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
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentBotData || {
      imageSource: "",
      name: "",
      description: "",
      categoryId: "",
      preamble: "",
      seedChat: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!currentBotData) {
        await axios.post("/api/bot", values);
        toast.success("Bot created!");
      }

      if (currentBotData) {
        await axios.patch(`/api/bot/${currentBotData.id}`, values);
        toast.success("Bot updated!");
      }
    } catch (error: any) {
      if (error.response.data) {
        toast.error(error.response.data);
        return null;
      }

      toast.error("Something went wrong");
      return null;
    }

    router.refresh();
    router.push("/app");
  };

  const onDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      event.preventDefault();

      if (!currentBotData) {
        return null;
      }

      if (currentBotData) {
        await axios.delete(`/api/bot/${currentBotData.id}`);
        toast.success("Bot deleted!");
      }
    } catch (error) {
      toast.error("Something went wrong");
      return null;
    }

    router.refresh();
    router.push("/app");
  };

  return (
    <div className="container my-36">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <FormField
            name="imageSource"
            render={({ field }) => (
              <FormItem className="self-center">
                <FormControl>
                  <ImageUpload
                    width={280}
                    height={280}
                    value={field.value}
                    botImageSource={currentBotData?.imageSource}
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
                    placeholder="Renowned American author and novelist"
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
            name="preamble"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preamble</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    rows={8}
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
          <div className="flex flex-row items-center justify-center gap-x-3 w-full">
            <Button type="submit" disabled={isLoading} className="self-center">
              {currentBotData ? "Update the Bot" : "Create the Bot"}
            </Button>
            {currentBotData && (
              <Button
                variant="outline"
                onClick={(event) => onDelete(event)}
                disabled={isLoading}
                className="self-center"
              >
                Delete the Bot
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

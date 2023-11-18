"use client";

import { ArrowUp } from "lucide-react";
import { ChangeEvent, FormEvent } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  botName: string;
  input: string;
  isLoading?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export const ChatInput = ({
  botName,
  input,
  isLoading,
  onSubmit,
  handleInputChange,
}: ChatInputProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="pb-5 flex flex-row gap-x-1 md:gap-x-2 px-3"
    >
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder={`Write to ${botName}`}
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="outlineOpacity"
        size="icon"
        className="group transition"
        disabled={isLoading || !input}
      >
        <ArrowUp className="h-5 w-5 transition text-muted-foreground group-hover:text-foreground" />
      </Button>
    </form>
  );
};

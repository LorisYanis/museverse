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
    <form onSubmit={onSubmit} className="pb-5 flex flex-row gap-2">
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder={`Write to ${botName}`}
      />
      <Button
        type="submit"
        variant="outlineOpacity"
        size="icon"
        className="group transition"
      >
        <ArrowUp className="h-5 w-5 transition text-muted-foreground group-hover:text-foreground" />
      </Button>
    </form>
  );
};

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  botName: string;
  isLoading?: boolean;
}

export const ChatInput = ({ botName }: ChatInputProps) => {
  return (
    <div className="pb-5 flex flex-row gap-2">
      <Input placeholder={`Write to ${botName}`} />
      <Button variant="outline" size="icon" className="group transition">
        <ArrowUp className="h-5 w-5 transition text-muted-foreground group-hover:text-foreground" />
      </Button>
    </div>
  );
};

"use client";

import dynamic from "next/dynamic";
import { ArrowUp, Mic, StopCircle } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  botName: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export const ChatInput = ({
  botName,
  input,
  setInput,
  isLoading,
  onSubmit,
  handleInputChange,
}: ChatInputProps) => {
  const ChatSTT = dynamic(
    () => import("@/components/chat/chat-STT").then((module) => module.ChatSTT),
    {
      ssr: false,
    },
  );

  const [isRecording, setIsRecording] = useState<boolean>(false);

  return (
    <form
      onSubmit={onSubmit}
      className="pb-5 flex flex-row space-x-1 md:space-x-2 px-3"
    >
      <div className="flex-1">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={`Write to ${botName}`}
          disabled={isLoading}
        />
      </div>
      <div className="relative w-10 h-10">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute -z-[1] top-0 right-0 transition text-muted-foreground hover:text-foreground"
          disabled={isLoading}
        >
          {isRecording ? (
            <StopCircle className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
        <ChatSTT
          setInput={setInput}
          isLoading={isLoading}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />
      </div>
      <div className="relative w-10 h-10">
        <Button
          type="submit"
          variant="outline"
          size="icon"
          className="group transition"
          disabled={isLoading || !input}
        >
          <ArrowUp className="h-5 w-5 transition text-muted-foreground group-hover:text-foreground" />
        </Button>
      </div>
    </form>
  );
};

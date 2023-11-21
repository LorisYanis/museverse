"use client";

import { uuid } from "uuidv4";
import { FormEvent, useState } from "react";
import { Bot, Message } from "@prisma/client";
import { useChat, useCompletion } from "ai/react";
import { useRouter } from "next/navigation";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatMessageProps } from "./chat-message";
import { Gradient } from "../gradient";

interface ChatProps {
  bot: Bot & { messages: Message[] };
}

export const Chat = ({ bot }: ChatProps) => {
  const router = useRouter();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: `/api/bot/chat/${bot.id}`,
    initialMessages: bot.messages,
  });

  return (
    <div className="max-w-3xl flex flex-col h-full m-auto">
      <ChatHeader botImageSource={bot.imageSource} botName={bot.name} />
      <ChatMessages isLoading={isLoading} bot={bot} messages={messages} />
      <ChatInput
        botName={bot.name}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

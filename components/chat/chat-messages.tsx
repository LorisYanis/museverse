"use client";

import { Bot, Message } from "@prisma/client";

import { ChatMessage, ChatMessageProps } from "./chat-message";
import { ElementRef, useEffect, useRef } from "react";

interface ChatMessagesProps {
  isLoading?: boolean;
  bot: Bot;
  messages: ChatMessageProps[] | null;
}

export const ChatMessages = ({
  isLoading,
  bot,
  messages,
}: ChatMessagesProps) => {
  const lastDivRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    lastDivRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-5 items-end justify-end flex-1 px-3 pb-8">
      {messages?.map((message) => (
        <ChatMessage
          role={message.role}
          content={message.content}
          imageSource={bot.imageSource}
          key={message.id}
        />
      ))}

      {isLoading && (
        <ChatMessage role="system" isLoading imageSource={bot.imageSource} />
      )}

      <div ref={lastDivRef} />
    </div>
  );
};

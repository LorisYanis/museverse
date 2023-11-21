"use client";

import { Bot } from "@prisma/client";
import { ElementRef, useEffect, useRef } from "react";
import { Message } from "ai/react";

import { ChatMessage, ChatMessageProps } from "@/components/chat/chat-message";

interface ChatMessagesProps {
  isLoading?: boolean;
  bot: Bot;
  messages: Message[] | null;
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
    <div className="flex flex-col gap-y-3 md:gap-y-5 items-end justify-end flex-1 px-3 pb-4 md:pb-8">
      {messages?.map((message) => (
        <ChatMessage
          role={message.role}
          content={message.content}
          imageSource={bot.imageSource}
          key={message.id}
        />
      ))}

      {/* {isLoading && (
        <ChatMessage role="system" isLoading imageSource={bot.imageSource} />
      )} */}

      <div ref={lastDivRef} />
    </div>
  );
};

"use client";

import { Bot } from "@prisma/client";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";

interface ChatProps {
  bot: Bot | null;
}

export const Chat = ({ bot }: ChatProps) => {
  if (!bot) {
    {
      /* To-Do: 404 page redirection */
    }
    return <div>Not Found</div>;
  }

  return (
    <div className="max-w-3xl flex flex-col h-full m-auto">
      <ChatHeader botImageSource={bot.imageSource} botName={bot.name} />
      <ChatMessages bot={bot} />
      <ChatInput botName={bot.name} />
    </div>
  );
};

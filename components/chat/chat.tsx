"use client";

import { uuid } from "uuidv4";
import { FormEvent, useState } from "react";
import { Bot, Message } from "@prisma/client";
import { useCompletion } from "ai/react";
import { useRouter } from "next/navigation";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatMessageProps } from "./chat-message";

interface ChatProps {
  bot: Bot & { messages: Message[] };
}

export const Chat = ({ bot }: ChatProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(bot.messages);

  const { isLoading, input, setInput, handleInputChange, handleSubmit } =
    useCompletion({
      api: `/api/bot/chat/${bot.id}`,
      onFinish(_prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
          id: `message_${uuid()}`,
        };

        setInput("");
        setMessages((currentMessages) => [...currentMessages, systemMessage]);

        router.refresh();
      },
    });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
      id: `message_${uuid()}`,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);

    handleSubmit(event);
  };

  return (
    <div className="max-w-3xl flex flex-col h-full m-auto">
      <ChatHeader botImageSource={bot.imageSource} botName={bot.name} />
      <ChatMessages isLoading={isLoading} bot={bot} messages={messages} />
      <ChatInput
        botName={bot.name}
        input={input}
        isLoading={isLoading}
        onSubmit={onSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

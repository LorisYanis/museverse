"use client";

import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/avatars/bot-avatar";
import { UserAvatar } from "@/components/avatars/user-avatar";

interface ChatMessageProps {
  role: "system" | "user";
  isLoading?: boolean;
  content?: string;
  imageSource?: string;
  id?: string;
}

export const ChatMessage = ({
  role,
  isLoading,
  content,
  imageSource,
  id,
}: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-row flex-start gap-x-2 w-full",
        role === "user" && "justify-end",
      )}
    >
      {role !== "user" && <BotAvatar imageSource={imageSource} />}

      <div className="rounded-lg p-3 bg-background border-[1px] border-muted max-w-sm md:max-w-lg text-xs md:text-sm">
        {content}
      </div>

      {role === "user" && <UserAvatar />}
    </div>
  );
};

"use client";

import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/avatars/bot-avatar";
import { UserAvatar } from "@/components/avatars/user-avatar";

export interface ChatMessageProps {
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

      <div
        className={cn(
          "rounded-lg break-words p-3 bg-background/50 backdrop-blur border-[1px] border-muted max-w-sm md:max-w-lg text-xs md:text-sm",
          role !== "user" && "mr-10",
          role === "user" && "ml-10",
        )}
      >
        {isLoading ? (
          <div className="chatLoader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          content
        )}
      </div>

      {role === "user" && <UserAvatar />}
    </div>
  );
};

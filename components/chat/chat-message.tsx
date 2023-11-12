"use client";

import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/avatars/bot-avatar";
import { UserAvatar } from "@/components/avatars/user-avatar";

interface ChatMessageProps {
  role: "system" | "user";
  isPreview?: string;
  isLoading?: string;
  content?: string;
  src?: string;
  id?: string;
}

export const ChatMessage = ({
  role,
  isLoading,
  content,
  src,
  id,
}: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-row flex-start gap-x-2 w-full",
        role === "user" && "justify-end",
      )}
    >
      {role !== "user" && <BotAvatar src={src} />}

      <div className="rounded-lg p-3 bg-primary-foreground border-[1px] border-muted max-w-lg text-sm">
        {content}
      </div>

      {role === "user" && <UserAvatar />}
    </div>
  );
};

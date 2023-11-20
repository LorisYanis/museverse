"use client";

import { ArrowUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  botImageSource: string;
  botName: string;
}

export const ChatHeader = ({ botImageSource, botName }: ChatHeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky z-50 top-0 bg-background/50 backdrop-blur flex flex-col gap-y-6 justify-center items-center p-6 md:px-10 mb-10 border-b border-input">
      <Button
        variant="outlineOpacity"
        className="gap-x-2"
        onClick={() => router.back()}
      >
        <ArrowUpLeft className="w-5 h-5" />
        <p className="text-sm font-medium">{botName}</p>
      </Button>
    </header>
  );
};

"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ChatHeaderProps {
  botImageSource: string;
  botName: string;
}

export const ChatHeader = ({ botImageSource, botName }: ChatHeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky z-50 top-0 bg-background/50 backdrop-blur flex flex-col gap-y-6 justify-center items-center p-6 md:px-10 mb-10 border-b border-input">
      <Button
        variant="outline"
        className="gap-x-2"
        onClick={() => router.back()}
      >
        <ArrowUpLeft className="w-5 h-5" />
        <p className="text-sm font-medium">{botName}</p>
      </Button>
    </header>
  );
};

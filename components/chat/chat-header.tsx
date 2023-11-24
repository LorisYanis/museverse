"use client";

import queryString from "query-string";
import { ArrowUpLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  botName: string;
}

export const ChatHeader = ({ botName }: ChatHeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onBack = () => {
    const query = {
      categoryId,
      botName: null,
    };

    const route = queryString.stringifyUrl(
      {
        url: "/app",
        query,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(route);
  };

  return (
    <header className="sticky z-50 top-0 bg-background/50 backdrop-blur flex flex-col gap-y-6 justify-center items-center p-6 md:px-10 mb-10 border-b border-input">
      <Button variant="outlineOpacity" className="gap-x-2" onClick={onBack}>
        <ArrowUpLeft className="w-5 h-5" />
        <p className="text-sm font-medium">{botName}</p>
      </Button>
    </header>
  );
};

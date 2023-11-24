"use client";

import Image from "next/image";
import Link from "next/link";
import { Bot } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface BotCardProps {
  bot: Bot;
}

export const BotCard = ({ bot }: BotCardProps) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  return (
    <Card className="flex flex-col max-w-[20rem] space-y-4 p-5 bg-background/50 backdrop-blur">
      <CardHeader className="p-0">
        <div className="relative w-full h-[16rem]">
          <Image
            src={bot.imageSource}
            fill
            className="rounded-lg object-cover"
            alt={bot.name}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 space-y-1">
        <h3 className="font-semibold">{bot.name}</h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          {bot.description}
        </p>
      </CardContent>
      <CardFooter className="p-0">
        <Button asChild>
          <Link
            href={
              categoryId
                ? `/chat/${bot.id}?categoryId=${categoryId}`
                : `/chat/${bot.id}`
            }
            className="text-sm font-medium text-center block w-full"
          >
            Enter Chat <ArrowUpRight className="ml-1 w-5 h-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

import Image from "next/image";
import Link from "next/link";
import { Bot } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface BotCardProps {
  bot: Bot;
}

export const BotCard = ({ bot }: BotCardProps) => {
  return (
    <Card className="max-w-[20rem] space-y-4 p-5">
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
      <CardContent className="p-0">
        <h3 className="font-semibold">{bot.name}</h3>
        <p className="text-muted-foreground">{bot.description}</p>
      </CardContent>
      <CardFooter className="p-0">
        <Button asChild>
          <Link
            href={`/chat/${bot.id}`}
            className="text-sm font-medium text-center block w-full"
          >
            Enter Chat <ArrowUpRight className="ml-1 w-5 h-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

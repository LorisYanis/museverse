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
    <Card>
      <CardHeader>
        <div className="relative w-full h-[12rem]">
          <Image
            src={bot.imageSource}
            fill
            className="rounded-lg object-cover"
            alt={bot.name}
          />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold">{bot.name}</h3>
        <p className="text-muted-foreground">{bot.description}</p>
      </CardContent>
      <CardFooter>
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

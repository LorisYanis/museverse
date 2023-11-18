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
<<<<<<< HEAD
    <Card className="flex flex-col max-w-[20rem] space-y-4 p-5 bg-background/50 backdrop-blur">
      <CardHeader className="p-0">
        <div className="relative w-full h-[16rem]">
=======
    <Card className="max-w-[20rem] space-y-4 flex flex-col justify-between p-5 bg-background/50 backdrop-blur">
      <CardContent className="p-0">
        <div className="relative w-full h-[16rem] mb-4">
>>>>>>> 32c4fb284747446aba512e14d6c2afb633785382
          <Image
            src={bot.imageSource}
            fill
            className="rounded-lg object-cover"
            alt={bot.name}
          />
        </div>
<<<<<<< HEAD
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <h3 className="font-semibold">{bot.name}</h3>
        <p className="text-muted-foreground">{bot.description}</p>
=======
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{bot.name}</h3>
          <p className="text-muted-foreground">{bot.description}</p>
        </div>
>>>>>>> 32c4fb284747446aba512e14d6c2afb633785382
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

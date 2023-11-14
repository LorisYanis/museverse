"use client";

import { Bot } from "@prisma/client";
import { BotCard } from "./bot-card";
import { useSearchParams } from "next/navigation";

interface BotCardsProps {
  bots: Bot[];
}

export const BotCards = ({ bots }: BotCardsProps) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  return (
    <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:gap-4 max-sm:grid-cols-1 gap-9">
      {categoryId &&
        bots.map(
          (bot: Bot) =>
            categoryId === bot.categoryId && <BotCard bot={bot} key={bot.id} />,
        )}
      {!categoryId &&
        bots.map((bot: Bot) => <BotCard bot={bot} key={bot.id} />)}
    </div>
  );
};

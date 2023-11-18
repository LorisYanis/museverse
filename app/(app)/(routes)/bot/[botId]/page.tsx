import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { BotCreateForm } from "../../../_components/bot-create-form";

interface BotUpdatePageProps {
  params: {
    botId: string;
  };
}

const BotUpdatePage = async ({ params }: BotUpdatePageProps) => {
  const categories = await prismadb.category.findMany();
  const bot = await prismadb.bot.findUnique({
    where: {
      id: params.botId,
    },
  });

  if (!bot) {
    redirect("/bot/create");
  }

  return (
    <div>
      <BotCreateForm currentBotData={bot} categories={categories} />
    </div>
  );
};

export default BotUpdatePage;

import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { Chat } from "@/components/chat/chat";

interface ChatBotIdPageProps {
  params: {
    botId: string;
  };
}

const ChatBotIdPage = async ({ params }: ChatBotIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const bot = await prismadb.bot.findUnique({
    where: {
      id: params.botId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
    },
  });

  if (!bot) {
    notFound();
  }

  return <Chat bot={bot} />;
};

export default ChatBotIdPage;

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
  });

  return <Chat bot={bot} />;
};

export default ChatBotIdPage;

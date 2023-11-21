import dotenv from "dotenv";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";

import prismadb from "@/lib/prismadb";
import { rateLimit } from "@/lib/rate-limit";
import { MemoryManager } from "@/lib/memory";
import { openai } from "@/lib/openai";

dotenv.config({ path: `.env` });

export async function POST(
  request: Request,
  { params }: { params: { botId: string } },
) {
  try {
    const { messages } = await request.json();
    const prompt = messages[messages.length - 1]?.content;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 422 });
    }

    const user = await currentUser();

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const identifier = request.url + "-" + user.id;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }

    const bot = await prismadb.bot.update({
      where: {
        id: params.botId,
      },
      data: {
        messages: {
          create: {
            role: "user",
            content: prompt,
            userId: user.id,
          },
        },
      },
    });

    if (!bot) {
      return new NextResponse("Bot does not exist", { status: 404 });
    }

    const botId = bot.id;
    const botFileName = `${botId}.txt`;

    const botKey = {
      userId: user.id,
      botId: botId,
      modelName: "chatgpt",
    };

    const memoryManager = MemoryManager.getInstance();
    const records = await memoryManager.readLatestHistory(botKey);

    if (records.length === 0) {
      await memoryManager.seedChatHistory(bot.seedChat, "\n\n", botKey);
    }

    await memoryManager.writeToHistory("User: " + prompt + "\n", botKey);

    const recentChatHistory = await memoryManager.readLatestHistory(botKey);

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      botFileName,
    );

    let relevantHistory = "";

    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      stream: true,
      messages: [
        {
          role: "user",
          content: `You're ${bot.name}, and You're talking with ${user.firstName}.

      Create SHORT and highly personified response WITHOUT any prefixes at ALL. DO NOT use ${bot.name}: prefix.

      Below is your preamble
      ${bot.preamble}

      Below are relevant details about ${bot.name}'s past chats and the conversation you are in
      ${relevantHistory}

      Below is a relevant conversation history
      ${recentChatHistory}`,
        },
      ],
    });

    const stream = OpenAIStream(response, {
      async onCompletion(completion: any) {
        await memoryManager.writeToHistory(completion + "\n", botKey);

        await prismadb.bot.update({
          where: {
            id: params.botId,
          },
          data: {
            messages: {
              create: {
                role: "system",
                content: completion,
                userId: user.id,
              },
            },
          },
        });
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("BOT_CHAT_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

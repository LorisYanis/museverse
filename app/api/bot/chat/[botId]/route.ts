import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { CallbackManager } from "langchain/callbacks";
import { Replicate } from "langchain/llms/replicate";
import { LangChainStream, StreamingTextResponse } from "ai";

import prismadb from "@/lib/prismadb";
import { rateLimit } from "@/lib/rate-limit";
import { MemoryManager } from "@/lib/memory";

export async function POST(
  request: Request,
  { params }: { params: { botId: string } },
) {
  try {
    const { prompt } = await request.json();

    const user = await currentUser();

    if (!user || !user.id) {
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
      return new NextResponse("Bot doesn't exist", { status: 404 });
    }

    const botId = bot.id;
    const botFileName = `${botId}.txt`;

    const botKey = {
      userId: user.id,
      botId: botId,
      modelName: "llama2-13b",
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

    const { handlers } = LangChainStream();

    const model = new Replicate({
      model:
        "meta/llama-2-13b-chat:f4e2de70d66816a838a89eeeb621910adffb0dd0baba3976c96980970978018d",
      input: {
        max_length: 4096,
        max_new_tokens: 250,
      },
      apiKey: process.env.REPLICATE_API_KEY,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });

    model.verbose = true;

    const botResponse = String(
      await model
        .call(
          `Create SHORT (within 4 sentences), highly personified, yet complete response WITHOUT any prefixes at ALL. DO NOT use ${bot.name}: prefix. Always look for ways to get your interlocutor thinking creatively and give them VERY specific advon how to do so.

          ${bot.preamble}

          Below are relevant details about ${bot.name}'s past chats and the conversation you are in.
          ${relevantHistory}

          ${recentChatHistory}\n${bot.name}:
        `,
        )
        .catch(console.error),
    );

    const cleaned = botResponse.replaceAll(",", "");
    const chunks = cleaned.split("\n\n\n");
    const response = chunks[0];

    await memoryManager.writeToHistory("" + response.trim(), botKey);
    var Readable = require("stream").Readable;

    let s = new Readable();
    s.push(response);
    s.push(null);

    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistory("" + response.trim(), botKey);

      await prismadb.bot.update({
        where: {
          id: params.botId,
        },
        data: {
          messages: {
            create: {
              role: "system",
              content: response.trim(),
              userId: user.id,
            },
          },
        },
      });
    }

    return new StreamingTextResponse(s);
  } catch (error) {
    console.log("BOT_CHAT_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

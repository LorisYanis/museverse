import dotenv from "dotenv";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { CallbackManager } from "langchain/callbacks";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LangChainStream, StreamingTextResponse } from "ai";

import prismadb from "@/lib/prismadb";
import { rateLimit } from "@/lib/rate-limit";
import { MemoryManager } from "@/lib/memory";

dotenv.config({ path: `.env` });

export async function POST(
  request: Request,
  { params }: { params: { botId: string } },
) {
  try {
    const { prompt } = await request.json();

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

    console.log("prompt: ", prompt);

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

    const { handlers } = LangChainStream();

    const model = new OpenAI({
      modelName: "gpt-3.5-turbo-16k",
      openAIApiKey: process.env.OPENAI_API_KEY,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });
    // DEBUG
    model.verbose = true;

    const chainPrompt = PromptTemplate.fromTemplate(
      `You're ${bot.name}, and You're talking with ${user.firstName}.

      Create SHORT [within 4 sentences], highly personified, yet complete response WITHOUT any prefixes at ALL. DO NOT use ${bot.name}: prefix. Always look for ways to get your interlocutor thinking creatively and give them VERY specific advon how to do so.

      Below is your preamble
      ${bot.preamble}

      Below are relevant details about ${bot.name}'s past chats and the conversation you are in
      ${relevantHistory}

      Below is a relevant conversation history
      ${recentChatHistory}`,
    );

    const chain = new LLMChain({
      llm: model,
      prompt: chainPrompt,
    });

    const result = await chain
      .call({
        relevantHistory,
        recentChatHistory: recentChatHistory,
      })
      .catch(console.error);

    const chatHistoryRecord = await memoryManager.writeToHistory(
      result!.text + "\n",
      botKey,
    );
    console.log("chatHistoryRecord", chatHistoryRecord);

    var Readable = require("stream").Readable;

    let s = new Readable();
    s.push(result!.text);
    s.push(null);

    if (result !== undefined && result.text.length > 1) {
      await prismadb.bot.update({
        where: {
          id: params.botId,
        },
        data: {
          messages: {
            create: {
              role: "system",
              content: result.text,
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

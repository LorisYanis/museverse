import { Redis } from "@upstash/redis";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export type BotKey = {
  userId: string;
  botId: string;
  modelName: string;
};

export class MemoryManager {
  private static instance: MemoryManager;
  private history: Redis;
  private vectorDBClient: Pinecone;

  public constructor() {
    this.history = Redis.fromEnv();
    this.vectorDBClient = new Pinecone();
  }

  public init() {
    if (this.vectorDBClient instanceof Pinecone) {
      this.vectorDBClient = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!,
      });
    }
  }

  public async vectorSearch(recentChatHistory: string, botFileName: string) {
    const pineconeClient = <Pinecone>this.vectorDBClient;

    const pineconeIndex = pineconeClient.index(process.env.PINECONE_INDEX!);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY! }),
      { pineconeIndex },
    );

    const similarDocs = await vectorStore
      .similaritySearch(recentChatHistory, 3, { fileName: botFileName })
      .catch((err) => {
        console.log("Failed to get vector search results", err);
      });

    return similarDocs;
  }

  public static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
      MemoryManager.instance.init();
    }

    return MemoryManager.instance;
  }

  private generateRedisbotKey(botKey: BotKey): string {
    return `${botKey.botId}-${botKey.modelName}-${botKey.userId}`;
  }

  public async writeToHistory(text: string, botKey: BotKey) {
    if (!botKey || typeof botKey.userId === "undefined") {
      console.log("Bot key set incorrectly");
      return "";
    }

    const key = this.generateRedisbotKey(botKey);
    const result = await this.history.zadd(key, {
      score: Date.now(),
      member: text,
    });

    return result;
  }

  public async readLatestHistory(botKey: BotKey): Promise<string> {
    if (!botKey || typeof botKey.userId === "undefined") {
      console.log("Bot key set incorrectly");
      return "";
    }

    const key = this.generateRedisbotKey(botKey);
    let result = await this.history.zrange(key, 0, Date.now(), {
      byScore: true,
    });

    result = result.slice(-30).reverse();
    const recentChats = result.reverse().join("\n");
    return recentChats;
  }

  public async seedChatHistory(
    seedContent: string,
    delimiter: string = "\n",
    botKey: BotKey,
  ) {
    const key = this.generateRedisbotKey(botKey);

    if (await this.history.exists(key)) {
      console.log("User already has chat history");
      return;
    }

    const content = seedContent.split(delimiter);
    let counter = 0;

    for (const line of content) {
      await this.history.zadd(key, {
        score: counter,
        member: line,
      });
      counter += 1;
    }
  }
}

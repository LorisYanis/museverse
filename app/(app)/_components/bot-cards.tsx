import { BotCard } from "./bot-card";

export const BotCards = () => {
  return (
    <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:gap-4 max-sm:grid-cols-1 gap-9">
      <BotCard
        bot={{
          id: "1",
          userId: "1",
          imageSource: "/images/thumbnail.png",
          name: "Steve Jobs",
          description: "Founder & Former CEO of Apple of Apple",
          preamble: "1",
          seedChat: "seedChat",
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: "1",
        }}
      />
    </div>
  );
};

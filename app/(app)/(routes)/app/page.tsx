import prismadb from "@/lib/prismadb";

import { BotCards } from "../../_components/bot-cards";
import { CategoryPicker } from "../../_components/category-picker";
import { BotSearch } from "../../_components/bot-search";

const AppPage = async ({
  searchParams: { categoryId, botName },
}: {
  searchParams: { categoryId: string; botName: string };
}) => {
  const categories = await prismadb.category.findMany();
  const bots = await prismadb.bot.findMany({
    where: {
      categoryId,
      name: { contains: botName },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="flex flex-1 flex-col items-center">
      <section className="mb-36 w-full">
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="mt-16">
              <BotSearch />
              <CategoryPicker categories={categories} />
            </div>
            <BotCards bots={bots} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppPage;

import prismadb from "@/lib/prismadb";

import { BotCards } from "../../_components/bot-cards";
import { CategoryPicker } from "../../_components/category-picker";

const AppPage = async () => {
  const categories = await prismadb.category.findMany();
  const bots = await prismadb.bot.findMany();

  return (
    <div className="flex flex-1 flex-col items-center">
      <section className="mb-36 w-screen">
        <div className="container">
          <div className="flex flex-col items-center">
            <CategoryPicker categories={categories} />
            <BotCards bots={bots} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppPage;

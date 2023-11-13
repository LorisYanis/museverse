import prismadb from "@/lib/prismadb";

import { BotCard } from "../../_components/bot-card";
import { CategoryPicker } from "../../_components/category-picker";

const AppPage = async () => {
  const categories = await prismadb.category.findMany();

  return (
    <div className="flex-1 flex-col">
      <section className="mb-36">
        <div className="container">
          <div className="flex flex-col items-center">
            <CategoryPicker categories={categories} />
            <div className="flex">
              {/* <BotCard
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
              /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppPage;

import prismadb from "@/lib/prismadb";

import { BotCard } from "../../_components/bot-card";
import { CategoryPicker } from "../../_components/category-picker";

const AppPage = async () => {
  const categories = await prismadb.category.findMany();

  return (
    <div className="flex flex-1 flex-col items-center">
      <nav className="scroll-bar mt-16 mb-10 bg-zinc-900 p-1 rounded-lg max-md:w-full max-md:px-2 max-md:mt-10">
        <ul className="space-x-2 font-medium text-sm max-md:overflow-x-scroll max-md:whitespace-nowrap">
          {CATEGORIES.map((category, index) => (
            <li
              className={cn(
                "relative inline-block px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-950 hover:text-white transition-colors",
                category === ACTIVE ? "bg-zinc-950 text-white z-20" : "",
              )}
              key={index}
            >
              <button type="button">{category}</button>
            </li>
          ))}
        </ul>
      </nav>

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
            <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:gap-4 max-sm:grid-cols-1 gap-9">
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppPage;

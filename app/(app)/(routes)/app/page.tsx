import prismadb from "@/lib/prismadb";

import { cn } from "@/lib/utils";
import { BotCards } from "../../_components/bot-cards";
import { CategoryPicker } from "../../_components/category-picker";

const AppPage = async () => {
  const categories = await prismadb.category.findMany();

  return (
    <div className="flex flex-1 flex-col items-center">
      {/* Scroll Category Picker */}

      {/* <nav className="scroll-bar mt-16 mb-10 bg-zinc-900 p-1 rounded-lg max-md:w-full max-md:px-2 max-md:mt-10">
        <ul className="space-x-2 font-medium text-sm max-md:overflow-x-scroll max-md:whitespace-nowrap">
          {categories.map((category, index) => (
            <li
              className={cn(
                "relative inline-block px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-950 hover:text-white transition-colors",
                category.name === "All" ? "bg-zinc-950 text-white z-20" : "",
              )}
              key={index}
            >
              <button type="button">{category.name}</button>
            </li>
          ))}
        </ul>
      </nav> */}

      <section className="mb-36">
        <div className="container">
          <div className="flex flex-col items-center">
            <CategoryPicker categories={categories} />
            <BotCards />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppPage;

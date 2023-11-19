"use client";

import queryString from "query-string";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CategoryPickerProps {
  categories: Category[];
}

export const CategoryPicker = ({ categories }: CategoryPickerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const botName = searchParams.get("botName");

  const onCategory = (id: string | undefined) => {
    const query = { categoryId: id, botName };

    const route = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(route);
  };

  return (
    <nav className="max-md:scroll-bar w-fit max-md:w-full mt-4 mb-10 max-md:mx-2.5 border border-input bg-background/50 backdrop-blur p-1 rounded-lg">
      <div className="flex space-x-2 font-medium text-sm whitespace-nowrap overflow-x-auto">
        <Button
          onClick={() => onCategory(undefined)}
          variant="ghost"
          className={cn(
            "hover:bg-muted",
            categoryId === null && "bg-muted z-10",
          )}
        >
          All
        </Button>
        {categories.map((category: Category) => (
          <Button
            onClick={() => onCategory(category.id)}
            variant="ghost"
            className={cn(
              "hover:bg-muted",
              categoryId === category.id && "bg-muted z-10",
            )}
            key={category.id}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </nav>
  );
};

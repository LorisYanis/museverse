"use client";

import qs from "query-string";
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

  const onCategory = (id: string | undefined) => {
    const query = { categoryId: id };

    const route = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(route);
  };

  return (
    <div className="overflow-auto">
      <div className="w-fit mt-16 mb-10 border border-input bg-background/50 backdrop-blur p-1 rounded-lg">
        <div className="flex space-x-2 font-medium text-sm">
          <Button
            onClick={() => onCategory(undefined)}
            variant="ghost"
            className={cn("hover:bg-muted", categoryId === null && "bg-muted")}
          >
            All
          </Button>
          {categories.map((category: Category) => (
            <Button
              onClick={() => onCategory(category.id)}
              variant="ghost"
              className={cn(
                "hover:bg-muted",
                categoryId === category.id && "bg-muted",
              )}
              key={category.id}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

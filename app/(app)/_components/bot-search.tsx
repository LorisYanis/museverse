"use client";

import queryString from "query-string";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/usehooks-ts/useDebounce";

export const BotSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const botName = searchParams.get("botName");

  const [value, setValue] = useState<string>(botName || "");
  const debouncedValue = useDebounce(value);

  const onInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      categoryId,
      botName: debouncedValue,
    };

    const route = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(route);
  }, [debouncedValue, categoryId, botName, router]);

  return (
    <div className="relative">
      <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 z-50 text-muted-foreground" />
      <Input
        onChange={onInput}
        className="rounded-lg pr-9"
        placeholder="Search for a bot"
      />
    </div>
  );
};

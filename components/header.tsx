import Image from "next/image";
import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isLanding?: boolean;
}

export const Header = ({ isLanding }: HeaderProps) => {
  const { userId } = auth();

  return (
    <header
      className={cn(
        "flex flex-row justify-between items-center px-10 py-6",
        !isLanding ? "border-b border-b-zinc-800" : "",
      )}
    >
      <Link href="/" className="flex flex-row gap-2">
        <Image src="/logo.svg" height="24" width="24" alt="logo" />
        <span className="font-bold">museverse.ai</span>
      </Link>
      <div className="flex flex-row gap-2">
        {isLanding && userId ? (
          <Button variant="ghost" asChild>
            <Link href="/app">Go to app</Link>
          </Button>
        ) : (
          <SignInButton mode="modal" afterSignInUrl="/app">
            <Button variant="ghost">Get museverse.ai Free</Button>
          </SignInButton>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};

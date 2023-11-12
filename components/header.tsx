import Image from "next/image";
import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeaderProps {
  isLanding?: boolean;
}

export const Header = ({ isLanding }: HeaderProps) => {
  const { userId } = auth();

  return (
    <header className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2">
        <Image src="/logo.svg" height="24" width="24" alt="logo" />
        <p className="font-bold">museverse.ai</p>
      </div>
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

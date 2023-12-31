"use client";

import Link from "next/link";
import Image from "next/image";
import { ClerkLoading, UserButton, useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { SignIn } from "@/components/sign-in";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isLanding?: boolean;
}

export const Header = ({ isLanding }: HeaderProps) => {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <header
      className={cn(
        "h-20 flex flex-row justify-between items-center p-6 md:px-10",
        !isLanding ? "border-b border-input" : "",
      )}
    >
      <Link href={isLanding ? "/" : "/app"} className="flex flex-row gap-2">
        <Image src="/logo.svg" height="24" width="24" alt="logo" />
        <span className="hidden md:block font-bold">museverse</span>
      </Link>
      <div className="flex flex-row gap-x-2">
        {isLanding && (
          <SignIn
            authenticatedText="Go to app"
            unauthenticatedText="Get museverse for free"
            variant="ghost"
          />
        )}
        {isLoaded && isSignedIn && <UserButton afterSignOutUrl="/" />}
        <ClerkLoading>
          <Button variant="ghost">
            <Loader />
          </Button>
        </ClerkLoading>
      </div>
    </header>
  );
};

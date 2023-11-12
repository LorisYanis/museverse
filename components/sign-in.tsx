"use client";

import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface SignInProps {
  authenticatedText: string;
  unauthenticatedText: string;
  variant?: "default" | "ghost";
  icon?: boolean;
}

export const SignIn = ({
  authenticatedText,
  unauthenticatedText,
  variant = "default",
  icon,
}: SignInProps) => {
  const user = useUser();

  return (
    <div>
      {user && (
        <Button variant={variant} asChild>
          <Link href="/app">
            {authenticatedText}
            {icon && <ArrowUpRight className="ml-1 w-5 h-5" />}
          </Link>
        </Button>
      )}
      {user === null && (
        <SignInButton>
          <Button variant={variant}>
            {unauthenticatedText}
            {icon && <ArrowUpRight className="ml-1 w-5 h-5" />}
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

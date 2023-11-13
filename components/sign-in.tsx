"use client";

import Link from "next/link";
import {
  useAuth,
  ClerkLoading,
  SignInButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Loader } from "./loader";

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
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <div>
      {isLoaded && isSignedIn && (
        <Button variant={variant} asChild>
          <Link href="/app">
            {authenticatedText}
            {icon && <ArrowUpRight className="ml-1 w-5 h-5" />}
          </Link>
        </Button>
      )}
      {isLoaded && !isSignedIn && (
        <SignInButton mode="modal" afterSignInUrl="/app">
          <Button variant={variant}>
            {unauthenticatedText}
            {icon && <ArrowUpRight className="ml-1 w-5 h-5" />}
          </Button>
        </SignInButton>
      )}
      <ClerkLoading>
        <Button variant={variant}>
          <Loader />
        </Button>
      </ClerkLoading>
    </div>
  );
};

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { SignIn } from "@/components/sign-in";

interface HeaderProps {
  isLanding?: boolean;
}

export const Header = ({ isLanding }: HeaderProps) => {
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
        <SignIn
          authenticatedText="Go to app"
          unauthenticatedText="Get museverse.ai Free"
          variant="ghost"
        />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};

import { SignInButton, auth } from "@clerk/nextjs";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FakeChat } from "../_components/fake-chat";

export default function Home() {
  const { userId } = auth();

  return (
    <div className="flex-1 flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-col gap-4 items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl text-transparent bg-clip-text font-black bg-gradient-to-r from-zinc-400 via-zinc-200 to-white background-animate">
            museverse.ai
          </h1>
          <p className="text-lg text-zinc-300">
            We are creative beings, not productive machines
          </p>
        </div>
        <div>
          {userId ? (
            <Button asChild>
              <Link href="/app">
                Unleash Creativity <ArrowUpRight className="ml-1 w-5 h-5" />
              </Link>
            </Button>
          ) : (
            <SignInButton mode="modal" afterSignInUrl="/app">
              <Button>
                Unleash Creativity <ArrowUpRight className="ml-1 w-5 h-5" />
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
      <FakeChat />
      <div>
        <div className="-z-50 translate-x-1/2 bg-gradient-to-t from-zinc-200 via-zinc-600 to-zinc-900 right-1/2 fixed bottom-0 translate-y-1/2 h-[1000px] w-[1000px] blur-[200px] rounded-full glow-animate" />
      </div>
    </div>
  );
}

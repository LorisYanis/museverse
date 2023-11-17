import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { ArrowUpLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Erorr() {
  return (
    <div className="h-full pt-20">
      <div className="grid place-items-center h-full">
        <div className="flex flex-col gap-3 md:gap-5 items-center justify-center">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="sm:text-4xl md:text-5xl text-3xl text-transparent bg-clip-text font-black bg-gradient-to-r from-zinc-500 via-zinc-300 to-white background-animate mb-2 md:mb-4">
              Seems like you are lost
            </h1>
            <p className="md:text-lg text-zinc-300 mb-1">
              <Balancer>
                The page you are trying to visit does not exist
              </Balancer>
            </p>
          </div>
          <div>
            <Button asChild>
              <Link href="/">
                <ArrowUpLeft className="mr-1 w-5 h-5" />
                Return to the Main Page
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <p className="fixed -z-40 sm:text-[10rem] md:text-[12rem] text-9xl leading-none text-transparent bg-clip-text font-black bg-gradient-to-t from-transparent to-background top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        404
      </p>
    </div>
  );
}

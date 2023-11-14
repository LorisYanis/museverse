import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { ArrowUpLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Gradient } from "@/components/gradient";

export default function Erorr() {
  // return (
  //   <div className="grid place-items-center h-full">
  //     <div className="flex flex-col items-center">
  //       <h1 className="relative sm:text-[10rem] md:text-[12rem] text-9xl leading-none text-transparent bg-clip-text font-black bg-gradient-to-r from-zinc-500 via-zinc-300 to-white background-animate">
  //         404
  //         <span className="absolute drop-shadow-[0_0_4px_rgba(9,9,11,0.35)] sm:text-4xl md:text-5xl text-3xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap text-white">
  //           Seems like you are lost
  //         </span>
  //       </h1>
  //       <p className="text-zinc-300 mb-5 md:text-lg">
  //         The page you are trying to visit does not exist
  //       </p>
  //       <Button variant={"default"} asChild>
  //         <Link href="/">
  //           <ArrowUpRight className="ml-1 w-5 h-5" />
  //           Return to the Main Page
  //         </Link>
  //       </Button>
  //       <div>
  //         <div className="-z-50 translate-x-1/2 bg-gradient-to-t from-zinc-400 via-zinc-700 to-zinc-900 right-1/2 fixed bottom-0 translate-y-1/2 h-[1000px] w-[1000px] blur-[200px] rounded-full glow-animate background-animate" />
  //       </div>
  //     </div>
  //   </div>
  // );

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
      {/* <Gradient /> */}
    </div>
  );
}

import Balancer from "react-wrap-balancer";

import { SignIn } from "@/components/sign-in";
import { FakeChat } from "../_components/fake-chat";

export default async function Home() {
  return (
    <div className="flex-1 flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-col gap-3 md:gap-5 items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="sm:text-4xl md:text-5xl text-3xl text-transparent bg-clip-text font-black bg-gradient-to-r from-zinc-500 via-zinc-300 to-white background-animate mb-2 md:mb-4">
            museverse.ai
          </h1>
          <p className="md:text-lg text-zinc-300 mb-1">
            <Balancer>We are creative beings, not productive machines</Balancer>
          </p>
        </div>
        <div>
          <SignIn
            authenticatedText="Unleash Creativity"
            unauthenticatedText="Unleash Creativity"
            icon={true}
          />
        </div>
      </div>
      <FakeChat />
      {/* <div>
        <div className="-z-50 translate-x-1/2 bg-gradient-to-t from-zinc-400 via-zinc-700 to-zinc-900 right-1/2 fixed bottom-0 translate-y-1/2 h-[1000px] w-[1000px] blur-[200px] rounded-full glow-animate background-animate" />
      </div> */}
    </div>
  );
}

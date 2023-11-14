import { ArrowUpLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChatMessage } from "@/components/chat/chat-message";
import { Button } from "@/components/ui/button";

export const FakeChat = () => {
  return (
    <div
      className={cn(
        "bg-gradient-to-t fixed -z-10 bottom-0 from-transparent to-background py-2 md:py-4 px-8 rounded-t-lg border-[1px] border-b-0 border-muted h-[36vh] mx-6 md:w-[60vw] overflow-hidden opacity-mask transition fake-chat-animate",

        "flex flex-col gap-y-5",
      )}
    >
      <div className="relative z-50 top-0 flex flex-col justify-center items-center py-2 md:pb-4 md:px-10 border-b border-input">
        <Button variant="outlineOpacity" className="gap-x-2">
          <ArrowUpLeft className="w-5 h-5" />
          <p className="text-sm font-medium">Steve Jobs</p>
        </Button>
      </div>
      <ChatMessage
        role="user"
        content="Explain quantum computing in simple terms"
      />
      <ChatMessage
        role="system"
        imageSource="/stevejobs.jpeg"
        content="Quantum computing is a type of computing where information is processed using quantum-mechanical phenomena, such as superposition and entanglement. In traditional computing, information is processed using bits, which can have a value of either 0 or 1."
      />
      <ChatMessage
        role="user"
        content="Explain quantum computing in simple terms"
      />
      <ChatMessage
        role="system"
        imageSource="/stevejobs.jpeg"
        content="Quantum computing is a type of computing where information is processed using quantum-mechanical phenomena, such as superposition and entanglement."
      />
      <ChatMessage
        role="user"
        content="Explain quantum computing in simple terms"
      />
      <ChatMessage
        role="system"
        imageSource="/stevejobs.jpeg"
        content="Quantum computing is a type of computing where information is processed using quantum-mechanical phenomena, such as superposition and entanglement. In traditional computing, information is processed using bits, which can have a value of either 0 or 1."
      />
    </div>
  );
};

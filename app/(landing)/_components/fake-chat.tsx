import { cn } from "@/lib/utils";
import { ChatMessage } from "@/components/chat/chat-message";

export const FakeChat = () => {
  return (
    <div
      className={cn(
        "bg-gradient-to-t fixed bottom-0 from-transparent to-background p-8 rounded-t-lg border-[1px] border-b-0 border-muted h-[40vh] w-[60vw] overflow-hidden opacity-mask transition fake-chat-animate",
      )}
    >
      <ChatMessage
        role="user"
        content="Explain quantum computing in simple terms"
      />
      <ChatMessage
        role="system"
        src="/stevejobs.jpeg"
        content="Quantum computing is a type of computing where information is processed using quantum-mechanical phenomena, such as superposition and entanglement. In traditional computing, information is processed using bits, which can have a value of either 0 or 1."
      />
      <ChatMessage
        role="user"
        content="Explain quantum computing in simple terms"
      />
      <ChatMessage
        role="system"
        src="/stevejobs.jpeg"
        content="Quantum computing is a type of computing where information is processed using quantum-mechanical phenomena, such as superposition and entanglement."
      />
      <ChatMessage
        role="user"
        content="Explain quantum computing in simple terms"
      />
      <ChatMessage
        role="system"
        src="/stevejobs.jpeg"
        content="Quantum computing is a type of computing where information is processed using quantum-mechanical phenomena, such as superposition and entanglement. In traditional computing, information is processed using bits, which can have a value of either 0 or 1."
      />
    </div>
  );
};

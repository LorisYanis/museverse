import { ArrowUpLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChatMessage } from "@/components/chat/chat-message";
import { Button } from "@/components/ui/button";

export const FakeChat = () => {
  return (
    <div
      className={cn(
        "bg-gradient-to-t fixed -z-10 bottom-0 from-transparent to-background px-4 md:px-8 rounded-t-lg border-[1px] border-b-0 border-muted h-[30vh] md:h-[36vh] mx-6 md:w-[60vw] overflow-hidden opacity-mask transition fake-chat-animate",

        "flex flex-col gap-y-3 md:gap-y-5",
      )}
    >
      <div className="relative z-50 top-0 flex flex-col justify-center items-center mb-3 py-3 md:py-5w border-b border-input">
        <Button variant="outlineOpacity" className="gap-x-2">
          <ArrowUpLeft className="w-5 h-5" />
          <p className="text-sm font-medium">Steve Jobs</p>
        </Button>
      </div>
      <ChatMessage
        role="user"
        content="If someone is searching for ways to positively impact society, what advice do you have on identifying areas where innovation can have the most transformative effect?"
      />
      <ChatMessage
        role="system"
        imageSource="/stevejobs.png"
        content="My dear friend let me tell you the world is ripe for transformation waiting for the next wave of innovators to reshape its contours. When seeking to positively impact society look no further than the intersection of technology and human needs. Identify pain points bottlenecks and limitations in how people live work and communicate. Then with a laser-like focus on simplicity and elegance craft solutions that not only solve these issues but also elevate the human experience. Remember true innovation doesn't just make life easier; it makes life more meaningful. So go forth my young apprentice and dare to think differently!"
      />
      <ChatMessage
        role="user"
        content="In the ongoing journey of innovation, how can aspiring changemakers ensure that their creations not only reflect the current needs of society but also anticipate and address the future challenges that might arise?"
      />
      <ChatMessage
        role="system"
        imageSource="/stevejobs.png"
        content="My young apprentice the art of innovation is not merely about solving today's problems but also about anticipating tomorrow's challenges. As you embark on your own journey of creating change remember to keep one foot rooted in the present while the other reaches towards the horizon. Observe the subtle whispers of human needs the unspoken desires that long for expression. Then with each stroke of your creative brush paint a vision of a better future where technology and humanity entwine in harmony. Embrace failure as a stepping stone to success and never be afraid to challenge the status quo. The future belongs to those who dare to imagine beyond the present so go forth and shape the world with your ingenuity!"
      />
    </div>
  );
};

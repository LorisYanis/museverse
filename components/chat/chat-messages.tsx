"use client";

import { Bot } from "@prisma/client";
import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  bot: Bot;
}

export const ChatMessages = ({ bot }: ChatMessagesProps) => {
  return (
    <div className="flex flex-col gap-5 items-end justify-end flex-1 px-3 pb-8">
      <ChatMessage
        role="system"
        isLoading
        content={`Hi, I'm ${bot.name}, ${bot.description}`}
        imageSource={bot.imageSource}
      />
      <ChatMessage
        role="user"
        isLoading
        content={`Hi, William, how's it going? What're you writing today?`}
        imageSource={bot.imageSource}
      />
      <ChatMessage
        role="system"
        isLoading
        content={`Hoho, my friend, I'm writing all the day and all the night and actually, doing great! What about you?`}
        imageSource={bot.imageSource}
      />
      <ChatMessage
        role="user"
        isLoading
        content={`I'm doing absolutely amazing, trying to find my muse`}
        imageSource={bot.imageSource}
      />
      <ChatMessage
        role="system"
        isLoading
        content={`I have some advice for you. For instance, Explore Different Activities: Engage in various activities and hobbies. Sometimes, inspiration strikes when you least expect it. Try things like painting, hiking, reading, or even cooking.

        Change Your Environment: A change of scenery can do wonders. Visit new places, go for a walk in nature, or simply rearrange your workspace. Sometimes, a different setting can spark creativity.`}
        imageSource={bot.imageSource}
      />
      <ChatMessage
        role="user"
        isLoading
        content={`Maybe 5 more?`}
        imageSource={bot.imageSource}
      />
      <ChatMessage
        role="system"
        isLoading
        content={`Surely! Read Widely: Reading can expose you to new ideas, perspectives, and styles. It might help you find inspiration in unexpected places. Read different genres and authors to broaden your horizons.

        Connect with Others: Engage in conversations with people from diverse backgrounds. Their experiences and insights may provide a fresh perspective and inspire new ideas.

        Reflect on Your Passions: Consider what you are truly passionate about. Your muse may be hidden within your interests. Explore those passions and see where they lead.
        
        Study the Masters: Look to the work of artists, writers, musicians, or creators you admire. Analyze what speaks to you in their work and consider how you can incorporate similar elements into your own.

        Keep a Journal: Writing down your thoughts, feelings, and observations can help you uncover patterns and connections that lead to inspiration. It's also a great way to document your creative journey.`}
        imageSource={bot.imageSource}
      />
      <ChatMessage
        role="user"
        isLoading
        content={`Amazing! Compose a little poem, please.`}
        imageSource={bot.imageSource}
      />
      <ChatMessage
        role="system"
        isLoading
        content={`Certainly! Here's a short poem for you:
        Whispers of the Wind
        
        In the twilight of the day,
        Where the sun and moon hold sway,
        Whispers of the wind unfold,
        Stories ancient, yet untold.

        Leaves, they dance in silent glee,
        Choreography of the tree.
        Secrets woven in the breeze,
        Nature’s gentle expertise.

        Mountains standing tall and wise,
        Painted by the sunset skies.
        Rivers carving paths below,
        Whispers in the currents flow.

        Stars emerge, a cosmic choir,
        Lighting up the night entire.
        In the quiet, hear the call,
        Nature's poem, written for all.

        So, in the hush of eventide,
        Let your thoughts and dreams collide.
        In the whispers of the night,
        Find the magic, pure and bright.`}
        imageSource={bot.imageSource}
      />
    </div>
  );
};

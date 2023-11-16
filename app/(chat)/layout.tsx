import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return <div className="h-full">{children}</div>;
};

export default ChatLayout;

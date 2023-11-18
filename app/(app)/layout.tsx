import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Header } from "@/components/header";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="h-full flex flex-col">
      <Header isLanding={false} />
      {children}
    </div>
  );
};

export default LandingLayout;

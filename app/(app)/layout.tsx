import { Header } from "@/components/header";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <Header isLanding={false} />
      {children}
    </div>
  );
};

export default LandingLayout;

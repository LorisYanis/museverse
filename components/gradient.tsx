import Image from "next/image";

export const Gradient = () => {
  return (
    <div>
      <div className="fixed h-[100rem] w-[100rem] right-1/2 translate-x-1/2 bottom-0 translate-y-1/2 -z-50 glow-animate">
        <Image src="/main-gradient.png" fill alt="" quality={100} />
      </div>
    </div>
  );
};

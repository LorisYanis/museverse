import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BotAvatarProps {
  src?: string;
  name?: string;
}

export const BotAvatar = ({ src, name }: BotAvatarProps) => {
  const firstNameLetter = name?.split("")[0];

  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={src} />
      <AvatarFallback>{firstNameLetter ? firstNameLetter : "B"}</AvatarFallback>
    </Avatar>
  );
};

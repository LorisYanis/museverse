import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BotAvatarProps {
  imageSource?: string;
  name?: string;
}

export const BotAvatar = ({ imageSource, name }: BotAvatarProps) => {
  const firstNameLetter = name?.split("")[0];

  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={imageSource} />
      <AvatarFallback>{firstNameLetter ? firstNameLetter : "B"}</AvatarFallback>
    </Avatar>
  );
};

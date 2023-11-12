import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = () => {
  const { user } = useUser();
  const firstNameLetter = user?.firstName?.split("")[0];

  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>{firstNameLetter ? firstNameLetter : "U"}</AvatarFallback>
    </Avatar>
  );
};

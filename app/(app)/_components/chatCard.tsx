import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IChatCard {
  image: string;
  title: string;
  description: string;
  slug: string;
}

const ChatCard = ({ image, title, description, slug }: IChatCard) => {
  return (
    <figure className="relative p-2.5 border border-zinc-800 rounded-lg">
      <Image src={image} alt="thumbnail" width={250} height={200} />
      <figcaption>
        <h3 className="font-semibold">{title}</h3>
        <p className="font-medium text-xs mt-1 mb-2.5">{description}</p>
        <Button asChild>
          <Link
            href={slug}
            className="text-sm font-medium text-center block w-full"
          >
            Enter Chat <ArrowUpRight className="ml-1 w-5 h-5" />
          </Link>
        </Button>
      </figcaption>
    </figure>
  );
};

export default ChatCard;

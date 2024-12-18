import { Champion } from "@/types/Champion";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  champion: Champion;
  latestVersion: string;
};

export default function Card({ champion, latestVersion }: CardProps) {
  return (
    <Link href={`/champions/${champion.id}`}>
      <div
        className="flex flex-col items-center max-w-150px bg-[#3C3C41] text-[rgb(9, 20, 40)] rounded-lg 
          overflow-hidden transform transition-transform hover:scale-110 p-2
          text-center min-h-full
          "
      >
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`}
          alt={champion.name}
          width={100}
          height={100}
          className=""
        />
        <div className="p-2">
          <h2 className="text-lg text-[#C89B3C] font-bold ">{champion.name}</h2>
          <p className="text-sm mt-1 font-semi-bold text-[#F0E6D2]">
            {champion.title}
          </p>
        </div>
      </div>
    </Link>
  );
}

import { champion } from "@/types/Champion";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  champion: champion;
  latestVersion: string;
};

export default function Card({ champion, latestVersion }: CardProps) {
  return (
    <Link href={`/champions/${champion.id}`}>
      <a className="block bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`}
          alt={champion.name}
          width={100}
          height={100}
          className="w-full h-auto"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {champion.name}
          </h2>
          <p className="text-gray-600">{champion.title}</p>
        </div>
      </a>
    </Link>
  );
}

import { fetchChampionDetail } from "@/utils/serverApi";
import { Metadata } from "next";
import Image from "next/image";

interface ChampionsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ChampionsPageProps): Promise<Metadata> {
  const { id } = params;
  const champion = await fetchChampionDetail(id);

  return {
    title: `${champion.name} - ${champion.title}`,
    description: champion.blurb,
  };
}

export default async function ChampionPage({ params }: ChampionsPageProps) {
  const { id } = params;
  const champion = await fetchChampionDetail(id);

  return (
    <div className="champion-detail container mx-auto max-w-screen-xl p-4 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center text-[#C89B3C]">
        {champion.name}
      </h1>
      <h2 className="text-2xl text-center text-[#F0E6D2] mt-2">
        {champion.title}
      </h2>
      <div className="flex justify-center m-5">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
          alt={champion.name}
          width={350}
          height={100}
          className="rounded-lg"
        />
      </div>
      <p className="text-white text-lg font-bold leading-relaxed mb-4">
        {champion.blurb}
      </p>

      <div className="flex flex-row justify-between p-6 rounded-lg mt-8">
        <div className="champion-stats">
          <h3 className="text-xl font-semibold text-[#C89B3C] mb-2">Stats</h3>
          <ul className="list-disc list-inside">
            <li>체력: {champion.stats.hp}</li>
            <li>방어력: {champion.stats.armor}</li>
            <li>마법저항력: {champion.stats.spellblock}</li>
            <li>공격력: {champion.stats.attackdamage}</li>
          </ul>
        </div>

        <div className="champion-tags">
          <h3 className="text-xl font-semibold text-[#C89B3C] mb-2">Tags</h3>
          <ul className="list-disc list-inside flex gap-2 flex-wrap">
            {champion.tags.map((tag) => (
              <li
                key={tag}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="champion-partype">
          <h3 className="text-xl font-semibold text-[#C89B3C] mb-2">
            Resource
          </h3>
          <p className="text-white font-bold">{champion.partype}</p>
        </div>
      </div>
    </div>
  );
}

import { fetchChampionDetail, getLatestVersion } from "@/utils/serverApi";
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
  const latestVersion = await getLatestVersion();

  return (
    <div className="champion-detail container mx-auto max-w-screen-xl p-4 rounded-xl bg-[#3C3C41] shadow-md">
      {/* 챔피언 타이틀 부분 */}
      <div className="title-container mt-2">
        <h1 className="text-4xl font-bold text-center text-[#C89B3C]">
          {champion.name}
        </h1>
        <h2 className="text-2xl text-center text-[#F0E6D2] mt-2">
          {champion.title}
        </h2>
      </div>

      {/* 챔피언 이미지와 설명 */}
      <div>
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
      </div>

      {/* 챔피언의 상세 정보 세션(스탯, 태그, 리소스) */}
      <div className="nav-container flex justify-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ps-10 gap-8 mt-8">
          <div className="champion-stats">
            <h3 className="text-xl font-semibold text-[#C89B3C] mb-2">Stats</h3>
            <ul className="list-disc text-white list-inside">
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

      {/* 스킬 세션 부분 */}
      <div className="champion-skills mt-8">
        <h3 className="text-xl font-semibold text-[#C89B3C] mb-4">Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 min-h-full gap-6">
          <div className="bg-[#1C1C21] p-4 rounded-lg shadow-md">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/passive/${champion.passive.image.full}`}
              alt="Passive"
              width={64}
              height={64}
              className="rounded"
            />
            <h4 className="text-lg font-bold text-[#C89B3C] mt-2">Passive</h4>
            <p className="text-sm text-white mt-1">
              {champion.passive.description.replace(
                /<\/?[^>]+(>|$)|@[^ ]+/g,
                ""
              )}
            </p>
          </div>
          {champion.spells.map((spell) => (
            <div
              key={spell.id}
              className="bg-[#1C1C21] p-4 rounded-lg shadow-md"
            >
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/spell/${spell.image.full}`}
                alt={spell.name}
                width={64}
                height={64}
                className="rounded"
              />
              <h4 className="text-lg font-bold text-[#C89B3C] mt-2">
                {spell.name}
              </h4>
              <p className="text-sm text-white mt-1">
                {spell.description.replace(/<\/?[^>]+(>|$)|@[^ ]+/g, "")}
              </p>
              <p className="text-sm text-[#C89B3C] mt-2">
                Cooldown: {spell.cooldown.join(", ")} seconds
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 스킨 세션 설명 */}
      <div className="champion-skins mt-8">
        <h3 className="text-xl font-semibold text-[#C89B3C] mb-4">Skins</h3>
        <div className="flex flex-wrap gap-4">
          {champion.skins.map((skin) => (
            <div
              key={skin.id}
              className="bg-[#1C1C21] p-4 rounded-lg shadow-md  md:w-48"
            >
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`}
                alt={skin.name}
                width={150}
                height={150}
                className="rounded"
              />
              <h4 className="text-lg font-bold text-[#C89B3C] mt-2">
                {skin.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Champion } from "@/types/Champion";
import { fetchChampionList, getLatestVersion } from "@/utils/serverApi";
import Card from "@/components/champions/Card";

export const revalidate = 86400;

export default async function ChampionsPage() {
  // 서버에서 데이터 가져오기
  const champions = await fetchChampionList();
  const latestVersion = await getLatestVersion();

  return (
    <div className="container min-h-screen max-w-screen-xl mt-8 mx-auto p-2">
      <h1 className="text-3xl font-bold text-font-gold text-center mb-8">
        챔피언 리스트
      </h1>
      <div className="grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {Object.values(champions).map((champion: Champion) => (
          <Card
            key={champion.id}
            champion={champion}
            latestVersion={latestVersion}
          />
        ))}
      </div>
    </div>
  );
}

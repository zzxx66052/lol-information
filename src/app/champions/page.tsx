import { champion } from "@/types/Champion";
import { fetchChampionList, getLatestVersion } from "@/utils/serverApi";
import Card from "@/components/champions/Card";

export const revalidate = 86400;

export default async function ChampionsPage() {
  // 서버에서 데이터 가져오기
  const champions = await fetchChampionList();
  const latestVersion = await getLatestVersion();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-font-gold text-center mb-6">
        챔피언 리스트
      </h1>
      <div className="grid grid-cols-8 gap-4 overflow-x-auto">
        {Object.values(champions).map((champion: champion) => (
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

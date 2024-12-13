import { champion } from "@/types/Champion";

// 최신 정보를 불러오는 함수
export async function getLatestVersion(): Promise<string> {
  const apiVersionUrl = "https://ddragon.leagueoflegends.com/api/versions.json";

  try {
    const versionsResponse = await fetch(apiVersionUrl, {
      next: { revalidate: 86400 },
    });
    const versions: string[] = await versionsResponse.json();
    return versions[0];
  } catch (error) {
    throw new Error("Unable to fetch the latest Data Dragon version.");
  }
}

// 최신 정보에서 리스트를 가져와 data에 저장하는 함수
export async function fetchChampionList(): Promise<Record<string, champion>> {
  try {
    const latestVersion = await getLatestVersion();
    const championsUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`;

    const response = await fetch(championsUrl, {
      next: { revalidate: 86400 },
    });
    const data = await response.json();

    return data.data;
  } catch (error) {
    throw new Error("Unable to fetch champion list.");
  }
}

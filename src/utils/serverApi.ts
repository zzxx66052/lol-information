import { Item } from "@/types/Item";

import { Champion } from "@/types/Champion";

import { ChampionDetail } from "./../types/Champion";

const baseUrl = "https://ddragon.leagueoflegends.com/cdn";

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
export async function fetchChampionList(): Promise<Record<string, Champion>> {
  try {
    const latestVersion = await getLatestVersion();
    const championsUrl = `${baseUrl}/${latestVersion}/data/ko_KR/champion.json`;

    const response = await fetch(championsUrl, {
      next: { revalidate: 86400 },
    });
    const data = await response.json();

    return data.data;
  } catch (error) {
    throw new Error("Unable to fetch champion list.");
  }
}

// 최신 정보를 토대로 챔피언 디테일 정보를 data에 저장하는 함수
export async function fetchChampionDetail(id: string): Promise<ChampionDetail> {
  const latestVersion = await getLatestVersion();
  const response = await fetch(
    `${baseUrl}/${latestVersion}/data/ko_KR/champion/${id}.json`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch champion data: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data[id];
}

// 최신정보를 토대로 아이템 리스트 정보를 data에 저장하는 함수
export async function fetchItemList(version: string) {
  const latestVersion = await getLatestVersion();
  const response = await fetch(
    `${baseUrl}/${latestVersion}/data/ko_KR/item.json`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to fetch item data: ${response.statusText}`);
  }

  return data.data as Record<string, Item>;
}

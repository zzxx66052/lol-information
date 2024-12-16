import { ChamionRotation } from "@/types/ChampionRotation";

export const getChampionRotation = async (): Promise<ChamionRotation> => {
  const response = await fetch("/api/rotation");
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

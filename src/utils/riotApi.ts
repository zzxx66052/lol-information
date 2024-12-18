import { ChamionRotation } from "@/types/ChampionRotation";
import { resolve } from "path";

export const getChampionRotation = async (): Promise<ChamionRotation> => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(1500);

  const response = await fetch("/api/rotation");
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

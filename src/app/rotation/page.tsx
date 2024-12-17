"use client";

import Card from "@/components/champions/Card";
import { Champion } from "@/types/Champion";
import { ChamionRotation } from "@/types/ChampionRotation";
import { getChampionRotation } from "@/utils/riotApi";
import { fetchChampionList, getLatestVersion } from "@/utils/serverApi";
import { useEffect, useState } from "react";

export default function RotationPage() {
  //tanstack Query refactoring

  const [rotationData, setRotationData] = useState<ChamionRotation | null>(
    null
  );
  const [champions, setChampions] = useState<Record<string, any>>({});
  const [latestVersion, setLatestVersion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChampionRotation = async () => {
      try {
        setLoading(true);

        const [version, rotation, championList] = await Promise.all([
          getLatestVersion(),
          getChampionRotation(),
          fetchChampionList(),
        ]);

        setLatestVersion(version);
        setRotationData(rotation);

        const matchedChampions = rotation.freeChampionIds.reduce((acc, id) => {
          const championKey = Object.keys(championList).find(
            (key) => championList[key].key === String(id)
          );

          if (championKey) {
            acc[championKey] = championList[championKey];
          }

          return acc;
        }, {} as Record<string, Champion>);

        setChampions(matchedChampions);
      } catch (err) {
        console.log(err);
        setError("챔피언 로테이션 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchChampionRotation();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="containter mx-auto min-h-screen max-w-screen-xl p-2 ">
      <h1 className="text-3xl font-bold text-[#C89B3C] text-center mb-8">
        무료 챔피언 로테이션
      </h1>

      <div className="mb-8">
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.keys(champions).map((championKey) => (
            <li key={championKey}>
              <Card
                champion={champions[championKey]}
                latestVersion={latestVersion}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

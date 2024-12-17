"use client";
import { useQuery } from "@tanstack/react-query";

import Card from "@/components/champions/Card";

import { Champion } from "@/types/Champion";

import { getChampionRotation } from "@/utils/riotApi";
import { fetchChampionList, getLatestVersion } from "@/utils/serverApi";

export default function RotationPage() {
  //tanstack Query refactoring
  const {
    data: latestVersion,
    isPending: isVersionPending,
    isError: isVersionError,
  } = useQuery({
    queryKey: ["latestVersion"],
    queryFn: getLatestVersion,
  });

  const {
    data: rotationData,
    isPending: isRotationPending,
    isError: isRotationError,
  } = useQuery({
    queryKey: ["rotationData"],
    queryFn: getChampionRotation,
  });

  const {
    data: championList,
    isPending: isChampionsListPending,
    isError: isChampionsListError,
  } = useQuery({
    queryKey: ["championList"],
    queryFn: fetchChampionList,
  });

  const isPending =
    isVersionPending || isRotationPending || isChampionsListPending;
  const isError = isVersionError || isRotationError || isChampionsListError;

  if (isPending) {
    return <p>로딩동작중...</p>;
  }

  if (isError) {
    return <p>챔피언 로테이션 데이터를 불러오는데 실패했습니다.</p>;
  }

  const matchedChampions = rotationData.freeChampionIds.reduce((acc, id) => {
    const championKey = Object.keys(championList).find(
      (key) => championList[key].key === String(id)
    );

    if (championKey) {
      acc[championKey] = championList[championKey];
    }

    return acc;
  }, {} as Record<string, Champion>);

  return (
    <div className="containter mx-auto min-h-screen max-w-screen-xl p-2 ">
      <h1 className="text-3xl font-bold text-[#C89B3C] text-center mb-8">
        무료 챔피언 로테이션
      </h1>

      <div className="mb-8">
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.keys(matchedChampions).map((championKey) => (
            <li key={championKey}>
              <Card
                champion={matchedChampions[championKey]}
                latestVersion={latestVersion}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";
import { useQuery } from "@tanstack/react-query";

import { Champion } from "@/types/Champion";

import Card from "@/components/champions/Card";

import { getChampionRotation } from "@/utils/riotApi";
import { fetchChampionList, getLatestVersion } from "@/utils/serverApi";

export default function RotationPage() {
  //tanstack Query refactoring

  // 최신버전을 가져오는 쿼리문
  const {
    data: latestVersion,
    isPending: isLatestVersionPending,
    isError: isLatestVersionError,
  } = useQuery({
    queryKey: ["latestVersion"],
    queryFn: getLatestVersion,
  });

  // 로테이션 데이터를 가져오기 위한 쿼리문
  const {
    data: rotationData,
    isPending: isRotationDataPending,
    isError: isRotationDataError,
  } = useQuery({
    queryKey: ["rotationData"],
    queryFn: getChampionRotation,
  });

  // 챔피언 리스트를 가져오기 위한 쿼리문
  const {
    data: championList,
    isPending: isChampionListPending,
    isError: isChampionListError,
  } = useQuery({
    queryKey: ["championList"],
    queryFn: fetchChampionList,
  });

  // 에러와 로딩처리
  const isPending =
    isLatestVersionPending || isRotationDataPending || isChampionListPending;
  const isError =
    isLatestVersionError || isRotationDataError || isChampionListError;

  if (isPending) {
    return <p>로딩동작중...</p>;
  }

  if (isError) {
    return <p>챔피언 로테이션 데이터를 불러오는데 실패했습니다.</p>;
  }

  //reduce를 이용해 챔피언의 KEY값과 로테이션의 KEY값을 비교
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
      <h1 className="text-3xl font-bold text-[#C89B3C] text-center mt-8 mb-8">
        무료 챔피언 로테이션(금주 기존 이용자들이 사용할 수 있습니다.)
      </h1>

      <div className="mb-8">
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
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

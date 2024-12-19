import { NextResponse } from "next/server";

export async function GET(request: Request) {
  //apiUrl
  const apiUrl =
    "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations";

  //apiKey
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      error: "not definded apiKey",
    });
  }

  // apiUrl에 ApiKey 토큰 적용
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Riot-Token": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Riot API Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || "반응이 없어서 에러가 발생했습니다.",
    });
  }
}

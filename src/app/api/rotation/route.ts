export async function GET() {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) {
    throw new Error("not definded apiKey");
  }
  console.log(apiKey);

  const apiurl =
    "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations";

  const response = await fetch(apiurl, {
    headers: {
      "X-Riot-Token": apiKey,
    },
  });
  return response;
}

import Image from "next/image";
import { Metadata } from "next";

import { Item, ItemDetailProps } from "@/types/Item";
import { fetchItemList, getLatestVersion } from "@/utils/serverApi";

export async function generateStaticParams() {
  const latestVersion = await getLatestVersion();
  const items = await fetchItemList(latestVersion);

  // 아이템의 ID값만 추출(최신버전)
  return Object.keys(items).map((id) => ({
    id,
  }));
}

// MetaData 적용
export async function generateMetadata({
  params,
}: ItemDetailProps): Promise<Metadata> {
  const latestVersion = await getLatestVersion();
  const items = await fetchItemList(latestVersion);
  const item = items[params.id];

  return {
    title: item ? item.name : "Item not found",
    description: item ? item.plaintext : "description not found",
  };
}

export default async function ItemDetailPage({ params }: ItemDetailProps) {
  const latestVersion = await getLatestVersion();
  const items: Record<string, Item> = await fetchItemList(latestVersion);
  const item = items[params.id];
  const higherItems = item.into ? item.into.map((id) => items[id]) : [];

  return (
    <div className="item-Detail bg-[#3C3C41] container mx-auto max-w-screen-xl p-4 rounded-xl">
      <h1 className="text-4xl font-bold text-center text-[#C89B3C] m-4">
        {item.name}
      </h1>
      <div className="flex flex-col justify-center m-5">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${item.image.full}`}
          alt={item.name}
          width={120}
          height={120}
          className="mx-auto mb-2"
        />

        {/* nav 설명 */}
        <div className="m-4 text-center">
          <p className="text-xl text-[#CDFAFA]">
            {item.plaintext.replace(/<\/?[^>]+(>|$)|@[^ ]+/g, "")}
          </p>
          <p className="text-xl text-[#CDFAFA]">
            {item.description.replace(/<\/?[^>]+(>|$)|@[^ ]+/g, "")}
          </p>
        </div>

        {/* 아이템 스탯 가격 태그 */}
        <div className="flex flex-row justify-center p-6 rounded-lg mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ps-10 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#C89B3C] mb-2">Stats</h2>
              <ul className="list-disc text-white list-inside text-[20px]">
                {Object.entries(item.stats).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#C89B3C] mb-1">가격</h2>
              <p className="text-white text-[20px] font-bold leading-relaxed ">
                구매가격 : {item.gold.total}
              </p>
              <p className="text-white text-[20px] font-bold leading-relaxed ">
                판매가격 : {item.gold.sell}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#C89B3C] mb-2">Tags</h2>
              <ul className="list-disc list-inside flex gap-2 flex-wrap">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="bg-white text-blue-800 font-semibold px-2 py-1 rounded"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 상위아이템 구매 가능한 정보 */}
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {higherItems.length > 0 ? (
              higherItems.map((higherItem) => (
                <div
                  key={higherItem.name}
                  className="p-4 bg-[#2C2C2F] rounded-lg text-center"
                >
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${higherItem.image.full}`}
                    alt={higherItem.name}
                    width={80}
                    height={80}
                    className="mx-auto mb-2"
                  />
                  <h3 className="text-l font-bold text-[#C89B3C] mb-1">
                    {higherItem.name}
                  </h3>
                </div>
              ))
            ) : (
              <p className="text-white text-center text-[18px]">
                구매 가능한 상위 아이템이 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

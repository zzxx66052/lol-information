import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next";

import { fetchItemList, getLatestVersion } from "@/utils/serverApi";

export const metadata: Metadata = {
  title: "Items List",
  description: "Browse all items from League of Legends.",
};

export default async function ItemsPage() {
  const latestVersion = await getLatestVersion();
  const items = await fetchItemList(latestVersion);

  return (
    <div className="container min-h-screen mx-auto max-w-screen-xl p-2">
      <h1 className="text-3xl text-[#C89B3C] font-bold text-center mt-8 mb-4">
        아이템 목록
      </h1>

      {/* 아이템 리스트를 나타내는 div */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
        {Object.entries(items).map(([id, item]) => (
          <Link href={`/items/${id}`} key={id}>
            <div className="item-card p-4 text-center min-h-full rounded-lg  bg-[#3C3C41]">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${item.image.full}`}
                alt={item.name}
                width={48}
                height={48}
                className="mx-auto mb-2"
              />
              <h2 className="text-lg font-semibold text-[#C89B3C]">
                {item.name.replace(/<\/?[^>]+(>|$)|@[^ ]+/g, "")}
              </h2>
              <p className="text-sm text-[#CDFAFA]">
                구매가격 : {item.gold.total}
              </p>
              <p className="text-sm text-[#CDFAFA]">
                판매가격 : {item.gold.sell}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

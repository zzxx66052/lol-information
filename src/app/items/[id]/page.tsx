import { Item, ItemDetailProps } from "@/types/Item";
import { fetchItemList, getLatestVersion } from "@/utils/serverApi";
import { Metadata } from "next";
import Image from "next/image";

export async function generateStaticParams() {
  const latestVersion = await getLatestVersion();
  const items = await fetchItemList(latestVersion);

  return Object.keys(items).map((id) => ({
    id,
  }));
}

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

  if (!item) {
    console.log("item not definded");
  }

  return (
    <div className="item-Detail container mx-auto max-w-screen-xl p-4 rounded-lg">
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
        <div className="m-4 text-center">
          <p className="text-xl text-[#CDFAFA]">
            {item.plaintext.replace(/<\/?[^>]+(>|$)|@[^ ]+/g, "")}
          </p>
          <p className="text-xl text-[#CDFAFA]">
            {item.description.replace(/<\/?[^>]+(>|$)|@[^ ]+/g, "")}
          </p>
        </div>

        <div className="flex flex-row justify-between p-6 rounded-lg mt-8">
          <div>
            <h2 className="text-2xl font-bold text-[#C89B3C] mb-2">Stats</h2>
            <ul className="list-disc list-inside text-[20px]">
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
    </div>
  );
}

import { fetchItemList, getLatestVersion } from "@/utils/serverApi";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Items List",
  description: "Browse all items from League of Legends.",
};

export async function generateStaticParams() {
  const latestVersion = await getLatestVersion();
  const items = await fetchItemList(latestVersion);

  return Object.keys(items).map((id) => ({
    id,
  }));
}

export default async function ItemsPage() {
  const latestVersion = await getLatestVersion();
  const items = await fetchItemList(latestVersion);

  return (
    <div className="items-page container mx-auto p-4">
      <h1 className="text-4xl text-[#C89B3C] font-bold text-start mb-6">
        Items
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(items).map(([id, item]) => (
          <div
            key={id}
            className="item-card border border-[#F0E6D2] p-4 rounded-lg text-center hover:shadow-lg"
          >
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${item.image.full}`}
              alt={item.name}
              width={48}
              height={48}
              className="mx-auto mb-2"
            />
            <h2 className="text-lg font-semibold text-[#C89B3C]">
              {item.name}
            </h2>
            <p className="text-sm text-[#CDFAFA]">{item.plaintext}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

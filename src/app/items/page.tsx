import { fetchItemList, getLatestVersion } from "@/utils/serverApi";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Items List",
  description: "Browse all items from League of Legends.",
};

export default async function ItemsPage() {
  const latestVersion = await getLatestVersion();
  const items = await fetchItemList(latestVersion);

  return (
    <div className="items-page container mx-auto p-4">
      <h1 className="text-4xl text-[#C89B3C] font-bold text-start mb-6">
        Items
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
        {Object.entries(items).map(([id, item]) => (
          <Link href={`/items/${id}`} key={id}>
            <div className="item-card p-4 text-center">
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
                {item.plaintext.replace(/<\/?[^>]+(>|$)|@[^ ]+/g, "")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

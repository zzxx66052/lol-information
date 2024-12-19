export interface Item {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  into?: string[]; //상위 아이템 정보
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };

  // 아이템 가격
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
  };
  tags: string[];
  maps: Record<string, boolean>;
  stats: Record<string, number>;
  depth?: number;
}

export interface ItemsPageProps {
  items: Record<string, Item>;
}

export interface ItemDetailProps {
  params: {
    id: string;
  };
}

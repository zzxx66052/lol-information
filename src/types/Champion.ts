export type Champion = {
  id: string;
  key: string;
  name: string;
  title: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
};

export type ChampionDetail = {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  tags: string[];
  partype: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };

  // 스탯
  stats: {
    hp: number; //hp
    armor: number; //방어력
    spellblock: number; //마법저항력
    attackdamage: number; //공격력
  };

  // 스킨 정보
  skins: [
    {
      id: string;
      name: string;
      num: number;
      chromas: boolean;
    }
  ];

  // 스킬 정보
  spells: [
    {
      id: string;
      name: string;
      description: string;
      cooldown: number[];
      image: {
        full: string;
        sprite: string;
        group: string;
        x: number;
        y: number;
        w: number;
        h: number;
      };
    }
  ];

  // 패시브 정보
  passive: {
    name: string;
    description: string;
    image: {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };
  };
};

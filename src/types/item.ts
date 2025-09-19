// Types pour les items de League of Legends

export interface ItemImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ItemGold {
  base: number;
  purchasable: boolean;
  total: number;
  sell: number;
}

export interface ItemStats {
  [key: string]: number;
}

export interface ItemMaps {
  [mapId: string]: boolean;
}

export interface Item {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  image: ItemImage;
  gold: ItemGold;
  tags: string[];
  maps: ItemMaps;
  stats: ItemStats;
}

export interface ItemData {
  data: Record<string, Item>;
  type: string;
  version: string;
}

// Utilitaires pour les URLs d'items
export const getItemIconUrl = (itemId: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/15.18.1/img/item/${itemId}.png`;
};

// Fonction pour rechercher un item par nom
export const findItemByName = (items: ItemData, itemName: string): { id: string; item: Item } | null => {
  const normalizeString = (str: string) =>
    str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/['']/g, '\''); // Normaliser les apostrophes

  const normalizedSearch = normalizeString(itemName);

  for (const [id, item] of Object.entries(items.data)) {
    const normalizedItemName = normalizeString(item.name);
    
    // Correspondance exacte
    if (normalizedItemName === normalizedSearch) {
      return { id, item };
    }
    
    // Correspondance partielle
    if (normalizedItemName.includes(normalizedSearch) || normalizedSearch.includes(normalizedItemName)) {
      return { id, item };
    }
  }

  return null;
};
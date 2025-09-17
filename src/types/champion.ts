// Types pour l'API de League of Legends
export interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface ChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

export interface Champion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: ChampionInfo;
  image: ChampionImage;
  tags: string[];
  partype: string;
  stats: ChampionStats;
}

export interface ChampionData {
  data: Record<string, Champion>;
  type: string;
  version: string;
}

// Configuration API
export const API_CONFIG = {
  BASE_URL: 'https://ddragon.leagueoflegends.com/cdn',
  VERSION: '15.18.1',
  LANGUAGE: 'fr_FR',
  PATHS: {
    champions: '/data/{lang}/champion.json',
    championIcon: '/img/champion/{championId}.png',
    championSplash: '/img/champion/splash/{championId}_{skinNum}.jpg',
    championLoading: '/img/champion/loading/{championId}_{skinNum}.jpg'
  }
} as const;

// Utilitaires pour construire les URLs
export const buildApiUrl = (path: string, params: Record<string, string> = {}) => {
  let url = `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}${path}`;
  
  // Remplacer les paramètres dans l'URL
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`{${key}}`, value);
  });
  
  // Remplacer le langage
  url = url.replace('{lang}', API_CONFIG.LANGUAGE);
  
  return url;
};

export const getChampionIconUrl = (championId: string) => {
  return buildApiUrl(API_CONFIG.PATHS.championIcon, { championId });
};

export const getChampionSplashUrl = (championId: string, skinNum: number = 0) => {
  return buildApiUrl(API_CONFIG.PATHS.championSplash, { 
    championId, 
    skinNum: skinNum.toString() 
  });
};

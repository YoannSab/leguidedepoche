import { ChampionData, DetailedChampionData, DetailedChampion, buildApiUrl, API_CONFIG } from '@/types/champion';

class ChampionService {
  private cache: ChampionData | null = null;
  private detailedCache: Map<string, DetailedChampion> = new Map();
  private loading = false;

  /**
   * Récupère tous les champions depuis l'API Riot Games
   */
  async getChampions(): Promise<ChampionData> {
    // Retourner le cache s'il existe
    if (this.cache) {
      return this.cache;
    }

    // Éviter les appels multiples simultanés
    if (this.loading) {
      while (this.loading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this.cache!;
    }

    this.loading = true;

    try {
      const url = buildApiUrl(API_CONFIG.PATHS.champions);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      }

      const data: ChampionData = await response.json();
      this.cache = data;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des champions:', error);
      throw new Error('Impossible de récupérer les données des champions');
    } finally {
      this.loading = false;
    }
  }

  /**
   * Recherche des champions par nom
   */
  async searchChampions(query: string): Promise<ChampionData> {
    const allChampions = await this.getChampions();
    
    if (!query.trim()) {
      return allChampions;
    }

    const normalizeString = (str: string) => 
      str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const normalizedQuery = normalizeString(query);

    const filteredData = Object.entries(allChampions.data)
      .filter(([_, champion]) => 
        normalizeString(champion.name).includes(normalizedQuery) ||
        normalizeString(champion.title).includes(normalizedQuery) ||
        champion.tags.some(tag => normalizeString(tag).includes(normalizedQuery))
      )
      .reduce((acc, [key, champion]) => {
        acc[key] = champion;
        return acc;
      }, {} as Record<string, typeof allChampions.data[string]>);

    return {
      ...allChampions,
      data: filteredData
    };
  }

  /**
   * Obtient un champion spécifique par son ID
   */
  async getChampionById(championId: string) {
    const allChampions = await this.getChampions();
    return allChampions.data[championId] || null;
  }

  /**
   * Obtient les détails complets d'un champion (stats + sorts + passif)
   */
  async getDetailedChampionById(championId: string): Promise<DetailedChampion | null> {
    // Vérifier le cache d'abord
    if (this.detailedCache.has(championId)) {
      return this.detailedCache.get(championId)!;
    }

    try {
      // Utiliser l'endpoint anglais pour les données détaillées
      let url = buildApiUrl(API_CONFIG.PATHS.championDetail, { championId });      
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      }

      const data: DetailedChampionData = await response.json();
      const championData = data.data[championId] || null;
      
      // Mettre en cache si les données existent
      if (championData) {
        this.detailedCache.set(championId, championData);
      }
      
      return championData;
    } catch (error) {
      console.error(`Erreur lors de la récupération des détails du champion ${championId}:`, error);
      throw new Error(`Impossible de récupérer les détails du champion ${championId}`);
    }
  }

  /**
   * Vide le cache (utile pour forcer un rafraîchissement)
   */
  clearCache() {
    this.cache = null;
    this.detailedCache.clear();
  }
}

// Instance singleton du service
export const championService = new ChampionService();

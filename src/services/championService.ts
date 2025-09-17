import { ChampionData, buildApiUrl, API_CONFIG } from '@/types/champion';

class ChampionService {
  private cache: ChampionData | null = null;
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

    const filteredData = Object.entries(allChampions.data)
      .filter(([_, champion]) => 
        champion.name.toLowerCase().includes(query.toLowerCase()) ||
        champion.title.toLowerCase().includes(query.toLowerCase()) ||
        champion.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
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
   * Vide le cache (utile pour forcer un rafraîchissement)
   */
  clearCache() {
    this.cache = null;
  }
}

// Instance singleton du service
export const championService = new ChampionService();

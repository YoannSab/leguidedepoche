import { RunesReforgedData, Rune, findRuneById } from '@/types/rune';
import { buildApiUrl, API_CONFIG } from '@/types/champion';

class RuneService {
  private cache: RunesReforgedData | null = null;
  private loading = false;
  
  /**
   * Récupère toutes les runes depuis l'API Riot Games
   */
  async getRunes(): Promise<RunesReforgedData> {
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
      const url = buildApiUrl(API_CONFIG.PATHS.runes);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      }

      const data: RunesReforgedData = await response.json();
      this.cache = data;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des runes:', error);
      throw new Error('Impossible de récupérer les données des runes');
    } finally {
      this.loading = false;
    }
  }

  /**
   * Recherche une rune par ID
   */
  async findRuneById(runeId: number): Promise<Rune | null> {
    try {
      const allRunes = await this.getRunes();
      return findRuneById(allRunes, runeId);
    } catch (error) {
      console.error(`Erreur lors de la recherche de la rune ${runeId}:`, error);
      return null;
    }
  }

  /**
   * Recherche une rune par ID (version string)
   */
  async findRuneByIdString(runeIdString: string): Promise<Rune | null> {
    const runeId = parseInt(runeIdString, 10);
    if (isNaN(runeId)) {
      return null;
    }
    return this.findRuneById(runeId);
  }

  /**
   * Vide le cache
   */
  clearCache() {
    this.cache = null;
  }
}

// Instance singleton du service
export const runeService = new RuneService();
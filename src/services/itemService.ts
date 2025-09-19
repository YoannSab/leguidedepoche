import { buildApiUrl, API_CONFIG } from '@/types/champion';
import { ItemData, Item } from '@/types/item';

class ItemService {
  private cache: ItemData | null = null;
  private loading = false;

  /**
   * Récupère tous les items depuis l'API Riot Games
   */
  async getItems(): Promise<ItemData> {
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
      const url = buildApiUrl(API_CONFIG.PATHS.items);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      }

      const data: ItemData = await response.json();
      this.cache = data;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des items:', error);
      throw new Error('Impossible de récupérer les données des items');
    } finally {
      this.loading = false;
    }
  }

  /**
   * Recherche un item par nom
   */
  async findItemByName(itemName: string) {
    const allItems = await this.getItems();
    
    const normalizeString = (str: string) =>
      str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['']/g, '\'');

    const normalizedSearch = normalizeString(itemName);

    for (const [id, item] of Object.entries(allItems.data)) {
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
  }

  /**
   * Vide le cache
   */
  clearCache() {
    this.cache = null;
  }
}

// Instance singleton du service
export const itemService = new ItemService();
import { useState, useEffect, useCallback } from 'react';
import { Champion, ChampionData } from '@/types/champion';
import { championService } from '@/services/championService';
import { SearchBar } from '@/components/SearchBar';
import { ChampionGrid } from '@/components/ChampionGrid';
import logoLgdp from '@/assets/logo_lgdp.png';
import './App.css';

function App() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement initial des champions
  useEffect(() => {
    const loadChampions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data: ChampionData = await championService.getChampions();
        const championList = Object.values(data.data);
        
        // Tri par nom
        championList.sort((a, b) => a.name.localeCompare(b.name));
        
        setChampions(championList);
        setFilteredChampions(championList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    loadChampions();
  }, []);

  // Fonction de recherche avec debounce
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setFilteredChampions(champions);
      return;
    }

    try {
      const searchResults = await championService.searchChampions(query);
      const championList = Object.values(searchResults.data);
      championList.sort((a, b) => a.name.localeCompare(b.name));
      setFilteredChampions(championList);
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      // En cas d'erreur, on filtre localement
      const filtered = champions.filter(champion =>
        champion.name.toLowerCase().includes(query.toLowerCase()) ||
        champion.title.toLowerCase().includes(query.toLowerCase()) ||
        champion.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredChampions(filtered);
    }
  }, [champions]);

  // Gestion du clic sur un champion
  const handleChampionClick = (champion: Champion) => {
    console.log('Champion sélectionné:', champion);
    // TODO: Naviguer vers la page de détail du champion
    alert(`Champion sélectionné: ${champion.name} - ${champion.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lol-blue via-lol-blue-light to-lol-blue-dark">
      {/* Header avec logo et présentation */}
      <header className="relative overflow-hidden">
        {/* Effet de background animé */}
        <div className="absolute inset-0 bg-gradient-to-r from-lol-gold/5 via-transparent to-lol-blue-accent/5" />
        
        <div className="relative container mx-auto px-4 py-16 text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={logoLgdp} 
              alt="Le Guide de Poche - Logo" 
              className="w-150 mx-auto drop-shadow-2xl hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-lol-gray-light mb-4 max-w-3xl mx-auto">
            Votre compagnon ultime pour maîtriser tous les champions de League of Legends
          </p>

          {/* Description */}
          <p className="text-lg text-lol-gray-light/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Découvrez des conseils, des astuces et des stratégies pour chaque champion. 
            Améliorez votre gameplay et dominez la Faille de l'Invocateur !
          </p>

          {/* Barre de recherche */}
          <div className="mb-8">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Rechercher un champion par nom, titre ou rôle..."
            />
          </div>

          {/* Statistiques */}
          <div className="flex justify-center items-center gap-8 text-lol-gray-light">
            <div className="text-center">
              <div className="text-2xl font-bold text-lol-gold">{champions.length}</div>
              <div className="text-sm">Champions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-lol-gold">{filteredChampions.length}</div>
              <div className="text-sm">Résultats</div>
            </div>
          </div>
        </div>
      </header>

      {/* Section principale avec la grille des champions */}
      <main className="container mx-auto px-4 pb-16">
        <ChampionGrid
          champions={filteredChampions}
          loading={loading}
          error={error || undefined}
          onChampionClick={handleChampionClick}
        />
      </main>

      {/* Footer */}
      <footer className="bg-lol-blue-dark border-t border-lol-gold/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lol-gray-light text-sm">
            Le Guide de Poche n'est pas affilié à Riot Games. 
            League of Legends est une marque commerciale de Riot Games, Inc.
          </p>
          <p className="text-lol-gray-light/60 text-xs mt-2">
            Données fournies par l'API Community Dragon de Riot Games
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

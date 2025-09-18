import { useState, useEffect } from 'react';
import { Champion } from '@/types/champion';
import { ChampionCard } from '@/components/ChampionCard';
import { Loader2, AlertCircle } from 'lucide-react';
import tips from '@/data/tips';

interface ChampionGridProps {
  champions: Champion[];
  loading?: boolean;
  error?: string;
  onChampionClick?: (champion: Champion) => void;
}

export function ChampionGrid({ 
  champions, 
  loading = false, 
  error, 
  onChampionClick 
}: ChampionGridProps) {
  const [visibleChampions, setVisibleChampions] = useState<Champion[]>([]);
  const [displayCount, setDisplayCount] = useState(24); // Nombre initial de champions à afficher

  // Pagination virtuelle pour les performances
  useEffect(() => {
    setVisibleChampions(champions.slice(0, displayCount));
  }, [champions, displayCount]);

  // Fonction pour charger plus de champions
  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 24, champions.length));
  };

  // Gestion du scroll infini
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        if (displayCount < champions.length) {
          loadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayCount, champions.length]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-lol-gold" />
        <p className="text-lol-gray-light">Chargement des champions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="text-lol-gray-light text-center max-w-md">
          {error}
        </p>
      </div>
    );
  }

  if (champions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="text-6xl">🔍</div>
        <p className="text-lol-gray-light text-center">
          Aucun champion trouvé
        </p>
        <p className="text-lol-gray-light text-sm text-center max-w-md">
          Essayez de modifier votre recherche ou vérifiez l'orthographe
        </p>
      </div>
    );
  }

  return (
    <div className="w-full -mt-10">
      {/* Grille des champions */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 lg:gap-6">
        {visibleChampions.map((champion) => {
          const hasTips = tips[champion.name as keyof typeof tips] !== undefined;
          return (
            <ChampionCard
              key={champion.id}
              champion={champion}
              onClick={onChampionClick}
              hasTips={hasTips}
            />
          );
        })}
      </div>

      {/* Bouton charger plus (si nécessaire) */}
      {displayCount < champions.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-gradient-to-r from-lol-gold to-lol-gold-dark text-lol-blue font-semibold rounded-lg hover:from-lol-gold-light hover:to-lol-gold transition-all duration-300 transform hover:scale-105"
          >
            Charger plus de champions ({champions.length - displayCount} restants)
          </button>
        </div>
      )}

      {/* Indicateur de fin */}
      {displayCount >= champions.length && champions.length > 24 && (
        <div className="flex justify-center mt-8 py-4">
          <p className="text-lol-gray-light text-sm">
            Tous les champions ont été chargés
          </p>
        </div>
      )}
    </div>
  );
}

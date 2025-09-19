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

  // Pagination virtuelle pour les performances
  useEffect(() => {
    setVisibleChampions(champions);
  }, [champions]);


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
    </div>
  );
}

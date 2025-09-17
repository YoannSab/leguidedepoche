import { useState } from 'react';
import { Champion, getChampionIconUrl } from '@/types/champion';
import { Card, CardContent } from '@/components/ui/card';

interface ChampionCardProps {
  champion: Champion;
  onClick?: (champion: Champion) => void;
}

export function ChampionCard({ champion, onClick }: ChampionCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleClick = () => {
    onClick?.(champion);
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-b from-lol-blue-light to-lol-blue border-lol-gold/20 hover:border-lol-gold/50"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          {/* Image du champion */}
          <div className="aspect-square bg-lol-blue-dark flex items-center justify-center">            
            {!imageError ? (
              <img
                src={getChampionIconUrl(champion.id)}
                alt={`${champion.name} - ${champion.title}`}
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-lol-gray-dark flex items-center justify-center">
                <div className="text-lol-gold text-center p-4">
                  <div className="text-2xl mb-1">⚔️</div>
                  <div className="text-xs">Image non disponible</div>
                </div>
              </div>
            )}

            {/* Overlay d'interaction */}
            <div className="absolute inset-0 bg-lol-gold/0 group-hover:bg-lol-gold/10 transition-colors duration-300" />
          </div>

          {/* Informations du champion */}
          <div className="p-3 bg-gradient-to-b from-lol-blue-light to-lol-blue-dark text-center">
            <h3 className="font-bold text-lol-gold-light group-hover:text-lol-gold-light transition-colors duration-300 truncate text-xs sm:text-sm md:text-lg">
              {champion.name}
            </h3>          
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

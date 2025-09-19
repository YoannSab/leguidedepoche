import { useState } from 'react';
import { Champion, getChampionIconUrl } from '@/types/champion';
import { Card, CardContent } from '@/components/ui/card';

interface ChampionCardProps {
  champion: Champion;
  onClick?: (champion: Champion) => void;
  hasTips?: boolean;
}

export function ChampionCard({ champion, onClick, hasTips = false }: ChampionCardProps) {
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

  const cardClasses = hasTips 
    ? "group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-b from-lol-blue-light to-lol-blue border-lol-gold/20 hover:border-lol-gold/50"
    : "group cursor-pointer transition-all duration-300 hover:scale-102 bg-gradient-to-b from-gray-700 to-gray-800 border-gray-600/30 hover:border-gray-500/50 opacity-60 hover:opacity-80";

  return (
    <Card 
      className={cardClasses}
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
                } ${!hasTips ? 'grayscale' : ''}`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-lol-gray-dark flex items-center justify-center">
                <div className={`text-center p-4 ${hasTips ? 'text-lol-gold' : 'text-gray-400'}`}>
                  <div className="text-2xl mb-1">⚔️</div>
                  <div className="text-xs">Image non disponible</div>
                </div>
              </div>
            )}

            {/* Overlay d'interaction */}
            <div className={`absolute inset-0 transition-colors duration-300 ${
              hasTips 
                ? 'bg-lol-gold/0 group-hover:bg-lol-gold/10' 
                : 'bg-gray-500/0 group-hover:bg-gray-500/10'
            }`} />
            
            {/* Badge pour indiquer si des tips sont disponibles */}
            {hasTips && (
              <div className="hidden sm:block absolute top-2 right-2 bg-lol-gold text-lol-blue-dark text-xs px-2 py-1 rounded-full font-semibold">
              Guide
              </div>
            )}
          </div>

          {/* Informations du champion */}
          <div className={`p-3 text-center ${
            hasTips 
              ? 'bg-gradient-to-b from-lol-blue-light to-lol-blue-dark' 
              : 'bg-gradient-to-b from-gray-700 to-gray-800'
          }`}>
            <h3 className={`font-bold transition-colors duration-300 truncate text-xs sm:text-sm md:text-lg ${
              hasTips 
                ? 'text-lol-gold-light group-hover:text-lol-gold-light' 
                : 'text-gray-300 group-hover:text-gray-200'
            }`}>
              {champion.name}
            </h3>          
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

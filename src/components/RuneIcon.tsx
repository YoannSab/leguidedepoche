import { useState, useEffect } from 'react';
import { runeService } from '@/services/runeService';
import { getRuneIconUrl } from '@/types/rune';

interface RuneIconProps {
  runeId: string | number; // ID de la rune
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

export function RuneIcon({ runeId, size = 'md', showName = false, className = '' }: RuneIconProps) {
  const [rune, setRune] = useState<{ id: number; name: string; icon: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadRune = async () => {
      try {
        setLoading(true);
        setImageError(false);
        
        // Convertir l'ID en nombre si c'est une string
        const runeIdString = typeof runeId === 'number' ? runeId.toString() : runeId;
        
        const foundRune = await runeService.findRuneByIdString(runeIdString);
        if (foundRune) {
          setRune({
            id: foundRune.id,
            name: foundRune.name,
            icon: foundRune.icon
          });
        } else {
          setRune(null);
        }
      } catch (error) {
        console.error(`Erreur lors de la recherche de la rune ${runeId}:`, error);
        setRune(null);
      } finally {
        setLoading(false);
      }
    };

    loadRune();
  }, [runeId]);

  const sizeClasses = {
    sm: 'w-6 h-6 md:w-8 md:h-8',
    md: 'w-8 h-8 md:w-12 md:h-12',
    lg: 'w-12 h-12 md:w-16 md:h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  if (loading) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <div className={`${sizeClasses[size]} bg-lol-blue-dark/50 rounded-full animate-pulse border border-lol-gold/30`} />
      </div>
    );
  }

  if (!rune) {
    // Fallback : ne rien afficher si la rune n'est pas trouvée
    return null;
  }

  return (
    <div 
      className={`inline-flex items-center ${className}`}
      title={rune.name}
    >
      {!imageError ? (
        <img
          src={getRuneIconUrl(rune.icon)}
          alt={rune.name}
          className={`${sizeClasses[size]} rounded-full border border-lol-gold/30 bg-lol-blue-dark/20 hover:border-lol-gold transition-colors`}
          onError={() => {
            setImageError(true);
          }}
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full border border-lol-gold/30 bg-lol-blue-dark/20 hover:border-lol-gold transition-colors flex items-center justify-center`}>
          <span className={`${textSizeClasses[size]} text-lol-gold-light text-center px-1 truncate`}>
            {rune.name.charAt(0)}
          </span>
        </div>
      )}
      {showName && (
        <span className={`${textSizeClasses[size]} text-lol-gold-light ml-2`}>
          {rune.name}
        </span>
      )}
    </div>
  );
}
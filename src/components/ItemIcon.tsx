import { useState, useEffect } from 'react';
import { itemService } from '@/services/itemService';
import { getItemIconUrl } from '@/types/item';

interface ItemIconProps {
  itemName: string; // Peut être un nom ou un ID
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

export function ItemIcon({ itemName, size = 'md', showName = false, className = '' }: ItemIconProps) {
  const [item, setItem] = useState<{ id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        
        // Vérifier si itemName est un ID numérique
        const isNumericId = /^\d{3,6}$/.test(itemName);
        
        if (isNumericId) {
          // Si c'est un ID, récupérer directement l'item
          const allItems = await itemService.getItems();
          const foundItem = allItems.data[itemName];
          if (foundItem) {
            setItem({ id: itemName, name: foundItem.name });
          } else {
            setItem(null);
          }
        } else {
          // Si c'est un nom, utiliser la recherche par nom
          const foundItem = await itemService.findItemByName(itemName);
          if (foundItem) {
            setItem({ id: foundItem.id, name: foundItem.item.name });
          } else {
            setItem(null);
          }
        }
      } catch (error) {
        console.error(`Erreur lors de la recherche de l'item ${itemName}:`, error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [itemName]);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  if (loading) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <div className={`${sizeClasses[size]} bg-lol-blue-dark/50 rounded animate-pulse border border-lol-gold/30`} />
      </div>
    );
  }

  if (!item) {
    // Fallback : ne rien afficher si l'item n'est pas trouvé
    return null;
  }

  return (
    <div 
      className={`inline-flex items-center ${className}`}
      title={item.name}
    >
      <img
        src={getItemIconUrl(item.id)}
        alt={item.name}
        className={`${sizeClasses[size]} rounded border border-lol-gold/30 bg-lol-blue-dark/20 hover:border-lol-gold transition-colors`}
        onError={(e) => {
          // Fallback en cas d'erreur de chargement d'image
          e.currentTarget.style.display = 'none';
        }}
      />
      {showName && (
        <span className={`${textSizeClasses[size]} text-lol-gold-light ml-2`}>
          {item.name}
        </span>
      )}
    </div>
  );
}
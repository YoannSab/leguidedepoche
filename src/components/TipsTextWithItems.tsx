import { ReactNode } from 'react';
import { ItemIcon } from './ItemIcon';

interface TipsTextWithItemsProps {
  text: string;
  className?: string;
}

export function TipsTextWithItems({ text, className = '' }: TipsTextWithItemsProps): ReactNode {
  // Regex pour détecter les IDs d'items (nombres de 3 à 6 chiffres)
  const itemIdRegex = /\b(\d{3,6})\b/g;
  
  const parseTextWithItemIds = (inputText: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let partIndex = 0;

    while ((match = itemIdRegex.exec(inputText)) !== null) {
      // Ajouter le texte avant l'ID
      if (match.index > lastIndex) {
        parts.push(inputText.slice(lastIndex, match.index));
      }

      // Ajouter l'icône de l'item
      const itemId = match[1];
      parts.push(
        <ItemIcon 
          key={`item-${partIndex}-${itemId}`}
          itemName={itemId}
          size="sm"
          className="inline-block mx-1 align-middle"
        />
      );

      lastIndex = itemIdRegex.lastIndex;
      partIndex++;
    }

    // Ajouter le texte restant
    if (lastIndex < inputText.length) {
      parts.push(inputText.slice(lastIndex));
    }

    return parts;
  };

  const parsedContent = parseTextWithItemIds(text);

  return (
    <span className={className}>
      {parsedContent}
    </span>
  );
}
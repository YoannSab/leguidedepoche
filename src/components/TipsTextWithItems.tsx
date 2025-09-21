import { ReactNode } from 'react';
import { ItemIcon } from './ItemIcon';
import { RuneIcon } from './RuneIcon';

interface TipsTextWithItemsProps {
  text: string;
  className?: string;
}

export function TipsTextWithItems({ text, className = '' }: TipsTextWithItemsProps): ReactNode {
  
  
  const parseTextWithIds = (inputText: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let partIndex = 0;

    // Créer un regex combiné pour détecter les items et les runes
    // Les runes sont des nombres de 4 chiffres commençant par 8 ou 9
    // Les items sont des nombres de 3 à 6 chiffres (mais excluant les runes)
    const combinedRegex = /\b(\d{3,6})\b/g;
    
    let match;
    while ((match = combinedRegex.exec(inputText)) !== null) {
      // Ajouter le texte avant l'ID
      if (match.index > lastIndex) {
        parts.push(inputText.slice(lastIndex, match.index));
      }

      const id = match[1];
      const numericId = parseInt(id, 10);
      
      // Déterminer si c'est une rune ou un item
      // Les runes commencent par 8 ou 9 et ont exactement 4 chiffres
      const isRune = id.length === 4 && (id.startsWith('8') || id.startsWith('9'));
      
      if (isRune) {
        // Ajouter l'icône de la rune
        parts.push(
          <RuneIcon 
            key={`rune-${partIndex}-${id}`}
            runeId={numericId}
            size="sm"
            className="inline-block mx-1 align-middle"
          />
        );
      } else {
        // Ajouter l'icône de l'item
        parts.push(
          <ItemIcon 
            key={`item-${partIndex}-${id}`}
            itemName={id}
            size="sm"
            className="inline-block mx-1 align-middle"
          />
        );
      }

      lastIndex = combinedRegex.lastIndex;
      partIndex++;
    }

    // Ajouter le texte restant
    if (lastIndex < inputText.length) {
      parts.push(inputText.slice(lastIndex));
    }

    return parts;
  };

  const parsedContent = parseTextWithIds(text);

  return (
    <span className={className}>
      {parsedContent}
    </span>
  );
}
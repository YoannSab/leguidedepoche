import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Rechercher un champion...", 
  debounceMs = 300 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce la recherche pour éviter trop d'appels API
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Déclenche la recherche quand la query débounced change
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        {/* Icône de recherche */}
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lol-gray-light h-4 w-4" 
        />
        
        {/* Champ de recherche */}
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-12 py-3 bg-lol-blue-light border-lol-gold/30 text-lol-gold-light placeholder:text-lol-gray-light focus:border-lol-gold focus:ring-lol-gold/20 transition-all duration-300"
        />
        
        {/* Bouton pour effacer */}
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-lol-gold/10 text-lol-gray-light hover:text-lol-gold"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Indicateur de recherche active */}
      {debouncedQuery && (
        <div className="absolute -bottom-6 left-0 text-xs text-lol-gray-light">
          Recherche: "{debouncedQuery}"
        </div>
      )}
    </div>
  );
}

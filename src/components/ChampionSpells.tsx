import { ChampionSpell, ChampionPassive, getSpellIconUrl, getPassiveIconUrl } from '@/types/champion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Coins, Zap, RulerDimensionLine } from 'lucide-react';

interface ChampionSpellsProps {
  spells: ChampionSpell[];
  passive: ChampionPassive;
}

export function ChampionSpells({ spells, passive }: ChampionSpellsProps) {
  // Fonction pour nettoyer le HTML des tooltips
  const cleanTooltip = (text: string) => {
    return text
      .replace(/<[^>]*>/g, '') // Supprime toutes les balises HTML
      .replace(/\{\{[^}]*\}\}/g, '') // Supprime les variables de template
      .trim();
  };

  // Fonction pour formater les coûts
  const formatCost = (spell: ChampionSpell) => {
    if (spell.costType === 'No Cost' || spell.cost.every(c => c === 0)) {
      return 'Aucun coût';
    }
    return `${spell.costBurn}`;
  };

  // Mapping des touches de sorts
  const spellKeys = ['Q', 'W', 'E', 'R'];

  return (
    <Card className="bg-lol-blue-dark/80 border-lol-gold/30">
      <CardHeader>
        <CardTitle className="text-lol-gold flex items-center gap-2 text-lg md:text-xl">
          <Zap className="w-6 h-6 md:w-7 md:h-7" />
          Compétences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Passif */}
        <div className="border-b border-lol-gold/20 pb-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={getPassiveIconUrl(passive.image.full)}
                alt={passive.name}
                className="w-14 h-14 md:w-16 md:h-16 rounded-lg border border-lol-gold/30"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-lol-gold text-lol-blue-dark text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                P
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lol-gold font-semibold mb-2 text-lg md:text-xl">{passive.name}</h4>
              <p className="text-lol-gray-light text-sm md:text-lg leading-relaxed">
                {cleanTooltip(passive.description)}
              </p>
            </div>
          </div>
        </div>

        {/* Sorts actifs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {spells.map((spell, index) => (
            <div key={spell.id} className="flex items-start gap-3 p-4 bg-lol-blue/20 rounded-lg border border-lol-gold/10">
              <div className="relative flex-shrink-0">
                <img
                  src={getSpellIconUrl(spell.image.full)}
                  alt={spell.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg border border-lol-gold/30"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute -bottom-1 -right-1 bg-lol-gold text-lol-blue-dark text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {spellKeys[index]}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lol-gold font-semibold text-base md:text-lg truncate">{spell.name}</h4>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm md:text-base mb-3">
                  {/* Cooldown */}
                  <div className="flex items-center gap-1 text-blue-400">
                  <Clock className="w-4 h-4" />
                  <span>{spell.cooldownBurn}s</span>
                  </div>
                  
                  {/* Coût */}
                  <div className="flex items-center gap-1 text-purple-400">
                  <Coins className="w-4 h-4" />
                  <span>{formatCost(spell)}</span>
                  </div>
                  
                  {/* Portée si pertinente */}
                  {spell.range && (
                    
                  <div className="flex items-center gap-1 text-green-400">
                  <RulerDimensionLine className="w-4 h-4" />
                   <span>{spell.rangeBurn}</span>
                  </div>
                  )}
                </div>

                <p
                  className="text-lol-gray-light text-sm md:text-lg leading-relaxed"
                >
                  {cleanTooltip(spell.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
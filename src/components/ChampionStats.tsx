import { ChampionStats as StatsType } from '@/types/champion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Sword, Zap, Activity, RulerDimensionLine } from 'lucide-react';

interface ChampionStatsProps {
  stats: StatsType;
}

export function ChampionStats({ stats }: ChampionStatsProps) {
  const statItems = [
    {
      icon: Heart,
      label: 'Points de vie',
      value: Math.round(stats.hp),
      perLevel: `+${stats.hpperlevel}/niveau`,
      color: 'text-red-400'
    },
    {
      icon: Zap,
      label: stats.mp > 0 ? 'Mana' : 'Ressource',
      value: Math.round(stats.mp),
      perLevel: stats.mpperlevel > 0 ? `+${stats.mpperlevel}/niveau` : '',
      color: 'text-blue-400'
    },
    {
      icon: Sword,
      label: 'Dégâts d\'attaque',
      value: Math.round(stats.attackdamage),
      perLevel: `+${stats.attackdamageperlevel}/niveau`,
      color: 'text-orange-400'
    },
    {
      icon: Shield,
      label: 'Armure',
      value: Math.round(stats.armor),
      perLevel: `+${stats.armorperlevel}/niveau`,
      color: 'text-yellow-400'
    },
    {
      icon: Activity,
      label: 'Résistance magique',
      value: Math.round(stats.spellblock),
      perLevel: `+${stats.spellblockperlevel}/niveau`,
      color: 'text-purple-400'
    },
    {
      icon: RulerDimensionLine,
      label: 'Portée d\'attaque',
      value: Math.round(stats.attackrange),
      perLevel: '',
      color: 'text-green-400'
    }
  ];

  const secondaryStats = [
    {
      label: 'Vitesse de déplacement',
      value: Math.round(stats.movespeed)
    },
    {
      label: 'Vitesse d\'attaque',
      value: `${stats.attackspeed.toFixed(3)} (+${stats.attackspeedperlevel}%/niveau)`
    },
    {
      label: 'Régénération PV',
      value: `${stats.hpregen.toFixed(1)} (+${stats.hpregenperlevel}/niveau)`
    },
    ...(stats.mpregen > 0 ? [{
      label: 'Régénération Mana',
      value: `${stats.mpregen.toFixed(1)} (+${stats.mpregenperlevel}/niveau)`
    }] : []),
    {
      label: 'Chance de critique',
      value: `${stats.crit}% (+${stats.critperlevel}%/niveau)`
    }
  ];

  return (
    <Card className="bg-lol-blue-dark/80 border-lol-gold/30">
      <CardHeader>
        <CardTitle className="text-lol-gold flex items-center gap-2 text-lg md:text-xl">
          <Activity className="w-6 h-6 md:w-7 md:h-7" />
          Statistiques de base
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats principales */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <Icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color}`} />
                <div>
                  <div className="text-white font-semibold text-lg md:text-xl">{stat.value}</div>
                  <div className="text-lol-gray-light text-sm md:text-base">{stat.label}</div>
                  {stat.perLevel && (
                    <div className="text-lol-gold-light text-xs md:text-sm">{stat.perLevel}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats secondaires */}
        <div className="border-t border-lol-gold/20 pt-4">
          <h4 className="text-lol-gold-light font-semibold mb-3 text-base md:text-lg">Statistiques détaillées</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {secondaryStats.map((stat, index) => (
              <div key={index} className="text-sm md:text-base">
                <span className="text-lol-gray-light">{stat.label} : </span>
                <span className="text-white font-medium">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
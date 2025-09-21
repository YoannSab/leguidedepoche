import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Champion, DetailedChampion, getChampionIconUrl } from '@/types/champion';
import { championService } from '@/services/championService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChampionStats } from '@/components/ChampionStats';
import { ChampionSpells } from '@/components/ChampionSpells';
import { ItemIcon } from '@/components/ItemIcon';
import { TipsTextWithItems } from '@/components/TipsTextWithItems';
import { StickyVideo } from '@/components/StickyVideo';
import { ArrowLeft, Star, Shield, Sword, Target, BookOpen } from 'lucide-react';
import tips from '@/data/tips';
import { RuneIcon } from '@/components/RuneIcon';

export function ChampionDetail() {
  const { championId } = useParams<{ championId: string }>();
  const [champion, setChampion] = useState<Champion | null>(null);
  const [detailedChampion, setDetailedChampion] = useState<DetailedChampion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChampion = async () => {
      if (!championId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Charger les données de base du champion
        const basicData = await championService.getChampionById(championId);
        if (basicData) {
          setChampion(basicData);
        }
        
        // Charger les données détaillées (stats + sorts)
        try {
          const detailedData = await championService.getDetailedChampionById(championId);
          if (detailedData) {
            setDetailedChampion(detailedData);
          }
        } catch (detailError) {
          console.warn('Impossible de charger les détails du champion:', detailError);
          // On continue avec les données de base seulement
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    loadChampion();
  }, [championId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-lol-blue via-lol-blue-light to-lol-blue-dark flex items-center justify-center">
        <div className="text-lol-gold text-xl">Chargement...</div>
      </div>
    );
  }

  if (error || !champion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-lol-blue via-lol-blue-light to-lol-blue-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error || 'Champion non trouvé'}</div>
          <Link to="/">
            <Button className="bg-lol-gold hover:bg-lol-gold-dark text-lol-blue-dark">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const championTips = tips[champion.name as keyof typeof tips];
  const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;

  return (
    <div className="min-h-screen relative">
      {/* Background with splash art */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${splashUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-lol-blue/90 via-lol-blue/80 to-lol-blue-dark/95" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="outline" className="mb-6 bg-lol-blue-dark/80 border-lol-gold text-lol-gold hover:bg-lol-gold hover:text-lol-blue-dark">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>

          {/* Champion Info */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-6 mb-4">
              <img 
                src={getChampionIconUrl(champion.id)}
                alt={champion.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-lol-gold shadow-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="text-5xl md:text-7xl font-bold text-lol-gold drop-shadow-2xl">
                {champion.name}
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-lol-gold-light mb-6 drop-shadow-lg">
              {champion.title}
            </p>
            <div className="flex justify-center gap-4 mb-8">
              {champion.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-lol-blue-dark/80 border border-lol-gold/30 rounded-full text-lol-gold-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Lore Section */}
          {detailedChampion?.lore && (
            <div className="max-w-4xl mx-auto mb-12">
              <Card className="bg-lol-blue-dark/80 border-lol-gold/30">
                <CardHeader>
                  <CardTitle className="text-lol-gold flex items-center gap-2 text-lg md:text-xl">
                    <BookOpen className="w-6 h-6 md:w-7 md:h-7" />
                    Histoire de {champion.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lol-gray-light text-sm md:text-base leading-relaxed text-justify">
                    {detailedChampion.lore}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Video Section */}
          {championTips?.videoId && (
            <StickyVideo 
              videoId={championTips.videoId}
              championName={champion.name}
            />
          )}

          {/* Stats et Sorts */}
          {detailedChampion && (
            <div className="max-w-6xl mx-auto mb-12 space-y-8">
              {/* Statistiques - Sur toute la largeur */}
              <ChampionStats stats={detailedChampion.stats} />
              
              {/* Sorts - Sur toute la largeur */}
              <ChampionSpells 
                spells={detailedChampion.spells} 
                passive={detailedChampion.passive} 
              />
            </div>
          )}

          {/* Tips Sections */}
          {championTips && (
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Spécificités */}
              {championTips.specificites && (
                <Card className="bg-lol-blue-dark/80 border-lol-gold/30">
                  <CardHeader>
                    <CardTitle className="text-lol-gold flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Spécificités
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(championTips.specificites).map(([key, value]) => (
                      <div key={key}>
                        <h4 className="text-lol-gold-light font-semibold mb-2 capitalize">
                          {key.replace(/_/g, ' ')}
                        </h4>
                        <p className="text-lol-gray-light leading-relaxed">{value}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Compétences */}
              {championTips.competences && (
                <Card className="bg-lol-blue-dark/80 border-lol-gold/30">
                  <CardHeader>
                    <CardTitle className="text-lol-gold flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Compétences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {championTips.competences.priorite_up && (
                      <div>
                        <h4 className="text-lol-gold-light font-semibold mb-2">Priorité de montée</h4>
                        <p className="text-lol-gray-light leading-relaxed">{championTips.competences.priorite_up}</p>
                      </div>
                    )}
                    {championTips.competences.remarque && (
                      <div>
                        <h4 className="text-lol-gold-light font-semibold mb-2">Remarque</h4>
                        <p className="text-lol-gray-light leading-relaxed italic">{championTips.competences.remarque}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Runes */}
              {championTips.runes && (
                <Card className="bg-lol-blue-dark/80 border-lol-gold/30">
                  <CardHeader>
                    <CardTitle className="text-lol-gold flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Runes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {championTips.runes.par_defaut && (
                      <div className='flex items-center gap-3 border-l-2 border-lol-gold/30 pl-4'>
                        <h4 className="text-lol-gold-light font-semibold">Recommandée par défaut : </h4>
                        <RuneIcon 
                          runeId={championTips.runes.par_defaut}
                          className="text-lol-gold font-medium"
                        />
                      </div>
                    )}
                    {championTips.runes.options && (
                      <div>
                        <h4 className="text-lol-gold-light font-semibold mb-3">Options</h4>
                        <div className="space-y-3">
                          {Object.entries(championTips.runes.options).map(([rune, description]) => (
                            <div key={rune} className="flex items-center gap-3 border-l-2 border-lol-gold/30 pl-4">
                                <RuneIcon 
                                  runeId={rune}
                                  size='lg'
                                  className='flex-shrink-0'
                                />
                              <TipsTextWithItems 
                                text={description}
                                className="text-lol-gray-light text-sm leading-relaxed"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Stuff */}
              {championTips.stuff && (
                <Card className="bg-lol-blue-dark/80 border-lol-gold/30">
                  <CardHeader>
                    <CardTitle className="text-lol-gold flex items-center gap-2">
                      <Sword className="w-5 h-5" />
                      Équipement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {championTips.stuff.core_items && (
                      <div>
                        <h4 className="text-lol-gold-light font-semibold mb-2">Items core</h4>
                        <div className="flex flex-wrap gap-2 md:gap-3 mb-2">
                          {championTips.stuff.core_items.map((item, index) => (
                            <ItemIcon 
                              key={index}
                              itemName={item}
                              size="lg"
                              showName={false}
                              className="bg-lol-gold/10 rounded p-1"
                            />
                          ))}
                        </div>
                        {championTips.stuff.powerspike && (
                          <TipsTextWithItems 
                            text={championTips.stuff.powerspike}
                            className="text-lol-gray-light text-sm italic"
                          />
                        )}
                      </div>
                    )}
                    
                    {championTips.stuff.variante && (
                      <div>
                        <h4 className="text-lol-gold-light font-semibold mb-2">Variante</h4>
                        <TipsTextWithItems 
                          text={championTips.stuff.variante}
                          className="text-lol-gray-light leading-relaxed"
                        />
                      </div>
                    )}

                    {championTips.stuff.options_situationnelles && (
                      <div>
                        <h4 className="text-lol-gold-light font-semibold mb-3">Options situationnelles</h4>
                        <div className="space-y-3">
                          {Object.entries(championTips.stuff.options_situationnelles).map(([item, description]) => (
                            <div key={item} className="flex items-center gap-3 border-l-2 border-lol-gold/30 pl-4">
                              <ItemIcon 
                                itemName={item}
                                size="md"
                                className="flex-shrink-0"
                              />
                              <div className="flex-1">
                                <TipsTextWithItems
                                  text={description}
                                  className="text-lol-gray-light text-sm leading-relaxed"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Si pas de tips disponibles */}
          {!championTips && (
            <div className="max-w-2xl mx-auto text-center">
              <Card className="bg-lol-blue-dark/80 border-lol-gold/30">
                <CardContent className="py-12">
                  <p className="text-lol-gray-light text-lg">
                    Les conseils et astuces pour {champion.name} arrivent bientôt !
                  </p>
                  <p className="text-lol-gray-light/80 mt-2">
                    En attendant, explorez les autres champions disponibles.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

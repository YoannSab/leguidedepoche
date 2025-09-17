import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Champion } from '@/types/champion';
import { championService } from '@/services/championService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Star, Shield, Sword, Target } from 'lucide-react';
import tips from '@/data/tips';

export function ChampionDetail() {
  const { championId } = useParams<{ championId: string }>();
  const [champion, setChampion] = useState<Champion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const loadChampion = async () => {
      if (!championId) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await championService.getChampionById(championId);
        setChampion(data);
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
            <h1 className="text-5xl md:text-7xl font-bold text-lol-gold mb-4 drop-shadow-2xl">
              {champion.name}
            </h1>
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

          {/* Video Section */}
          {championTips?.videoId && (
            <div className="max-w-md mx-auto mb-12">
              <Card className="bg-lol-blue-dark/80 border-lol-gold/30">
                <CardHeader>
                  <CardTitle className="text-lol-gold flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Guide Vidéo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${championTips.videoId}`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`Guide ${champion.name}`}
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
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
                      <div>
                        <h4 className="text-lol-gold-light font-semibold mb-2">Recommandée par défaut</h4>
                        <p className="text-lol-gold font-medium">{championTips.runes.par_defaut}</p>
                      </div>
                    )}
                    {championTips.runes.options && (
                      <div>
                        <h4 className="text-lol-gold-light font-semibold mb-3">Options situationnelles</h4>
                        <div className="space-y-3">
                          {Object.entries(championTips.runes.options).map(([rune, description]) => (
                            <div key={rune} className="border-l-2 border-lol-gold/30 pl-4">
                              <h5 className="text-lol-gold-light font-medium capitalize mb-1">
                                {rune.replace(/_/g, ' ')}
                              </h5>
                              <p className="text-lol-gray-light text-sm leading-relaxed">{description}</p>
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
                        <div className="flex flex-wrap gap-2 mb-2">
                          {championTips.stuff.core_items.map((item, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-lol-gold/20 border border-lol-gold/40 rounded text-lol-gold-light text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        {championTips.stuff.powerspike && (
                          <p className="text-lol-gray-light text-sm italic">{championTips.stuff.powerspike}</p>
                        )}
                      </div>
                    )}
                    
                    {championTips.stuff.variante && (
                      <div>
                        <h4 className="text-lol-gold-light font-semibold mb-2">Variante</h4>
                        <p className="text-lol-gray-light leading-relaxed">{championTips.stuff.variante}</p>
                      </div>
                    )}

                    {championTips.stuff.options_situationnelles && (
                      <div>
                        <h4 className="text-lol-gold-light font-semibold mb-3">Options situationnelles</h4>
                        <div className="space-y-2">
                          {Object.entries(championTips.stuff.options_situationnelles).map(([item, description]) => (
                            <div key={item} className="border-l-2 border-lol-gold/30 pl-4">
                              <h5 className="text-lol-gold-light font-medium capitalize mb-1">
                                {item.replace(/_/g, ' ')}
                              </h5>
                              <p className="text-lol-gray-light text-sm leading-relaxed">{description}</p>
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

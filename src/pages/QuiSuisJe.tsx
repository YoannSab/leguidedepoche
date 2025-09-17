import { ExternalLink, Trophy, Gamepad2, Tv } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import bibouImage from '@/assets/bibou_lol.jpg';

export function QuiSuisJe() {
  const links = [
    {
      name: 'LoL Fandom Wiki',
      url: 'https://lol.fandom.com/wiki/Bibou',
      icon: Trophy,
      description: 'Mon profil sur LoL Fandom'
    },
    {
      name: 'Twitch',
      url: 'https://www.twitch.tv/bibou_lol',
      icon: Tv,
      description: 'Mes streams en direct'
    },
    {
      name: 'Twitter/X',
      url: 'https://x.com/Bibou_euw',
      icon: ExternalLink,
      description: 'Suivez-moi sur X'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-lol-blue via-lol-blue-light to-lol-blue-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-lol-gold mb-4">
              Qui suis-je ?
            </h1>
            <p className="text-xl text-lol-gray-light">
              Découvrez qui se cache derrière Le Guide de Poche
            </p>
          </div>

          {/* Contenu principal */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Photo */}
            <div className="text-center">
              <img
                src={bibouImage}
                alt="Bibou"
                className="w-80 h-80 object-cover rounded-full mx-auto shadow-2xl border-4 border-lol-gold"
              />
            </div>

            {/* Informations */}
            <div className="space-y-6">
              <Card className="bg-lol-blue-dark/50 border-lol-gold/20">
                <CardHeader>
                  <CardTitle className="text-lol-gold flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Bibou
                  </CardTitle>
                  <CardDescription className="text-lol-gray-light">
                    Joueur professionnel et streamer League of Legends
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-lol-gray-light space-y-4">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-lol-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lol-gold">Challenger ADC</p>
                      <p className="text-sm">Rang le plus élevé de League of Legends</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Gamepad2 className="w-5 h-5 text-lol-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lol-gold">3 ans en professionnel</p>
                      <p className="text-sm">Expérience en équipe professionnelle</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Tv className="w-5 h-5 text-lol-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lol-gold">Streamer LoL</p>
                      <p className="text-sm">Partage de l'expertise et du divertissement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* À propos */}
          <Card className="bg-lol-blue-dark/50 border-lol-gold/20 mb-12">
            <CardHeader>
              <CardTitle className="text-lol-gold">À propos</CardTitle>
            </CardHeader>
            <CardContent className="text-lol-gray-light">
              <p className="leading-relaxed mb-4">
                Salut ! Je suis Bibou, un joueur passionné de League of Legends avec une expérience 
                de 3 ans en tant que joueur professionnel. Spécialisé dans le rôle ADC (Attack Damage Carry), 
                j'ai atteint le rang Challenger, le plus haut niveau du jeu.
              </p>
              <p className="leading-relaxed mb-4">
                Après ma carrière professionnelle, je me consacre maintenant au streaming et au partage 
                de mes connaissances avec la communauté. Le Guide de Poche est né de ma volonté d'aider 
                les joueurs à mieux comprendre les champions et à améliorer leur gameplay.
              </p>
              <p className="leading-relaxed">
                Que vous soyez débutant ou joueur expérimenté, j'espère que ce guide vous aidera 
                à progresser et à prendre encore plus de plaisir dans vos parties !
              </p>
            </CardContent>
          </Card>

          {/* Liens */}
          <div className="grid md:grid-cols-3 gap-6">
            {links.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Card key={index} className="bg-lol-blue-dark/50 border-lol-gold/20 hover:border-lol-gold/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lol-gold flex items-center gap-2 text-lg">
                      <IconComponent className="w-5 h-5" />
                      {link.name}
                    </CardTitle>
                    <CardDescription className="text-lol-gray-light">
                      {link.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      asChild 
                      className="w-full bg-lol-gold hover:bg-lol-gold/80 text-lol-blue-dark font-semibold"
                    >
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Visiter
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import { ExternalLink, Trophy } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTiktok, FaTwitch, FaTwitter, FaDiscord } from "react-icons/fa";
import { SiLeagueoflegends } from "react-icons/si";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import bibouImage from '@/assets/bibou_lol.jpg';

export function QuiSuisJe() {
  const links = [
    {
      name: 'Twitch',
      url: 'https://www.twitch.tv/bibou_lol',
      icon: FaTwitch,
      description: 'Mes streams en direct'
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/tNYtajvWQU',
      icon: FaDiscord,
      description: 'Rejoignez la communauté'
    },
    {
      name: 'Twitter/X',
      url: 'https://x.com/Bibou_euw',
      icon: FaTwitter,
      description: 'Suivez-moi sur X'
    },
    {
      name: 'Tiktok',
      url: 'https://www.tiktok.com/@bibou_lol',
      icon: FaTiktok,
      description: 'Mes shorts'
    }, 
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UChVkro0nlEK2_DtJdGq19yw',
      icon: FaYoutube,
      description: 'Mes vidéos et guides'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/bibou_lol1/',
      icon: FaInstagram,
      description: 'Mes shorts'
    },
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
                  <CardTitle className="text-lol-gold flex items-center gap-2 text-2xl">
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
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <SiLeagueoflegends className="w-5 h-5 text-lol-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lol-gold">3 ans en professionnel</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FaTwitch className="w-5 h-5 text-lol-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lol-gold">Streamer LoL</p>
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
                J'ai 23 ans, j'ai fait mes études à l'ESSEC et l'emlyon et je tente de devenir streamer fulltime.
                J'ai été joueur pro 3 ans, après avoir gagné le MNT et les UP&DOWN pour la div 2 j'y ai joué 1 an. Après j'ai fait 1 split de division 1 d'AL et maintenant je stream après le travail !
                Peak à 1350 LP, main Kai'sa, Smolder et Aphelios.
              </p>
              <p className="leading-relaxed mb-4">
                Le Guide de Poche est né de ma volonté d'aider les joueurs à mieux comprendre les champions et à améliorer leur gameplay. Que vous soyez débutant ou joueur expérimenté, j'espère que ce guide vous aidera à progresser !
                à progresser !
              </p>
              <p className="leading-relaxed">
                
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

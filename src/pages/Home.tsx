import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Champion, ChampionData } from '@/types/champion';
import { championService } from '@/services/championService';
import { ChampionGrid } from '@/components/ChampionGrid';
import logoLgdp from '@/assets/logo_lgdp.png';

export function Home() {
    const navigate = useNavigate();
    const [champions, setChampions] = useState<Champion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Liste des champions à afficher (ADC + exceptions)
    const allowedChampions = [
        // ADCs classiques
        'Aphelios', 'Ashe', 'Caitlyn', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 
        'Kai\'Sa', 'Kalista', 'Kog\'Maw', 'Lucian', 'Miss Fortune', 'Samira', 
        'Sivir', 'Senna', 'Tristana', 'Twitch', 'Varus', 'Vayne', 'Xayah', 'Zeri',
        'Corki', 'Graves', 'Kindred', 'Quinn',
        'Yasuo', 'Ziggs', 'Seraphine', 'Yunara'
    ];

    // Chargement initial des champions
    useEffect(() => {
        const loadChampions = async () => {
            try {
                setLoading(true);
                setError(null);

                const data: ChampionData = await championService.getChampions();
                const championList = Object.values(data.data);

                // Filtrer pour ne garder que les champions autorisés
                const filteredList = championList.filter(champion => 
                    allowedChampions.includes(champion.name)
                );

                // Tri par nom
                filteredList.sort((a, b) => a.name.localeCompare(b.name));

                setChampions(filteredList);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };

        loadChampions();
    }, []);

    // Gestion du clic sur un champion
    const handleChampionClick = (champion: Champion) => {
        navigate(`/champion/${champion.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-lol-blue via-lol-blue-light to-lol-blue-dark">
            <div className="relative container mx-auto px-4 py-16 text-center">
                {/* Logo */}
                <div className="mb-8">
                    <img
                        src={logoLgdp}
                        alt="Le Guide de Poche - Logo"
                        className="max-h-100 mx-auto drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                    />
                </div>

                {/* Sous-titre */}
                <p className="text-lg sm:text-xl md:text-2xl text-lol-gray-light mb-4 mx-auto">
                    Votre compagnon ultime pour maîtriser les ADC de League of Legends
                </p>
            </div>

            {/* Section principale avec la grille des champions */}
            <div className="container mx-auto px-10 pb-16 bg-blue">
                <ChampionGrid
                    champions={champions}
                    loading={loading}
                    error={error || undefined}
                    onChampionClick={handleChampionClick}
                />
            </div>

            {/* Footer */}
            <footer className="bg-lol-blue-dark border-t border-lol-gold/20 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-lol-gray-light text-sm mt-2">
                        Créé avec ❤️ par <span className="font-semibold text-lol-gold"><a href="https://paroldle.com">Yoann</a></span> pour <span className="font-semibold text-lol-gold"><a href="https://twitch.tv/bibou_lol">Bibou</a></span>
                    </p>
                </div>
            </footer>
        </div>
    );
}

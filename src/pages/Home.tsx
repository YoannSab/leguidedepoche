import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Champion, ChampionData } from '@/types/champion';
import { championService } from '@/services/championService';
import { SearchBar } from '@/components/SearchBar';
import { ChampionGrid } from '@/components/ChampionGrid';
import logoLgdp from '@/assets/logo_lgdp.png';

export function Home() {
    const navigate = useNavigate();
    const [champions, setChampions] = useState<Champion[]>([]);
    const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Chargement initial des champions
    useEffect(() => {
        const loadChampions = async () => {
            try {
                setLoading(true);
                setError(null);

                const data: ChampionData = await championService.getChampions();
                const championList = Object.values(data.data);

                // Tri par nom
                championList.sort((a, b) => a.name.localeCompare(b.name));

                setChampions(championList);
                setFilteredChampions(championList);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };

        loadChampions();
    }, []);

    // Fonction de recherche avec debounce
    const handleSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            setFilteredChampions(champions);
            return;
        }

        try {
            const searchResults = await championService.searchChampions(query);
            const championList = Object.values(searchResults.data);
            championList.sort((a, b) => a.name.localeCompare(b.name));
            setFilteredChampions(championList);
        } catch (err) {
            console.error('Erreur lors de la recherche:', err);
            // En cas d'erreur, on filtre localement
            const filtered = champions.filter(champion =>
                champion.name.toLowerCase().includes(query.toLowerCase()) ||
                champion.title.toLowerCase().includes(query.toLowerCase()) ||
                champion.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredChampions(filtered);
        }
    }, [champions]);

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
                    Votre compagnon ultime pour maîtriser tous les champions de League of Legends
                </p>

                {/* Barre de recherche */}
                <div className="">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Rechercher un champion par nom, titre ou rôle..."
                    />
                </div>
            </div>

            {/* Section principale avec la grille des champions */}
            <div className="container mx-auto px-10 pb-16 bg-blue">
                <ChampionGrid
                    champions={filteredChampions}
                    loading={loading}
                    error={error || undefined}
                    onChampionClick={handleChampionClick}
                />
            </div>

            {/* Footer */}
            <footer className="bg-lol-blue-dark border-t border-lol-gold/20 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-lol-gray-light text-sm mt-2">
                        Créé avec ❤️ par <span className="font-semibold text-lol-gold">Yoann</span> pour <span className="font-semibold text-lol-gold"><a href="https://twitch.tv/bibou_lol">Bibou</a></span>
                    </p>
                </div>
            </footer>
        </div>
    );
}

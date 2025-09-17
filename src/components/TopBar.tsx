import { Link, useLocation } from 'react-router-dom';
import logoSmall from '@/assets/logo_lgdp_small.png';

export function TopBar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-lol-blue-dark border-b border-lol-gold sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
                src={logoSmall} 
                alt="Le Guide de Poche" 
                className="h-15 w-auto rounded-full border-2 border-lol-gold"
            />
            <span className="text-lol-gold font-bold text-lg hidden sm:block">
                Le Guide de Poche
            </span>
        </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-lol-gold bg-lol-gold/10'
                  : 'text-lol-gray-light hover:text-lol-gold hover:bg-lol-gold/5'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/qui-suis-je"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/qui-suis-je')
                  ? 'text-lol-gold bg-lol-gold/10'
                  : 'text-lol-gray-light hover:text-lol-gold hover:bg-lol-gold/5'
              }`}
            >
              Qui suis-je ?
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

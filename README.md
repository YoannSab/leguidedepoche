# Le Guide De Poche 📱

![Logo Le Guide De Poche](src/assets/logo_lgdp.png)

**Le Guide De Poche** est une application web dédiée aux joueurs de League of Legends qui souhaitent améliorer leur gameplay en tant qu'ADC (Attack Damage Carry). Cette plateforme propose des guides détaillés, des conseils stratégiques et des builds optimisés pour chaque champion ADC.

🌐 **Site web** : [leguidedepoche.fr](https://leguidedepoche.fr)

## ✨ Fonctionnalités

### 🏆 Guides Champions ADC
- **Base de données complète** : Plus de 25 champions ADC disponibles
- **Guides détaillés** : Compétences, runes, builds et conseils spécifiques
- **Vidéos intégrées** : Tutoriels vidéo pour chaque champion
- **Interface intuitive** : Navigation simple et design moderne

### 📊 Informations Champion
- **Statistiques détaillées** : HP, mana, armure, résistance magique, etc.
- **Sorts de champion** : Description complète des compétences (Passif, Q, W, E, R)
- **Conseils personnalisés** : Stratégies spécifiques selon les situations de jeu
- **Builds recommandés** : Items core et options situationnelles

### 🔍 Recherche et Navigation
- **Barre de recherche** : Trouvez rapidement votre champion
- **Grille de champions** : Vue d'ensemble avec icônes
- **Navigation fluide** : Routage optimisé avec React Router

## 🛠️ Technologies Utilisées

### Frontend
- **React 19** - Bibliothèque JavaScript pour l'interface utilisateur
- **TypeScript** - Typage statique pour plus de robustesse
- **Vite** - Outil de build rapide et moderne
- **React Router DOM** - Gestion du routage côté client

### Styling & UI
- **Tailwind CSS 4** - Framework CSS utilitaire
- **Radix UI** - Composants UI accessibles et personnalisables
- **Lucide React** - Icônes SVG légères et modernes
- **class-variance-authority** - Gestion des variantes de composants

### Outils de Développement
- **ESLint** - Linter pour maintenir la qualité du code
- **gh-pages** - Déploiement automatisé sur GitHub Pages

## 🚀 Installation et Développement

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/YoannSab/leguidedepoche.git

# Naviguer dans le dossier
cd leguidedepoche

# Installer les dépendances
npm install
```

### Développement
```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:5173 dans votre navigateur
```

### Build et Déploiement
```bash
# Créer un build de production
npm run build

# Prévisualiser le build
npm run preview

# Déployer sur GitHub Pages
npm run deploy
```

## 📁 Structure du Projet

```
leguidedepoche/
├── public/                 # Fichiers statiques
├── src/
│   ├── assets/            # Images et ressources
│   ├── components/        # Composants React réutilisables
│   │   ├── ui/           # Composants UI de base
│   │   ├── ChampionCard.tsx
│   │   ├── ChampionGrid.tsx
│   │   ├── SearchBar.tsx
│   │   └── ...
│   ├── data/             # Données statiques
│   │   ├── champions.ts  # Liste des champions
│   │   └── tips.ts       # Conseils et builds
│   ├── lib/              # Utilitaires
│   ├── pages/            # Pages de l'application
│   │   ├── Home.tsx      # Page d'accueil
│   │   ├── ChampionDetail.tsx
│   │   └── QuiSuisJe.tsx
│   ├── services/         # Services API
│   ├── types/            # Définitions TypeScript
│   └── App.tsx           # Composant principal
├── package.json
└── README.md
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche feature (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📜 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Créé un build de production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Exécute ESLint pour vérifier la qualité du code |
| `npm run deploy` | Déploie l'application sur GitHub Pages |

## 🐛 Signaler un Bug

Si vous trouvez un bug ou avez une suggestion d'amélioration, n'hésitez pas à :
- Ouvrir une issue sur GitHub
- Contacter l'équipe via le site web


## 🎯 Roadmap

- [ ] Mode sombre
- [ ] Version mobile optimisée
- [ ] Intégration API Riot Games
- [ ] Statistiques de match en temps réel

---

# Portfolio SysAdmin - Adam Canva

Ce projet est un portfolio moderne pour Administrateur Système, construit avec HTML, CSS, JavaScript et **Vite**.

## Prérequis

- **Node.js** (version 18 ou supérieure recommandée)
- **npm** (inclus avec Node.js)

## Installation

Installez les dépendances du projet :

```bash
npm install
```

## Initialisation du Dépôt

Pour versionner ce projet avec Git et l'envoyer sur GitHub :

```bash
# 1. Initialiser git
git init

# 2. Ajouter les fichiers
git add .

# 3. Premier commit
git commit -m "Initial commit"

# 4. Lier à votre dépôt GitHub (remplacez l'URL)
git remote add origin https://github.com/VOTRE_USER/VOTRE_REPO.git

# 5. Envoyer sur GitHub
git push -u origin main
```

## Développement Local

Pour lancer le serveur de développement avec rechargement automatique :

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`.

## Construction (Build) pour la Production

Pour générer la version optimisée pour le déploiement :

```bash
npm run build
```

Cette commande va créer un dossier `dist/` à la racine du projet.

## Déploiement

Le contenu du dossier `dist/` est **statique** et prêt à être hébergé sur n'importe quel serveur web (Nginx, Apache, Caddy, GitHub Pages, Vercel, etc.).

### Exemple avec Nginx / Apache

1. Lancez le build : `npm run build`
2. Copiez le **contenu** du dossier `dist/` vers le dossier racine de votre serveur web (ex: `/var/www/html`).

```bash
# Exemple de copie (si vous avez un accès SSH)
scp -r dist/* user@votre-serveur:/var/www/html/
```

### Structure du dossier `dist/`

```
dist/
├── assets/         # Fichiers CSS et JS minifiés et hashés
├── index.html      # Point d'entrée (Version Anglaise)
└── index_fr.html   # Version Française
```

## Personnalisation

- **Contenu** : Modifiez les fichiers dans `src/content/en.js` et `src/content/fr.js`.
- **Styles** : Modifiez `src/style.css`.
- **Logique** : Modifiez `src/main.js`.

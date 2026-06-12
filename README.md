# Assistant EPS — Situations d'apprentissage

Chatbot pédagogique pour enseignants d'**Éducation Physique et Sportive (EPS)** au cycle collégial marocain. Il génère des **situations d'apprentissage** structurées pour les **sports collectifs**, conformes aux **Orientations Pédagogiques 2009 (OP 2009)**.

## Fonctionnalités

- Interface de chat simple (messages + saisie en bas)
- Réponses en **français**, streamées en temps réel (effet machine à écrire)
- Génération structurée : Objectif, But, Conditions de réalisation, Critères de réussite, Critères de réalisation, PB/NPB/DEF, Consignes
- Historique de conversation maintenu à chaque requête
- Questions générales sur la pédagogie EPS
- Design minimal, accent bleu (`#2563eb`)

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 14 (App Router) |
| Langage | TypeScript |
| Styles | Tailwind CSS + `@tailwindcss/typography` |
| IA | Anthropic API — `claude-sonnet-4-6` |
| Markdown | `react-markdown` + `remark-gfm` |
| Streaming | SSE via `ReadableStream` |

## Structure du projet

```
app/
  page.tsx              # Interface chat principale
  layout.tsx            # Métadonnées et layout
  api/chat/route.ts     # Route API streaming Anthropic
components/
  ChatMessage.tsx       # Bulles utilisateur / cartes IA (markdown)
  ChatInput.tsx         # Champ de saisie fixe en bas
lib/
  systemPrompt.ts       # Prompt système EPS (OP 2009)
  types.ts              # Types TypeScript
  errors.ts             # Messages d'erreur en français
```

## Installation

```bash
npm install
```

## Configuration

Créez un fichier `.env` ou `.env.local` à la racine :

```env
ANTHROPIC_API_KEY=votre_clé_api
ANTHROPIC_MODEL=claude-sonnet-4-6
```

> Ne commitez jamais vos clés API. Le fichier `.env` est ignoré par git.

## Lancement

```bash
# Développement
npm run dev

# Production
npm run build
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Utilisation

1. Lisez le message de bienvenue au chargement
2. Décrivez la situation souhaitée, par exemple :
   - *« Donne-moi une situation d'apprentissage en basketball pour la 2ème AC »*
   - *« Situation en handball pour travailler le marquage-démarquage »*
   - *« Qu'est-ce qu'un PB et un NPB en EPS ? »*
3. La réponse s'affiche en streaming, formatée en markdown
4. Cliquez sur **Nouvelle conversation** pour recommencer

## Format de réponse généré

Chaque situation d'apprentissage contient :

| Section | Contenu |
|---------|---------|
| **Objectif** | Verbe d'action + condition + finalité + critère de réussite |
| **But** | Formulation simple pour l'élève (12–15 ans) |
| **Conditions de réalisation** | Temps, espace, effectif, rôles, déroulement |
| **Critères de réussite** | Quantitatifs et qualitatifs |
| **Critères de réalisation** | Description technique du geste attendu |
| **PB / NPB / DEF** | Porteur de balle, Non porteur, Défenseur |
| **Consignes** | Organisation et sécurité |

## Fonctionnement technique

```
Enseignant → saisie message
     ↓
POST /api/chat (historique complet)
     ↓
Anthropic Claude + systemPrompt (OP 2009)
     ↓
SSE streaming → affichage markdown live
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm start` | Lancer le build de production |
| `npm run lint` | Vérification ESLint |

## Public cible

- Enseignants d'EPS du collège marocain
- Stagiaires et formateurs en EPS
- Coordinateurs pédagogiques

## Licence

Projet privé — usage pédagogique.

# Home Fitness — version avec section Visite

Site vitrine en français pour Home Fitness à Dakar. Projet statique en HTML, CSS et JavaScript, avec les photos et les polices incluses dans l’archive.

## Démarrage sur Ubuntu / Linux / macOS

1. Décompressez `Home_Fitness_V2_Avec_Visite.zip`.
2. Ouvrez un terminal dans le dossier `home-fitness-avec-visite`.
3. Lancez le serveur local avec Python 3 :

```bash
python3 -m http.server 8001 --bind 127.0.0.1
```

4. Ouvrez <http://localhost:8001/#visite> pour accéder directement à la nouvelle section.

Le menu en haut de la page contient le lien **La visite**. La section se trouve entre **Nos coachs** et **Nos salles**. Elle contient sept photos.

Décompressez cette archive dans son propre dossier, sans fusionner avec votre ancien dossier `home-fitness`. Lancez le serveur depuis `home-fitness-avec-visite`. Si vous voyez encore une ancienne page, vérifiez que l’adresse commence par `http://localhost:8001/`.

Pour arrêter le serveur, utilisez **Ctrl+C** dans le terminal. Si le port 8001 est déjà utilisé, choisissez par exemple 8002 dans la commande et dans l’adresse du navigateur.

Vous pouvez aussi exécuter `bash demarrer.sh` depuis le dossier du projet.

## Démarrage sur Windows

Depuis le dossier `home-fitness-avec-visite`, avec Python 3 installé :

```powershell
py -m http.server 8001 --bind 127.0.0.1
```

Ouvrez ensuite <http://localhost:8001>.

## Modifier le site

Ouvrez le dossier `home-fitness-avec-visite` dans VS Code ou votre éditeur, puis actualisez le navigateur après vos modifications.

| Fichier | Contenu |
| --- | --- |
| `index.html` | Sections, textes, coordonnées, horaires et liens de contact |
| `styles.css` | Mise en page, couleurs, responsive et animations |
| `app.js` | Menu mobile, sélection des salles, statut d’ouverture et animations au défilement |
| `gallery.css` | Mise en page de la section de visite et de la galerie photo |
| `gallery.js` | Visionneuse photo : clavier, balayage tactile, fermeture et retour du focus |
| `fonts.css` | Déclaration des polices locales |
| `assets/` | Photos optimisées au format WebP et fichiers de polices |
| `vercel.json` | Configuration du déploiement statique sur Vercel |

Ce projet s’exécute directement, sans compilation ni installation de dépendances npm.

## Visite des salles en images

La section **Visitez nos salles** présente sept photos : six nouveaux instantanés et une photo de l’équipement déjà fournie. Elle comporte une visionneuse accessible au clavier, des commandes précédent/suivant, le balayage tactile et des boutons WhatsApp pour organiser une visite à chacune des deux adresses.

Les photos sont regroupées dans une galerie commune. Leur répartition entre Ouakam Comico et le Monument de la Renaissance reste à confirmer. Plusieurs fichiers fournis ne mesurent que 141 pixels de large ; ils sont affichés dans des formats compacts. Remplacez-les par leurs originaux pour améliorer la qualité de la visite en grand format.

L’affiche mentionnant « OPEN 24/7 » n’est pas utilisée, car les horaires communiqués pour le site sont 06:00–23:30.

Les éléments portant `data-gallery-item` dans `index.html` définissent les photos et les légendes. Conservez une description dans `alt` et mettez à jour les attributs `width` et `height` si vous remplacez une photo.

## Informations pratiques

- Les services sont présentés dans quatre rubriques : coaching personnel, remise en forme, bien-être et ateliers.
- Les boutons de contact ouvrent WhatsApp, l’application téléphone ou le logiciel de messagerie. Ils n’envoient pas de message automatiquement.
- Les cartes indiquent les quartiers **Ouakam Comico** et **Monument de la Renaissance**. Les points GPS exacts des salles restent à confirmer avec l’équipe.
- Les horaires sont **06:00–23:30, tous les jours**. Le statut ouvert/fermé utilise le fuseau `Africa/Dakar`.
- Les photos et les polices sont disponibles localement. Les cartes Google Maps et WhatsApp nécessitent une connexion Internet.

## Coordonnées intégrées

- **Téléphone :** +221 77 716 78 16
- **E-mail :** Homefitnes243@gmail.com

## Déployer sur Vercel

Le fichier `vercel.json` configure le projet pour servir directement les fichiers HTML, CSS, JavaScript et les images.

### Depuis le terminal

Avec Node.js et npm installés, ouvrez un terminal dans le dossier `home-fitness-avec-visite`, puis lancez :

```bash
npx vercel login
npx vercel --prod
```

La première commande permet de connecter votre compte Vercel. La seconde lance le déploiement et vous invite à choisir votre compte ou équipe et à créer ou sélectionner le projet. Si vous créez un nouveau projet, vous pouvez le nommer `home-fitness-dakar`. Le dossier à déployer est `.` lorsque votre terminal est déjà dans `home-fitness-avec-visite`.

Utilisez les réglages ci-dessous si Vercel vous demande de les confirmer. Après un déploiement réussi, Vercel affiche l’URL du site. Pour publier vos futures modifications depuis le même dossier, relancez `npx vercel --prod`.

### Depuis un dépôt GitHub

1. Placez les fichiers du projet dans un dépôt GitHub.
2. Sur [Vercel](https://vercel.com/new), importez ce dépôt.
3. Choisissez le dossier contenant `index.html` et `vercel.json` comme **Root Directory**.
4. Vérifiez les réglages, puis cliquez sur **Deploy**.

| Réglage Vercel | Valeur pour ce projet |
| --- | --- |
| Framework Preset | `Other` |
| Root Directory | Dossier contenant `index.html` et `vercel.json` ; racine si les fichiers y sont placés |
| Build Command | Vide — étape de compilation désactivée |
| Output Directory | `.` |

Le fichier `vercel.json` définit déjà le framework, la commande de compilation vide et le dossier de sortie. Les coordonnées GPS précises des salles pourront être complétées plus tard.

Documentation officielle : [configuration des projets statiques](https://vercel.com/docs/builds/configure-a-build), [vercel.json](https://vercel.com/docs/project-configuration/vercel-json), [connexion](https://vercel.com/docs/cli/login) et [déploiement CLI](https://vercel.com/docs/cli/deploy).

## Autre hébergement statique

Pour utiliser un hébergement statique, placez `index.html`, `styles.css`, `app.js`, `fonts.css` et le dossier `assets/` à la racine du dossier public. Conservez les chemins relatifs entre ces fichiers.

Les modifications faites dans cette copie locale pourront être publiées sur l’hébergement de votre choix.
# homr-fitness

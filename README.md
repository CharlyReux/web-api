# Project-JXT_REUX_THOMAS

## Contexte
Ce projet est un projet d'un cours nommé JXT-Webserver Engineering.
Le but étais de créer une API selon une spécification donnée.


## Telecharger et lancer l'API

D'abord, commencer par récupérer le projet
```
git clone https://gitlab.com/charlyreux/web-api.git
```


Après s'être placé dans le dossier fr-administration, demarrez la base de données avec:<br>
`sqlite3 mydatabase.db`

Ensuite, lancer l'API avec:<br>
`npm run start`

L'API est désormais accessible et peut être testées soit avec des commandes curl comme par exemple:<br>
`curl http://localhost:3000/users`

Ou alors directement avec Swagger sur en accedant à:<br> 
http://localhost:3000/api

# Project-JXT_REUX_THOMAS


## Telecharger et lancer l'API

D'abord, commencer par récupérer le projet
```
cd existing_repo
git clone https://gitlab.istic.univ-rennes1.fr/creux/project-jxt_reux_thomas.git
```


Après s'être placé dans le dossier fr-administration, demarrez la base de données avec:<br>
`sqlite3 mydatabase.db`

Ensuite, lancer l'API avec:<br>
`npm run start`

L'API est désormais accessible et peut être testées soit avec des commandes curl comme par exemple:<br>
`curl http://localhost:3000/users`

Ou alors directement avec Swagger sur en accedant à:<br> 
http://localhost:3000/api

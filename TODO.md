Refactor fetch to do backend stuff after using res.send to send normalized data - started

Redo tables to have proper associations

Redo fetch to store new data in the db and updated revisionDate for each player - started

Update summoner data in db =>
  Check if match is already in db {
    if (true) skip
    else add data
  }

___________________________________________________

Redo fetch to check database first

Redo fetch to retrieve data for each participant in the background(after returning relevant player's data) - started

Test faster implementation of promise.all:

  External raw match-list
  New promise.all for normalizing data after getting raw match-list

Redo return of fetch to also calculate top trending data

***
Add trait seeders to db
***
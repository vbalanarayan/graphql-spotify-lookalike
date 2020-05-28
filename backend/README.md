GraphQL implementation of Song Library
======================================

To install and start the graphql server (Tested with node v13.12, npm v6.14):

```bash
npm install
npm start

```
API
-------------------------------

GraphQL API is served at http://localhost:8888/graphql.

Port can be changed as needed.


GraphQL API supports the following functionalities

Queries:
---------

---------
getLibrary

Gets the song list from the entire library

-------------
getOneFromLibrary(id)

Expects song ID as input. Returns a single song matching the id

---------------
getPlaylist

Gets a list of Playlists created

---------------
getPlaylistFromId(id)

Expects playlist ID as input. Returns a single playlist matching the id 

----------------
getSongsFromSearch(searchTerm)

Expects a string searchTerm as input. Returns a list of songs from the library matching the searchTerm in the song title, album and artist


Mutations:
----------

-----------
createPlaylist(Playlist)

Expects a Playlist as input(name, song list as an array of integers). Creates a new playlist and returns the playlist ID

-------------
updatePlaylist(Playlist)
Expects a Playlist as input(id, name, song list as an array of integers). Updates the playlist matching the ID and returns the playlist ID

------------
deletePlaylist(id)
Expects a Playlist id as inputs and returns a string message if the playlist is deleted or not
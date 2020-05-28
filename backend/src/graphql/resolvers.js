var Songs = require('../../lib/songs');
var path = require('path');
var library = new Songs(path.join(__dirname, '../..', 'data'));

export const resolvers = {
    Query: {
        getLibrary: () => {
            return library.getLibrary();
        },
        getOneFromLibrary: (root, { id }) => {
           return library.getSong(parseInt(id));
        },
        getPlaylist: () => {
            return new Promise((resolve, object) => {
                library.getPlaylists(function(err, playlists) {
                    if(err) reject(err)
                    else resolve(playlists);
                })
            });
        },
        getPlaylistFromId: (root, { id }) => {
           return library.getPlaylist(parseInt(id));
        },
        getSongsFromSearch: (root, { searchTerm }) => {
            return new Promise((resolve, object) => {
                library.getSongsFromSearch(searchTerm, function(err, songs) {
                    if(err) reject(err)
                    else resolve(songs);
                })
            });
        },
    },
    Mutation: {
        createPlaylist: (root, { input }) => {
            
            let name = input.name;
            let songs = input.songs;
            
            return new Promise((resolve, object) => {
                library.savePlaylist(null, name, songs, function (err, id) {
                    if (err) reject(err)
                    else resolve(id)
                })
            })
        },
        updatePlaylist: (root, { input }) => {
            
            let id = input.id;
            let name = input.name;
            let songs = input.songs;
            
            return new Promise((resolve, object) => {
                library.savePlaylist(id, name, songs, function (err, id) {
                    if (err) reject(err)
                    else resolve(id)
                })
            })
        },
        deletePlaylist: (root, { id }) => {
            return new Promise((resolve, object) => {
                if(library.deletePlaylist(id)){
                    resolve('Playlist deleted successfully!')
                } else {
                    reject('Error while deleting playlist')                    
                }
            })
        },
    }
}

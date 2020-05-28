var path = require('path');
var fs = require('fs');
var async = require('async');


var Songs = function Songs(dataPath) {
    this.dataPath = dataPath;
};

Songs.prototype._loadLibrary = function() {
    if (this._library) {
        return this._library;
    }

    var pathname = path.join(this.dataPath, "library.json");
    var input = fs.readFileSync(pathname);
    var data = JSON.parse(input);

    this._library = data;

    return this._library;
};

Songs.prototype.getLibrary = function() {
    this._loadLibrary();

    return this._library;
}

Songs.prototype.getSong = function(id) {
    this._loadLibrary();

    return this._library[id];
};

Songs.prototype.getPlaylists = function(callback) {
    var pathname = path.join(this.dataPath, "playlists");

    var files = fs.readdirSync(pathname);

    var files = files.filter(function(item) {
        return !/^\./.test(item);
    }).map(function(item) {
        return path.join(pathname, item);
    });;

    var loadPlaylist = async.compose(function(data, callback) {
        callback(null, JSON.parse(data));
    }, fs.readFile);

    async.map(files, loadPlaylist, function(err, data) {
        var data = data.sort(function(a, b) {
            if (a.id < b.id) {
                return -1;
            } else if (a.id > b.id) {
                return 1;
            } else {
                return 0;
            }
        });
        callback(null, data);
    });

    return;
};

Songs.prototype.getPlaylist = function(id) {
    var pathname = path.join(this.dataPath, "playlists", id + ".json");
    var input = fs.readFileSync(pathname);
    var data = JSON.parse(input);
    
    if(data.songs.length) {
        console.log('c1');
        this.getSongList(data.songs, function(err, songList) {
            if(err) return data;
            if(songList){
                console.log('c2');
                data.songs = songList;
                console.log(data)
                return data;
            } else {
                console.log('c3');
                console.log(songList);
            }
        });
        return data;
    } else {
        return data;   
    }
};

Songs.prototype.savePlaylist = function(id, name, songs, callback) {
    var _this = this;
    var doIt = function(id) {

        var data = {
            id: id,
            name: name,
            songs: songs
        }

        var output = JSON.stringify(data);

        var pathname = path.join(_this.dataPath, "playlists", id + ".json");
        fs.writeFileSync(pathname, output);

        callback(null, id);

    };

    if (id === null) {
        this.getPlaylists(function(err, playlists) {
            var id = 0;
            if (playlists.length > 0) {
                id = playlists[playlists.length - 1].id + 1;
            }
            doIt(id);
        });
    } else {
        doIt(id);
    }

};

Songs.prototype.deletePlaylist = function(id) {
    var pathname = path.join(this.dataPath, "playlists", id + ".json");

    fs.unlinkSync(pathname);
    return true;
};

//Newly added, get songs from a list of ids
Songs.prototype.getSongList = function(idList, callback) {
    this._loadLibrary();
    if(idList.length) {
        let result = [];
        for(let i in idList) {
            result.push(this._library[idList[i]]);
        }
        callback(false,result);
    } else {
        callback(true, null);
    }    
};

//Newly added, get songs matching a search term
Songs.prototype.getSongsFromSearch = function(searchTerm, callback) {
    let fullLibrary = this._loadLibrary();
    if(searchTerm !== '') {
        let result = [];
        for(let i in fullLibrary) {
            //Search in title, album and artist
            if(fullLibrary[i].title.toLowerCase().includes(searchTerm.toLowerCase()) || fullLibrary[i].album.toLowerCase().includes(searchTerm.toLowerCase())
                || fullLibrary[i].artist.toLowerCase().includes(searchTerm.toLowerCase())) {
                result.push(fullLibrary[i]);
            }
        }
        callback(false, result);
    } else {
        callback(true, null);
    }    
};


module.exports = Songs;
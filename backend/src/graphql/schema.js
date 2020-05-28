import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
    
    type Song {
        id: Int
        title: String
        album: String
        duration: Int
        artist: String
    }

    type Playlist {
        id: Int
        name: String
        songs: [Int]
    }

    type PlaylistSingle {
        id: Int
        name: String
        songs: [Song!]
    }

    type Query {
        getLibrary: [Song]
        getOneFromLibrary(id: Int!): Song
        getPlaylist: [Playlist]
        getPlaylistFromId(id: Int!): PlaylistSingle
        getSongsFromSearch(searchTerm: String!): [Song]
    }

    input PlaylistInput {
        id: Int
        name: String
        songs: [Int]
    }

    type Mutation {
        createPlaylist(input: PlaylistInput): Int
        updatePlaylist(input: PlaylistInput): Int
        deletePlaylist(id: ID!): String
    }
`
const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };

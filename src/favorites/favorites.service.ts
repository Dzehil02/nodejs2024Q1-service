import { Injectable } from '@nestjs/common';
import { albums, artists, favorites, tracks } from 'db-store/store';
import { addEntityToFavs } from 'src/favorites/helpers/addEntityToFavs';
import { removeEntityFromFavs } from 'src/favorites/helpers/removeEntityFromFavs';

@Injectable()
export class FavoritesService {
    findAll() {
        return favorites;
    }

    addTrack(id: string) {
        const favoritesTracks = favorites.tracks;
        const allTracks = tracks;
        return addEntityToFavs(id, allTracks, favoritesTracks);
    }

    deleteTrack(id: string) {
        const tracks = favorites.tracks;
        return removeEntityFromFavs(id, tracks);
    }

    addAlbum(id: string) {
        const favoritesAlbums = favorites.albums;
        const allAlbums = albums;
        return addEntityToFavs(id, allAlbums, favoritesAlbums);
    }

    deleteAlbum(id: string) {
        const albums = favorites.albums;
        return removeEntityFromFavs(id, albums);
    }

    addArtist(id: string) {
        const favoritesArtists = favorites.artists;
        const allArtists = artists;
        return addEntityToFavs(id, allArtists, favoritesArtists);
    }

    deleteArtist(id: string) {
        removeEntityFromFavs(id, favorites.artists);
    }

    deleteRelatedArtist(id: string) {
        favorites.artists = favorites.artists.filter((artist) => artist.id !== id);
    }

    deleteRelatedAlbum(id: string) {
        favorites.albums = favorites.albums.filter((album) => album.id !== id);
    }

    deleteRelatedTrack(id: string) {
        favorites.tracks = favorites.tracks.filter((track) => track.id !== id);
    }
}

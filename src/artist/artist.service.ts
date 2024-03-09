import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { checkModelById } from 'src/utils/modelValidators';
import { albums, artists, tracks } from 'db-store/store';
import { createPassword } from 'src/utils/createPassword';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
    constructor(private readonly favoritesService: FavoritesService) {}
    getArtist(id: string) {
        return checkModelById(id, artists);
    }
    create(createArtistDto: CreateArtistDto) {
        const newArtist = {
            id: createPassword(),
            ...createArtistDto,
        };
        artists.push(newArtist);
        return newArtist;
    }

    findAll() {
        return artists;
    }

    findOne(id: string) {
        const artist = this.getArtist(id);
        return artist;
    }

    update(id: string, updateArtistDto: UpdateArtistDto) {
        const artist = this.getArtist(id);
        artist.name = updateArtistDto.name;
        artist.grammy = updateArtistDto.grammy;
        return artist;
    }

    remove(id: string) {
        const artist = this.getArtist(id);
        if (artist) {
            tracks.find((track) => {
                if (track.artistId === artist.id) {
                    track.artistId = null;
                }
            });
            albums.find((album) => {
                if (album.artistId === artist.id) {
                    album.artistId = null;
                }
            });
            artists.splice(artists.indexOf(artist), 1);
        }
        this.favoritesService.deleteRelatedArtist(id);
    }
}

import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { checkModelById } from 'src/helpers/modelValidators';
import { albums, tracks } from 'db-store/store';
import { createPassword } from 'src/helpers/createPassword';

@Injectable()
export class AlbumService {
    getAlbum(id: string) {
        return checkModelById(id, albums);
    }
    create(createAlbumDto: CreateAlbumDto) {
        const newAlbum = {
            id: createPassword(),
            ...createAlbumDto,
        };
        albums.push(newAlbum);
        return newAlbum;
    }

    findAll() {
        return albums;
    }

    findOne(id: string) {
        const album = this.getAlbum(id);
        return album;
    }

    update(id: string, updateAlbumDto: UpdateAlbumDto) {
        const album = this.getAlbum(id);
        album.name = updateAlbumDto.name;
        album.year = updateAlbumDto.year;
        album.artistId = updateAlbumDto.artistId;
        return album;
    }

    remove(id: string) {
        const album = this.getAlbum(id);
        if (album) {
            tracks.find((track) => {
                if (track.albumId === album.id) {
                    track.albumId = null;
                }
            });
            albums.splice(albums.indexOf(album), 1);
        }
    }
}

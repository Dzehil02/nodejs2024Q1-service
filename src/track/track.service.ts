import { Injectable } from '@nestjs/common';
import { tracks } from 'db-store/store';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { createPassword } from 'src/utils/createPassword';
import { checkModelById } from 'src/utils/modelValidators';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
    constructor(private readonly favoritesService: FavoritesService) {}
    getTrack(id: string) {
        return checkModelById(id, tracks);
    }

    create(createTrackDto: CreateTrackDto) {
        const newTrack = {
            id: createPassword(),
            ...createTrackDto,
        };
        tracks.push(newTrack);
        return newTrack;
    }

    findAll() {
        return tracks;
    }

    findOne(id: string) {
        const track = this.getTrack(id);
        return track;
    }

    update(id: string, updateTrackDto: UpdateTrackDto) {
        const track = this.getTrack(id);
        track.name = updateTrackDto.name;
        track.duration = updateTrackDto.duration;
        return track;
    }

    remove(id: string) {
        const track = this.getTrack(id);
        tracks.splice(tracks.indexOf(track), 1);
        this.favoritesService.deleteRelatedTrack(id);
    }
}

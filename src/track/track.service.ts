import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { tracks } from 'db-store/store';
import { validateId } from 'src/helpers/validateId';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { createPassword } from 'src/helpers/createPassword';

@Injectable()
export class TrackService {
    getTrack(id: string) {
        if (!validateId(id)) {
            throw new BadRequestException(`Invalid id: ${id}. ID must be uuid v4`);
        }
        const track = tracks.find((track) => track.id === id);
        if (!track) {
            throw new NotFoundException(`Entity with id ${id} not found`);
        }
        return track;
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
        if (updateTrackDto.duration) {
            track.duration = updateTrackDto.duration;
        }
        return track;
    }

    remove(id: string) {
        const track = this.getTrack(id);
        tracks.splice(tracks.indexOf(track), 1);
    }
}

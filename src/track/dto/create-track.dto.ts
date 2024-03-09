import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    artistId: string | null = null;
    albumId: string | null = null;

    @IsNotEmpty()
    @IsNumber()
    duration: number;
}

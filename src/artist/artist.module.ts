import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
    controllers: [ArtistController],
    providers: [ArtistService],
    imports: [FavoritesModule],
})
export class ArtistModule {}

import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
    controllers: [AlbumController],
    providers: [AlbumService],
    exports: [AlbumService],
    imports: [FavoritesModule],
})
export class AlbumModule {}

import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [AlbumController],
    providers: [AlbumService, PrismaService],
    exports: [AlbumService],
    imports: [FavoritesModule],
})
export class AlbumModule {}

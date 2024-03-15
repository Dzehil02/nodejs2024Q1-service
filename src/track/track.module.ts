import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [TrackController],
    providers: [TrackService, PrismaService],
    exports: [TrackService],
    imports: [FavoritesModule],
})
export class TrackModule {}

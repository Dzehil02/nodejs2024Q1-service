import { Album, Artist, Favorites, Track, User } from './types';
import {USER_ID, TRACK_ID, ALBUM_ID, ARTIST_ID} from './const';

export const users: User[] = [
  {
    id: USER_ID,
    login: 'admin',
    password: 'admin',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export const artists: Artist[] = [
  {
    id: ARTIST_ID,
    name: 'Freddie Mercury',
    grammy: false,
  },
];

export const albums: Album[] = [
  {
    id: ALBUM_ID,
    name: 'Innuendo',
    year: 1991,
    artistId: '1',
  },
];

export const tracks: Track[] = [
  {
    id: TRACK_ID,
    name: 'Innuendo',
    artistId: '1',
    albumId: '1',
    duration: 0,
  },
];

export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};

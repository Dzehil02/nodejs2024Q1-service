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
    artistId: ARTIST_ID,
  },
];

export const tracks: Track[] = [
  {
    id: TRACK_ID,
    name: 'The Show Must Go On',
    artistId: ARTIST_ID,
    albumId: ALBUM_ID,
    duration: 262,
  },
];

export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};

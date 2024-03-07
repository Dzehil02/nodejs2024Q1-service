import { Album, Artist, Favorites, Track, User } from './types';
import { createPassword } from '../src/helpers/createPassword';

export const users: User[] = [
  {
    id: createPassword(),
    login: 'admin',
    password: 'admin',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export const artists: Artist[] = [
  {
    id: createPassword(),
    name: 'Freddie Mercury',
    grammy: false,
  },
];

export const albums: Album[] = [
  {
    id: createPassword(),
    name: 'Innuendo',
    year: 1991,
    artistId: '1',
  },
];

export const tracks: Track[] = [
  {
    id: createPassword(),
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

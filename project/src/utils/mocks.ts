import { faker } from '@faker-js/faker';
import { Film, Films} from '../types/film';

export const createFakeFilm = (): Film => ({
  id: faker.datatype.number(),
  name: faker.music.songName(),
  posterImage: faker.image.imageUrl(),
  previewImage: faker.image.imageUrl(),
  backgroundImage: faker.image.imageUrl(),
  backgroundColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
  videoLink: faker.image.imageUrl(),
  previewVideoLink: faker.image.imageUrl(),
  description: faker.lorem.paragraph(),
  rating: faker.datatype.number({ min: 0, max: 10, precision: 0.1 }),
  scoresCount: faker.datatype.number(),
  director: faker.name.fullName(),
  starring: Array.from({length: 4}, () => faker.name.fullName()),
  runTime: faker.datatype.number({ min: 90, max: 200 }),
  genre: faker.music.genre(),
  released: faker.datatype.number({ min: 1990, max: 2020 }),
  isFavorite: faker.datatype.boolean(),
});

export const createFakeFilms = (count: number): Films => Array.from({length: count}, () => createFakeFilm());

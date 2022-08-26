import { faker } from '@faker-js/faker';
import { Film, Films} from '../types/film';
import { Review, Reviews, UserReview } from '../types/review';

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


export const createFakeReview = (): Review => ({
  comment: faker.lorem.paragraph(),
  date: faker.date.past().toString(),
  id: faker.datatype.number(),
  rating: faker.datatype.number({ min: 0, max: 10 }),
  user: {
    id: faker.datatype.number(),
    name: faker.name.fullName(),
  }
});

export const createFakeReviews = (): Reviews => Array.from({length: 5}, () => createFakeReview());

export const createFakeUserReview = (): UserReview => ({
  comment: faker.lorem.sentences(3),
  rating: faker.datatype.number({ min: 0, max: 10 }),
  filmId: faker.datatype.number(),
});

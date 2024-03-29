export enum AppRoute {
  Login = '/login',
  Film = '/films',
  Root = '/',
  MyList = '/mylist',
  Player = '/player',
  AddReview = '/review',
}

export enum APIRoute {
  Films = '/films',
  Reviews = '/comments',
  Favorite = '/favorite',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
}

export const GENRES: readonly string[] = ['All genres', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Horror', 'Adventure', 'Romance', 'Sci-Fi', 'Thriller'];

export const DEFAULT_GENRE = 'All genres';

export const MONTH: readonly string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const FILMS_PER_STEP_COUNT = 8;

export const SIMILAR_FILMS_COUNT = 4;

export const PREVIEW_ACTIVATION_TIME = 1000;

export const SHORT_STAIRS_NUMBER = 3;

export const MIN_REVIEW_LENGTH = 50;

export const MAX_REVIEW_LENGTH = 400;

export enum AppRoute {
  Login = '/login',
  Film = '/films',
  Root = '/',
  MyList = '/mylist',
  Player = '/player/:id',
  Review = 'review',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MONTH: readonly string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const FILMS_PER_STEP_COUNT = 8;

export const SIMILAR_FILMS_COUNT = 4;

export const PREVIEW_ACTIVATION_TIME = 1000;

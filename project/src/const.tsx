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

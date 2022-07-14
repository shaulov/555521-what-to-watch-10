export enum AppRoute {
  Login = '/login',
  Film = '/films/:id',
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

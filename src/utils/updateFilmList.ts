import { Film, Films } from '../types/film';

export const updateFilmList = (filmList: Films, film: Film, isFilmInListUpdate: boolean): Films => {
  const updatedFilmlIndex = filmList.findIndex((updatedFilm) => updatedFilm.id === film.id);
  if (isFilmInListUpdate) {
    return [
      ...filmList.slice(0, updatedFilmlIndex),
      ...[film],
      ...filmList.slice(updatedFilmlIndex + 1)
    ];
  } else {
    return [
      ...filmList.slice(0, updatedFilmlIndex),
      ...filmList.slice(updatedFilmlIndex + 1)
    ];
  }
};

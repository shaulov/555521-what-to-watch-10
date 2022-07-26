import SingleFilmCard from '../../components/single-film-card/single-film-card';

import { Film } from '../../types/film';

import { FILMS_PER_STEP_COUNT } from '../../const';

type FilmsListProps = {
  films: Film[];
  filmsCount?: number;
  filmsGenre?: string;
}

function FilmsList({ films, filmsCount, filmsGenre }: FilmsListProps): JSX.Element {

  const renderFilmCards = (): JSX.Element[] => {
    const filmsCards: JSX.Element[] = [];

    let showedFilms = filmsGenre ? films.filter((film) => film.genre === filmsGenre) : films;

    if (showedFilms.length === 0) {
      showedFilms = films;
    }

    let showedFilmsCount = filmsCount || FILMS_PER_STEP_COUNT;

    if (showedFilms.length < FILMS_PER_STEP_COUNT) {
      showedFilmsCount = showedFilms.length;
    }

    if (filmsCount && filmsCount < showedFilmsCount) {
      showedFilmsCount = filmsCount;
    }

    for (let i = 0; i < (showedFilmsCount); i++) {
      filmsCards.push(
        <SingleFilmCard
          key={showedFilms[i].id}
          film={showedFilms[i]}
        />
      );
    }

    return filmsCards;
  };

  return(
    <div className="catalog__films-list">
      { renderFilmCards() }
    </div>
  );
}

export default FilmsList;

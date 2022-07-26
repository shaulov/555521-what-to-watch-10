import SingleFilmCard from '../../components/single-film-card/single-film-card';

import { Film } from '../../types/film';

type FilmsListProps = {
  films: Film[];
  filmsGenre?: string;
}

function FilmsList({ films, filmsGenre }: FilmsListProps): JSX.Element {
  const showedFilms = filmsGenre ? films.filter((film) => film.genre === filmsGenre) : films;

  return(
    <div className="catalog__films-list">
      {
        showedFilms.map((film) => (
          <SingleFilmCard
            key={film.id}
            film={film}
          />
        ))
      }
    </div>
  );
}

export default FilmsList;

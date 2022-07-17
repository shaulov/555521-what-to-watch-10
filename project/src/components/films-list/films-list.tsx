import { useState } from 'react';

import SingleFilmCard from '../../components/single-film-card/single-film-card';

import { Film } from '../../types/film';

type FilmsListProps = {
  films: Film[];
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState({});

  const onFocusHandler = (film: Film) => {
    setActiveFilm(film);
  };

  return(
    <div className="catalog__films-list">
      { films.map((film) => (
        <SingleFilmCard
          key={film.id}
          film={film}
          onFocusHandler={onFocusHandler}
        />
      )) }
    </div>
  );
}

export default FilmsList;

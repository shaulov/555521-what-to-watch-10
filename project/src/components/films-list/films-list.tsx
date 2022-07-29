import SingleFilmCard from '../../components/single-film-card/single-film-card';

import { Film } from '../../types/film';

type FilmsListProps = {
  films: Film[];
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  return(
    <div className="catalog__films-list">
      {
        films.map((film) => (
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

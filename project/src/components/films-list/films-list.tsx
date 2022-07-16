import SingleFilmCard from '../../components/single-film-card/single-film-card';

import { Film } from '../../types/film';

type FilmsListProps = {
  filmCount: number;
  films: Film[];
}

function FilmsList({ filmCount, films }: FilmsListProps): JSX.Element {
  return(
    <div className="catalog__films-list">
      { films.map((film) => (
        <SingleFilmCard
          key={film.id}
          film={film}
        />
      )) }
    </div>
  );
}

export default FilmsList;

import { useAppSelector } from '../../hooks';

import SingleFilmCard from '../../components/single-film-card/single-film-card';

function FilmsList(): JSX.Element {
  const films = useAppSelector((state) => state.films);

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

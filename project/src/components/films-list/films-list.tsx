import SingleFilmCard from '../../components/single-film-card/single-film-card';

import { Film } from '../../types/film';

import { FILMS_PER_STEP_COUNT } from '../../const';

type FilmsListProps = {
  films: Film[];
  filmsCount?: number;
}

function FilmsList({ films, filmsCount }: FilmsListProps): JSX.Element {

  const renderFilmCards = (): JSX.Element[] => {
    const filmsCards: JSX.Element[] = [];

    for (let i = 0; i < (filmsCount || FILMS_PER_STEP_COUNT); i++) {
      filmsCards.push(
        <SingleFilmCard
          key={films[i].id}
          film={films[i]}
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

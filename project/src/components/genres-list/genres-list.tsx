import { Link } from 'react-router-dom';

type GenresListProps = {
  genres: readonly string[];
  onClickHandler: (value: string) => void;
  activeGenre: string;
}

function GenresList({genres, onClickHandler, activeGenre}: GenresListProps): JSX.Element {
  return(
    <ul className="catalog__genres-list">
      {
        genres.map((genre) => (
          <li key={genre} className={`catalog__genres-item ${genre === activeGenre ? 'catalog__genres-item--active' : ''}`}>
            <Link to={'#'} className="catalog__genres-link" onClick={() => onClickHandler(genre)}>{genre}</Link>
          </li>
        ))
      }
    </ul>
  );
}

export default GenresList;

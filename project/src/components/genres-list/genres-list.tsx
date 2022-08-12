import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getGenre } from '../../store/film-data/selectors';

type GenresListProps = {
  genres: readonly string[];
  onFilterChange: (genre: string) => void;
}

function GenresList({genres, onFilterChange}: GenresListProps): JSX.Element {
  const activeGenre = useAppSelector(getGenre);

  return(
    <ul className="catalog__genres-list">
      {
        genres.map((genre) => (
          <li key={genre} className={`catalog__genres-item ${genre === activeGenre && 'catalog__genres-item--active'}`}>
            <Link to={'#'} className="catalog__genres-link" onClick={() => onFilterChange(genre)}>{genre}</Link>
          </li>
        ))
      }
    </ul>
  );
}

export default GenresList;

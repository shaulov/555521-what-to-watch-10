import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import ReviewForm from '../../components/review-form/review-form';

import { AppRoute } from '../../const';

function AddReviewScreen (): JSX.Element {
  const currentFilm = useAppSelector((state) => state.currentFilm);
  const { id, name, posterImage, backgroundImage } = currentFilm;

  return (
    <section className="film-card film-card--full" >
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo light={false} />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>

    </section>
  );
}

export default AddReviewScreen;

import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../hooks';

import { fetchCurrentFilmAction } from '../../store/api-actions';

import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import ReviewForm from '../../components/review-form/review-form';
import LoadingScreen from '../loading-screen/loading-screen';

import { AppRoute } from '../../const';

function AddReviewScreen (): JSX.Element {

  const { filmId } = useParams();

  const { currentFilm, isCurrentFilmDataLoaded } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentFilmAction(filmId));
  }, [filmId]);

  if (!isCurrentFilmDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

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
                <Link to={`${AppRoute.Film}/${id}${AppRoute.AddReview}`} className="breadcrumbs__link">Add review</Link>
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

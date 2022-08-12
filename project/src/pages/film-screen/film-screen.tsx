import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../hooks';

import { fetchCurrentFilmAction, fetchSimilarFilmsAction, fetchFilmReviewsAction } from '../../store/api-actions';

import Logo from '../../components/logo/logo';
import SingleFullFilmCard from '../../components/single-full-film-card/single-full-film-card';
import FilmsList from '../../components/films-list/films-list';
import FilmCardNavigation from '../../components/film-card-navigation/film-card-navigation';
import LoadingScreen from '../loading-screen/loading-screen';
import Screen404 from '../404-screen/404-screen';

import { SIMILAR_FILMS_COUNT } from '../../const';

function FilmScreen (): JSX.Element {
  const { filmId } = useParams();

  const { currentFilm, reviews, similarFilms, isCurrentFilmDataLoaded } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentFilmAction(filmId));
    dispatch(fetchSimilarFilmsAction(filmId));
    dispatch(fetchFilmReviewsAction(filmId));
  }, [filmId]);

  if (!isCurrentFilmDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  if (isCurrentFilmDataLoaded && Object.keys(currentFilm).length === 0) {
    return (
      <Screen404 />
    );
  }

  const {name, posterImage, backgroundColor} = currentFilm;

  return (
    <>
      <section className="film-card film-card--full" style={{background: backgroundColor}}>
        <SingleFullFilmCard />

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <FilmCardNavigation currentFilm={currentFilm} currentReview={reviews}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilms.length > SIMILAR_FILMS_COUNT ? similarFilms.slice(0, SIMILAR_FILMS_COUNT) : similarFilms} />
        </section>

        <footer className="page-footer">
          <Logo light />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default FilmScreen;

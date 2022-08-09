import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../hooks';
import { fetchCurrentFilmAction } from '../../store/api-actions';

import { Film } from '../../types/film';

import VideoPlayer from '../video-player/video-player';

import { AppRoute } from '../../const';


type SingleFilmCardProps = {
  film: Film;
}

function SingleFilmCard ({ film }: SingleFilmCardProps) : JSX.Element {
  const { id, name, posterImage } = film;

  const [isPlayer, setPlayer] = useState(false);

  const dispatch = useAppDispatch();

  const handleFilmCardClick = async () => {
    await dispatch(fetchCurrentFilmAction(id.toString()));
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => setPlayer(true)}
      onMouseOut={() => setPlayer(false)}
    >
      <div className="small-film-card__image">
        {
          isPlayer ?
            <VideoPlayer film={film}/> :
            <img src={posterImage} alt={name} width="280" height="175" />
        }
      </div>
      <h3 className="small-film-card__title">
        <Link
          to={`${AppRoute.Film}/${id}`}
          className="small-film-card__link"
          onClick={handleFilmCardClick}
        >{name}
        </Link>
      </h3>
    </article>
  );
}

export default SingleFilmCard;

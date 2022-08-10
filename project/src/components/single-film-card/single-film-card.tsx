import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Film } from '../../types/film';

import VideoPlayer from '../video-player/video-player';

import { AppRoute } from '../../const';


type SingleFilmCardProps = {
  film: Film;
}

function SingleFilmCard ({ film }: SingleFilmCardProps) : JSX.Element {
  const { id, name, previewImage } = film;

  const [isPlayer, setPlayer] = useState(false);

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
            <img src={previewImage} alt={name} width="280" height="175" />
        }
      </div>
      <h3 className="small-film-card__title">
        <Link
          to={`${AppRoute.Film}/${id}`}
          className="small-film-card__link"
        >{name}
        </Link>
      </h3>
    </article>
  );
}

export default SingleFilmCard;

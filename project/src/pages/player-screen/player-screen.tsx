import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCurrentFilmAction } from '../../store/api-actions';
import { getCurrentFilm, getCurrentFilmDataLoadedStatus } from '../../store/film-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import Screen404 from '../404-screen/404-screen';
import PlayButton from '../../components/play-button/play-button';
import PauseButton from '../../components/pause-button/pause-button';

function PlayerScreen (): JSX.Element {
  const { filmId } = useParams();
  const currentFilm = useAppSelector(getCurrentFilm);
  const isCurrentFilmDataLoaded = useAppSelector(getCurrentFilmDataLoadedStatus);
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentFilmAction(filmId));
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

  const { name, videoLink, previewImage } = currentFilm;

  const handleClick = () => {
    setPlaying(!isPlaying);
  };

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={videoLink}
        className="player__video"
        poster={previewImage}
      >
      </video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handleClick}
          >
            {
              isPlaying
                ? (<PauseButton />)
                : (<PlayButton />)
            }
          </button>
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;

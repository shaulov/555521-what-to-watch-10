import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCurrentFilmAction } from '../../store/api-actions';
import { getCurrentFilm, getCurrentFilmDataLoadedStatus } from '../../store/film-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import Screen404 from '../404-screen/404-screen';
import PlayButton from '../../components/play-button/play-button';
import PauseButton from '../../components/pause-button/pause-button';
import { AppRoute } from '../../const';
import { getFilmDuration } from '../../utils/getFilmDuration';

function PlayerScreen (): JSX.Element {
  const { filmId } = useParams();
  const currentFilm = useAppSelector(getCurrentFilm);
  const isCurrentFilmDataLoaded = useAppSelector(getCurrentFilmDataLoadedStatus);
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

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

  const handleControlsClick = () => {
    isPlaying ? videoRef.current?.pause() : videoRef.current?.play();
    setPlaying(!isPlaying);
  };

  const filmDuration = videoRef.current?.duration || 0;
  const playerProgress = videoRef.current?.currentTime ? videoRef.current?.currentTime / filmDuration * 100 : 0;

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={videoLink}
        className="player__video"
        poster={previewImage}
      >
      </video>

      <button
        type="button"
        className="player__exit"
        onClick={() => navigate(`${AppRoute.Film}/${filmId}`, {replace: true})}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={playerProgress} max="100"></progress>
            <div className="player__toggler" style={{left: `${playerProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getFilmDuration(filmDuration)}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handleControlsClick}
          >
            {
              isPlaying
                ? (<PauseButton />)
                : (<PlayButton />)
            }
          </button>
          <div className="player__name">{name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => videoRef.current?.requestFullscreen()}
          >
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

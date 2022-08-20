import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCurrentFilmAction } from '../../store/api-actions';
import { getCurrentFilm, getCurrentFilmDataLoadedStatus } from '../../store/film-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import Screen404 from '../404-screen/404-screen';
import PlayerControls from '../../components/player-controls/player-controls';
import PlayerTimeBar from '../../components/player-time-bar/player-time-bar';
import { AppRoute } from '../../const';

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

  const { name, videoLink, previewImage, runTime } = currentFilm;

  const handleControlsClick = () => {
    isPlaying ? videoRef.current?.pause() : videoRef.current?.play();
    setPlaying(!isPlaying);
  };

  const handleFullScreenClick = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleExitClick = () => {
    videoRef.current?.pause();
    navigate(`${AppRoute.Film}/${filmId}`, {replace: true});
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

      <button
        type="button"
        className="player__exit"
        onClick={handleExitClick}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <PlayerTimeBar filmDuration={runTime} isPlaying={isPlaying}/>
        </div>

        <div className="player__controls-row">
          <PlayerControls
            handleControlsClick={handleControlsClick}
            handleFullScreenClick={handleFullScreenClick}
            isPlaying={isPlaying}
            name={name}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;

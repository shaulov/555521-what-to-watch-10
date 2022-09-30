import { MouseEventHandler } from 'react';
import PlayButton from '../../components/play-button/play-button';
import PauseButton from '../../components/pause-button/pause-button';

type PlayerControlsProps = {
  onControlsClick: MouseEventHandler<HTMLButtonElement>;
  onFullScreenClick: MouseEventHandler<HTMLButtonElement>;
  isPlaying: boolean;
  name: string;
}

function PlayerControls({onControlsClick, onFullScreenClick, isPlaying, name}: PlayerControlsProps): JSX.Element {
  return (
    <div className="player__controls-row">
      <button
        type="button"
        className="player__play"
        onClick={onControlsClick}
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
        onClick={onFullScreenClick}
      >
        <svg viewBox="0 0 27 27" width="27" height="27">
          <use xlinkHref="#full-screen"></use>
        </svg>
        <span>Full screen</span>
      </button>
    </div>
  );
}

export default PlayerControls;

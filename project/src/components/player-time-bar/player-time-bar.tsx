import { getFilmDuration } from '../../utils/getFilmDuration';

type PlayerTimeBarProps = {
  filmDuration: number;
  playerProgress: number;
}

function PlayerTimeBar({filmDuration, playerProgress}: PlayerTimeBarProps): JSX.Element {
  return (
    <>
      <div className="player__time">
        <progress className="player__progress" value={playerProgress} max="100"></progress>
        <div className="player__toggler" style={{left: `${playerProgress}%`}}>Toggler</div>
      </div>
      <div className="player__time-value">{getFilmDuration(filmDuration)}</div>
    </>
  );
}

export default PlayerTimeBar;

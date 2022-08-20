import { useState, useEffect } from 'react';
import { getFilmDuration } from '../../utils/getFilmDuration';

type PlayerTimeBarProps = {
  filmDuration: number;
  isPlaying: boolean;
}

function PlayerTimeBar({filmDuration, isPlaying}: PlayerTimeBarProps): JSX.Element {
  const [timer, setTimer] = useState(filmDuration * 60);


  useEffect(() => {
    if (isPlaying) {
      setTimeout(setTimer, 1000, timer - 1);
    }
  }, [isPlaying, timer]);

  return (
    <>
      <div className="player__time">
        <progress className="player__progress" value="30" max="100"></progress>
        <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
      </div>
      <div className="player__time-value">{getFilmDuration(timer)}</div>
    </>
  );
}

export default PlayerTimeBar;

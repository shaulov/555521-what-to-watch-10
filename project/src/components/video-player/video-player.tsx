import { useEffect, useRef } from 'react';
import { Film } from '../../types/film';
import { PREVIEW_ACTIVATION_TIME } from '../../const';

type VideoPlayerProps = {
  film: Film;
}

function VideoPlayer({film}: VideoPlayerProps) : JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const startPlayTimeout = setTimeout(
      () => videoRef.current?.play(),
      PREVIEW_ACTIVATION_TIME
    );

    return () => clearTimeout(startPlayTimeout);
  });

  return(
    <video
      src={film.previewVideoLink}
      className="player__video"
      poster={film.previewImage}
      ref={videoRef}
      muted
      loop
    />
  );
}

export default VideoPlayer;

export const getFilmDuration = (duration: number) => {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor((duration / 60) % 60);
  const hours = Math.floor(duration / (60 * 60));

  const displayedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const displayedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const displayedHours = hours < 10 ? `0${hours}` : hours;

  return hours === 0 ? `${displayedMinutes}:${displayedSeconds}` : `${displayedHours}:${displayedMinutes}:${displayedSeconds}`;
};

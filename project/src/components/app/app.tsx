import MainScreen from '../../pages/main-screen/main-screen';

const randomFilm = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseDate: '2014',
};

function App(): JSX.Element {
  const { name, genre, releaseDate } = randomFilm;

  return (
    <MainScreen name={name} genre={genre} releaseDate={releaseDate}/>
  );
}

export default App;

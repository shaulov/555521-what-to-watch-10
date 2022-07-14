import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';

import MainScreen from '../../pages/main-screen/main-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import ReviewScreen from '../../pages/review-screen/review-screen';
import Screen404 from '../../pages/404-screen/404-screen';

const randomFilm = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseDate: '2014',
};

function App(): JSX.Element {
  const { name, genre, releaseDate } = randomFilm;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen name={name} genre={genre} releaseDate={releaseDate} />}
        />
        <Route
          path={AppRoute.Film}
          element={<FilmScreen />}
        >
          <Route
            path={AppRoute.Review}
            element={<ReviewScreen />}
          />
        </Route>
        <Route
          path={AppRoute.Player}
          element={<PlayerScreen />}
        />
        <Route
          path={AppRoute.MyList}
          element={<MyListScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path="*"
          element={<Screen404 />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

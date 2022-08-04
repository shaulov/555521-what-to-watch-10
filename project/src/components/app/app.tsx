import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

import MainScreen from '../../pages/main-screen/main-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import Screen404 from '../../pages/404-screen/404-screen';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import ResetFilmList from '../../utils/resetFilmList';

import PrivateRoute from '../private-root/private-root';

function App(): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const reviews = useAppSelector((state) => state.reviews);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ResetFilmList />
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen />}
        />
        <Route
          path={AppRoute.Film}
        >
          <Route
            path=":filmId"
            element={<FilmScreen films={films} reviews={reviews}/>}
          >
            <Route
              path={AppRoute.Review}
              element={<AddReviewScreen film={films[0]} />}
            />
          </Route>
        </Route>
        <Route
          path={AppRoute.Player}
          element={<PlayerScreen film={films[0]} />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyListScreen films={films}/>
            </PrivateRoute>
          }
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

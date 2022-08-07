import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';

import MainScreen from '../../pages/main-screen/main-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import Screen404 from '../../pages/404-screen/404-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-root/private-root';
import ErrorMessage from '../../components/error-message/error-message';

import ResetFilmList from '../../utils/resetFilmList';
import { isCheckedAuth } from '../../utils/isCheckedAuth';

function App(): JSX.Element {
  const { films, reviews, authorizationStatus, isDataLoaded, error } = useAppSelector((state) => state);

  if (!isDataLoaded || isCheckedAuth(authorizationStatus)) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ResetFilmList />
      {error && <ErrorMessage />}
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
            <PrivateRoute authorizationStatus={authorizationStatus}>
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

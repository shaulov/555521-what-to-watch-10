import { Route, Routes } from 'react-router-dom';
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
import PrivateRoute from '../private-root/private-root';
import { isCheckedAuth } from '../../utils/isCheckedAuth';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFilmsDataLoadedStatus } from '../../store/film-data/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFilmsDataLoaded = useAppSelector(getFilmsDataLoadedStatus);

  if (!isFilmsDataLoaded || isCheckedAuth(authorizationStatus)) {
    return (
      <LoadingScreen />
    );
  }

  return (
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
          element={<FilmScreen />}
        />
        <Route
          path={`:filmId${AppRoute.AddReview}`}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <AddReviewScreen />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path={AppRoute.Player}
      >
        <Route
          path=":filmId"
          element={<PlayerScreen />}
        />
      </Route>
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <MyListScreen />
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
  );
}

export default App;

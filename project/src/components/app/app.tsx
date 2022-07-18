import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

import MainScreen from '../../pages/main-screen/main-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import Screen404 from '../../pages/404-screen/404-screen';

import PrivateRoute from '../private-root/private-root';

import { Film, FilmReview } from '../../types/film';

type AppScreenProps = {
  films: Film[],
  reviews: FilmReview[],
}

function App({films, reviews}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen films={films} />}
        />
        <Route
          path={AppRoute.Film}
        >
          <Route
            path=":filmId"
            element={<FilmScreen films={films}/>}
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

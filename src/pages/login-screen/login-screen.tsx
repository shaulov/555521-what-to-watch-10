import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import Logo from '../../components/logo/logo';
import SignInForm from '../../components/sign-in-form/sign-in-form';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function LoginScreen (): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <>
      {
        authorizationStatus === AuthorizationStatus.Auth && (<Navigate to={AppRoute.Root} replace />)
      }
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo light={false} />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <SignInForm />
        </div>

        <footer className="page-footer">
          <Logo light />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LoginScreen;

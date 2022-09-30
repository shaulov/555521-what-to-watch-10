import { useRef, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

function SignInForm() : JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const isValid = validateForm();

    if (loginRef.current !== null && passwordRef.current !== null && isValid) {
      handleFormSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const validateForm = () => {
    const email = loginRef.current?.value;
    const password = passwordRef.current?.value;
    if (password && email) {
      const validEmail = /^(.+)@(\S+)\.(\S+)$/.test(email);
      const withoutSpacesRule = !(/\s/.test(password));
      const hasLeastOneLetter = /[a-zA-Z]+/.test(password);
      const hasLeastOneDigit = /[\d]+/.test(password);
      const hasMinLength = password.length >= 2;

      return validEmail && withoutSpacesRule && hasLeastOneLetter && hasLeastOneDigit && hasMinLength;
    }

    return false;
  };

  return(
    <form
      action=""
      className="sign-in__form"
      onSubmit={handleSubmit}
    >
      <div className="sign-in__fields">
        <div className="sign-in__field">
          <input
            ref={loginRef}
            className="sign-in__input"
            type="email" placeholder="Email address"
            name="user-email"
            id="user-email"
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
        </div>
        <div className="sign-in__field">
          <input
            ref={passwordRef}
            className="sign-in__input"
            type="password"
            placeholder="Password"
            name="user-password"
            id="user-password"
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
}

export default SignInForm;

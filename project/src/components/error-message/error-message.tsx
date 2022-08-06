import { useAppSelector } from '../../hooks';

import './error-message.css';

function ErrorMessage(): JSX.Element {
  const {error} = useAppSelector((state) => state);

  return <div className="error-message">{error}</div>;
}

export default ErrorMessage;

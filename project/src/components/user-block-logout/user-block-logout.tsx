import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function UserBlockLogout(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link to="#" className="user-block__link" onClick={handleClick}>Sign out</Link>
      </li>
    </ul>
  );
}

export default UserBlockLogout;

import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import UserBlockLogout from '../user-block-logout/user-block-logout';
import UserBlockLogin from '../user-block-login/user-block-login';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <UserBlockLogout />;
  }

  return <UserBlockLogin />;
}

export default memo(UserBlock);

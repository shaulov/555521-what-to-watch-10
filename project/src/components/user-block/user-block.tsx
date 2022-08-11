import { memo } from 'react';
import { useAppSelector } from '../../hooks';

import UserBlockLogout from '../user-block-logout/user-block-logout';
import UserBlockLogin from '../user-block-login/user-block-login';

import { AuthorizationStatus } from '../../const';

function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <UserBlockLogout />;
  }

  return <UserBlockLogin />;
}

export default memo(UserBlock);

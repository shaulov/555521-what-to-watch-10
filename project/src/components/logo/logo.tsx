import { memo } from 'react';

import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

type LogoProps = {
  light: boolean,
}

function Logo({light}: LogoProps): JSX.Element {
  const logoClass = light ? 'logo__link logo__link--light' : 'logo__link';

  return (
    <div className="logo">
      <Link to={AppRoute.Root} className={logoClass}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default memo(Logo);

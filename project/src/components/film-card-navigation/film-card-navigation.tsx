import { useState } from 'react';

import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';
import NavigationTabContent from '../navigation-tab-content/navigation-tab-content';

import { Film, FilmReview } from '../../types/film';

type FilmCardNavigationProps = {
  currentFilm: Film;
  currentReview: FilmReview;
}

function FilmCardNavigation({currentFilm, currentReview}: FilmCardNavigationProps) : JSX.Element {
  const [activeTab, setActiveTab] = useState('Overview');

  const navigationTabs = new Map([
    ['Overview', <FilmOverview key={0} film={currentFilm} />],
    ['Details', <FilmDetails key={1} film={currentFilm} />],
    ['Reviews', <FilmReviews key={2} filmReviews={currentReview} />]
  ]);

  const handleClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent> & {target: {tagName: string; textContent: string}}) => {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();
      setActiveTab(evt.target.textContent);
    }
  };

  return(
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <NavigationTabContent activeTab={activeTab} onClickHandler={handleClick} titleTabs={Array.from(navigationTabs.keys())}/>
      </nav>

      {navigationTabs.get(activeTab)}
    </div>
  );
}

export default FilmCardNavigation;

import { useState } from 'react';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';
import NavigationTabContent from '../navigation-tab-content/navigation-tab-content';
import { Film } from '../../types/film';
import { Reviews } from '../../types/review';

type FilmCardNavigationProps = {
  currentFilm: Film;
  currentReview: Reviews;
}

function FilmCardNavigation({currentFilm, currentReview}: FilmCardNavigationProps) : JSX.Element {
  const [activeTab, setActiveTab] = useState('Overview');

  const navigationTabs = new Map([
    ['Overview', <FilmOverview key={0} film={currentFilm} />],
    ['Details', <FilmDetails key={1} film={currentFilm} />],
    ['Reviews', <FilmReviews key={2} filmReviews={currentReview} />]
  ]);

  return(
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <NavigationTabContent activeTab={activeTab} onClickHandler={setActiveTab} titleTabs={Array.from(navigationTabs.keys())}/>
      </nav>

      {navigationTabs.get(activeTab)}
    </div>
  );
}

export default FilmCardNavigation;

import {Link} from 'react-router-dom';

type NavigationTabContentProps = {
  activeTab: string;
  onClickHandler: (value: string) => void;
  titleTabs: string[];
}

function NavigationTabContent({activeTab, onClickHandler, titleTabs}: NavigationTabContentProps): JSX.Element {
  return(
    <ul className="film-nav__list">
      {
        titleTabs.map((title) => (
          <li key={title} className={activeTab === `${title}` ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
            <Link to={'#'} className="film-nav__link" onClick={() => onClickHandler(title)}>{title}</Link>
          </li>
        ))
      }
    </ul>
  );
}

export default NavigationTabContent;

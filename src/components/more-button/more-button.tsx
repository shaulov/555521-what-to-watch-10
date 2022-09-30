type MoreButtonProps = {
  onShowMoreButtonClick: () => void;
}

function MoreButton({onShowMoreButtonClick}: MoreButtonProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onShowMoreButtonClick}>Show more</button>
    </div>
  );
}

export default MoreButton;

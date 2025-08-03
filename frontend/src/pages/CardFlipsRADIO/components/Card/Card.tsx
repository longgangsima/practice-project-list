import { memo } from 'react';
import { Card } from '../../types/GameTypes';

interface CardComponentProps {
  card: Card;
  onCardClick: (cardId: number) => void;
  isDisabled?: boolean;
}

const CardComponent = memo(({ card, onCardClick, isDisabled = false }: CardComponentProps) => {
  const handleClick = () => {
    if (!isDisabled && !card.isFlipped && !card.isMatched) {
      onCardClick(card.id);
    }
  };

  const getCardClassName = () => {
    let className = 'radio-card';

    if (card.isFlipped) className += ' flipped';
    if (card.isMatched) className += ' matched';
    if (isDisabled) className += ' disabled';

    return className;
  };

  return (
    <div
      className={getCardClassName()}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Card ${card.id + 1}${card.isFlipped ? `, shows ${card.letter}` : ''}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="card-inner">
        <div className="card-front">
          <span className="card-icon">?</span>
        </div>
        <div className="card-back">
          <span className="card-letter">{card.letter}</span>
        </div>
      </div>
    </div>
  );
});

CardComponent.displayName = 'CardComponent';

export default CardComponent;

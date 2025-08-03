import { memo } from 'react';
import { Card } from '../../types/GameTypes';
import CardComponent from '../Card/Card';

interface GameBoardProps {
  cards: Card[];
  onCardClick: (cardId: number) => void;
  gridSize: number;
  isDisabled?: boolean;
}

const GameBoard = memo(({ cards, onCardClick, gridSize, isDisabled = false }: GameBoardProps) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  };

  return (
    <div
      className="radio-game-board"
      style={gridStyle}
      role="grid"
      aria-label={`${gridSize} by ${gridSize} memory card game board`}
    >
      {cards.map(card => (
        <CardComponent
          key={card.id}
          card={card}
          onCardClick={onCardClick}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
});

GameBoard.displayName = 'GameBoard';

export default GameBoard;

import { useState } from 'react';
import { CardType } from '../types';
import CardObject from './CardObject';

interface GameBoardProps {
  Cards: CardType[];
}

const GameBoard = ({ Cards }: GameBoardProps) => {
  const [cards, setCards] = useState<CardType[]>(Cards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const handleCardClick = (id: number) => {
    if (flippedCards.length >= 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    setCards(preCards =>
      preCards.map(card => (card.id === id ? { ...card, isFlipped: true } : card))
    );

    if (newFlippedCards.length === 2) {
      setMoves(pre => pre + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.letter === secondCard.letter) {
        setCards(preCards =>
          preCards.map(card =>
            card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(preCards =>
            preCards.map(card =>
              card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(Cards.map(card => ({ ...card, isFlipped: false, isMatched: false })));
    setFlippedCards([]);
    setMoves(0);
  };

  const isGameWon = cards.every(card => card.isMatched) && cards.length > 0;

  return (
    <div className="card-flips-game">
      {/* Game Header with Stats */}
      <div className="game-header">
        <h2>Memory Card Game</h2>
        <div className="game-stats">
          <span>Moves: {moves}</span>
        </div>
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      {/* Win Message */}
      {isGameWon && (
        <div className="win-message">🎉 Congratulations! You won in {moves} moves! 🎉</div>
      )}

      {/* Cards Grid */}
      <div className="cards-grid">
        {cards.map(card => (
          <CardObject
            key={card.id}
            id={card.id}
            letter={card.letter}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

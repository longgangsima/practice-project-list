interface CardObjectProps {
  id: number;
  letter: string;
  isFlipped: boolean;
  isMatched: boolean;
  handleCardClick: (id: number) => void;
}

const CardObject = ({ id, letter, isFlipped, isMatched, handleCardClick }: CardObjectProps) => {
  return (
    <div
      className={`game-card ${isFlipped || isMatched ? 'flipped' : ''} ${
        isMatched ? 'matched' : ''
      }`}
      onClick={() => handleCardClick(id)}
    >
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{letter}</div>
      </div>
    </div>
  );
};

export default CardObject;

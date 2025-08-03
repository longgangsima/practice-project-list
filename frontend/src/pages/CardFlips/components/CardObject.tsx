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
      className={`card ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={() => handleCardClick(id)}
    >
      <div className="card-inner">
        <div className="card-face card-front">?</div>
        <div className="card-face card-back">{letter}</div>
      </div>
    </div>
  );
};

export default CardObject;

import { memo } from 'react';

interface GameControlsProps {
  onReset: () => void;
  onNewGame: () => void;
  gameStatus: 'idle' | 'playing' | 'won' | 'paused';
  isDisabled?: boolean;
}

const GameControls = memo(
  ({ onReset, onNewGame, gameStatus, isDisabled = false }: GameControlsProps) => {
    return (
      <div className="radio-game-controls" role="toolbar" aria-label="Game controls">
        <button
          className="control-button primary"
          onClick={onNewGame}
          disabled={isDisabled}
          aria-label="Start a new game"
        >
          New Game
        </button>

        <button
          className="control-button secondary"
          onClick={onReset}
          disabled={isDisabled || gameStatus === 'idle'}
          aria-label="Reset current game"
        >
          Reset
        </button>

        <div className="game-status" aria-live="polite">
          <span className={`status-indicator ${gameStatus}`}>
            {gameStatus === 'idle' && 'Ready to play'}
            {gameStatus === 'playing' && 'Playing...'}
            {gameStatus === 'won' && 'You won!'}
            {gameStatus === 'paused' && 'Paused'}
          </span>
        </div>
      </div>
    );
  }
);

GameControls.displayName = 'GameControls';

export default GameControls;

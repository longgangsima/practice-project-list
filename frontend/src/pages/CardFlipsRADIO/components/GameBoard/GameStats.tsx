import { memo } from 'react';

interface GameStatsProps {
  moves: number;
  timeElapsed: number;
  accuracy: number;
  remainingPairs: number;
  isComplete: boolean;
}

const GameStats = memo(
  ({ moves, timeElapsed, accuracy, remainingPairs, isComplete }: GameStatsProps) => {
    const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatAccuracy = (acc: number): string => {
      return `${Math.round(acc)}%`;
    };

    return (
      <div className="radio-game-stats" role="complementary" aria-label="Game statistics">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Moves</span>
            <span className="stat-value" aria-live="polite">
              {moves}
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Time</span>
            <span className="stat-value" aria-live="polite">
              {formatTime(timeElapsed)}
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value" aria-live="polite">
              {formatAccuracy(accuracy)}
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Pairs Left</span>
            <span className="stat-value" aria-live="polite">
              {remainingPairs}
            </span>
          </div>
        </div>

        {isComplete && (
          <div className="completion-message" role="alert">
            🎉 Game Complete! 🎉
          </div>
        )}
      </div>
    );
  }
);

GameStats.displayName = 'GameStats';

export default GameStats;

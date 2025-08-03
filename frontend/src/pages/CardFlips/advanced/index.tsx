import { memo, useEffect, useRef, useState } from 'react';
import '../css/advanced/game.css';
import '../css/advanced/requirements.css';
import GameBoard from './components/GameBoard/GameBoard';
import GameControls from './components/GameBoard/GameControls';
import GameStats from './components/GameBoard/GameStats';
import GridSizeSelector from './components/UI/GridSizeSelector';
import { useGameEngine } from './hooks/useGameEngine';

interface AdvancedGameBoardProps {
  gridSize?: 2 | 4 | 6;
  flipDelay?: number;
}

const AdvancedGameBoard = memo(
  ({ gridSize: initialGridSize = 4, flipDelay = 1000 }: AdvancedGameBoardProps) => {
    const [gridSize, setGridSize] = useState<2 | 4 | 6>(initialGridSize);
    const [error, setError] = useState<string | null>(null);
    const lastGridSizeRef = useRef<2 | 4 | 6>(initialGridSize);

    try {
      const { gameState, gameStats, initializeGame, handleCardClick, resetGame, config } =
        useGameEngine({ gridSize, flipDelay });

      // FIXED: "Maximum update depth exceeded" infinite re-render error
      // ERROR: useEffect had [initializeGame, gridSize] dependencies where initializeGame
      //        was being recreated on every render due to unstable gameConfig object
      // FIX: Split into two separate useEffects with stable dependencies:
      //      1. Initialize once on mount (empty dependency array)
      //      2. Handle grid size changes with ref-based comparison

      // Initialize game on component mount and when grid size changes
      useEffect(() => {
        if (lastGridSizeRef.current !== gridSize) {
          lastGridSizeRef.current = gridSize;
          try {
            initializeGame();
          } catch (err) {
            console.error('Failed to initialize game:', err);
            setError(err instanceof Error ? err.message : 'Failed to initialize game');
          }
        }
      }, [gridSize]);

      // Initialize on first mount - prevents infinite loop by using empty deps
      useEffect(() => {
        try {
          initializeGame();
        } catch (err) {
          console.error('Failed to initialize game:', err);
          setError(err instanceof Error ? err.message : 'Failed to initialize game');
        }
      }, []); // Only run once on mount - CRITICAL: empty array prevents infinite loop

      const handleNewGame = () => {
        try {
          setError(null);
          initializeGame();
        } catch (err) {
          console.error('Failed to start new game:', err);
          setError(err instanceof Error ? err.message : 'Failed to start new game');
        }
      };

      const handleGridSizeChange = (newSize: 2 | 4 | 6) => {
        try {
          setError(null);
          setGridSize(newSize);
        } catch (err) {
          console.error('Failed to change grid size:', err);
          setError(err instanceof Error ? err.message : 'Failed to change grid size');
        }
      };

      const safeHandleCardClick = (cardId: number) => {
        try {
          handleCardClick(cardId);
        } catch (err) {
          console.error('Failed to handle card click:', err);
          setError(err instanceof Error ? err.message : 'Failed to handle card click');
        }
      };

      const isGameDisabled =
        gameState.gameStatus === 'won' || gameState.flippedCards.length >= config.maxFlippedCards;

      if (error) {
        return (
          <div className="advanced-game-container">
            <div
              style={{
                background: '#ffebee',
                color: '#c62828',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}
            >
              <h3>⚠️ Error in Advanced Game</h3>
              <p>{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  handleNewGame();
                }}
                style={{ padding: '0.5rem 1rem', marginTop: '0.5rem', cursor: 'pointer' }}
              >
                Try Again
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="advanced-game-container">
          {/* Grid Size Selector */}
          <GridSizeSelector
            currentSize={gridSize}
            onSizeChange={handleGridSizeChange}
            disabled={gameState.gameStatus === 'playing'}
          />

          {/* Game Controls */}
          <GameControls
            onReset={resetGame}
            onNewGame={handleNewGame}
            gameStatus={gameState.gameStatus}
            isDisabled={false}
          />

          {/* Game Stats */}
          <GameStats
            moves={gameStats.moves}
            timeElapsed={gameStats.timeElapsed}
            accuracy={gameStats.accuracy}
            remainingPairs={gameStats.remainingPairs}
            isComplete={gameStats.isComplete}
          />

          {/* Game Board */}
          <GameBoard
            cards={gameState.cards}
            onCardClick={safeHandleCardClick}
            gridSize={config.gridSize}
            isDisabled={isGameDisabled}
          />

          {/* Performance Indicator */}
          {gameState.gameStatus === 'playing' && (
            <div className="performance-indicator" role="status" aria-live="polite">
              <small>
                🚀 Advanced Framework: Optimized rendering, advanced state management,
                accessibility-first design
              </small>
            </div>
          )}
        </div>
      );
    } catch (err) {
      console.error('Critical error in Advanced Game:', err);
      return (
        <div className="advanced-game-container">
          <div
            style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <h3>⚠️ Critical Error</h3>
            <p>
              The Advanced game encountered a critical error:{' '}
              {err instanceof Error ? err.message : 'Unknown error'}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '0.5rem 1rem', marginTop: '0.5rem', cursor: 'pointer' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
  }
);

AdvancedGameBoard.displayName = 'AdvancedGameBoard';

export default AdvancedGameBoard;

import { memo, useEffect, useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import GameControls from './components/GameBoard/GameControls';
import GameStats from './components/GameBoard/GameStats';
import RADIORequirements from './components/Requirements/RADIORequirements';
import GridSizeSelector from './components/UI/GridSizeSelector';
import { useGameEngine } from './hooks/useGameEngine';
import './styles/game.css';
import './styles/requirements.css';

interface RADIOGameBoardProps {
  gridSize?: 2 | 4 | 6;
  flipDelay?: number;
}

const RADIOGameBoard = memo(
  ({ gridSize: initialGridSize = 4, flipDelay = 1000 }: RADIOGameBoardProps) => {
    const [gridSize, setGridSize] = useState<2 | 4 | 6>(initialGridSize);

    const { gameState, gameStats, initializeGame, handleCardClick, resetGame, config } =
      useGameEngine({ gridSize, flipDelay });

    // Initialize game on component mount
    useEffect(() => {
      initializeGame();
    }, [initializeGame, gridSize]);

    const handleNewGame = () => {
      initializeGame();
    };

    const handleGridSizeChange = (newSize: 2 | 4 | 6) => {
      setGridSize(newSize);
    };

    const isGameDisabled =
      gameState.gameStatus === 'won' || gameState.flippedCards.length >= config.maxFlippedCards;

    return (
      <div className="radio-game-container">
        {/* Header */}
        <div className="radio-game-header">
          <h2 className="radio-game-title">Card Flips Memory Game</h2>
          <p className="radio-game-subtitle">
            RADIO Framework Implementation - Advanced Architecture & Optimization
          </p>
        </div>

        {/* Requirements Display */}
        <RADIORequirements />

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
          onCardClick={handleCardClick}
          gridSize={config.gridSize}
          isDisabled={isGameDisabled}
        />

        {/* Performance Indicator */}
        {gameState.gameStatus === 'playing' && (
          <div className="performance-indicator" role="status" aria-live="polite">
            <small>
              🚀 RADIO Framework: Optimized rendering, advanced state management,
              accessibility-first design
            </small>
          </div>
        )}
      </div>
    );
  }
);

RADIOGameBoard.displayName = 'RADIOGameBoard';

export default RADIOGameBoard;

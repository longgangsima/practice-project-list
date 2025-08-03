import { useCallback, useEffect, useMemo, useRef } from 'react';
import { CardGeneratorService } from '../services/CardGenerator';
import { MatchingEngineService } from '../services/MatchingEngine';
import { GameConfig } from '../types/GameTypes';
import { GAME_CONFIG } from '../utils/constants';
import { useGameState } from './useGameState';

export function useGameEngine(config: Partial<GameConfig> = {}) {
  const { state, actions } = useGameState();
  const cardGenerator = useRef(CardGeneratorService.getInstance());
  const matchingEngine = useRef(MatchingEngineService.getInstance());
  const flipDelayRef = useRef<NodeJS.Timeout>();

  const gameConfig: GameConfig = useMemo(
    () => ({
      gridSize: (config.gridSize || GAME_CONFIG.DEFAULT_GRID_SIZE) as 2 | 4 | 6,
      flipDelay: config.flipDelay || GAME_CONFIG.DEFAULT_FLIP_DELAY,
      maxFlippedCards: GAME_CONFIG.MAX_FLIPPED_CARDS,
      letters: config.letters || GAME_CONFIG.LETTERS,
    }),
    [config.gridSize, config.flipDelay, config.letters]
  );

  // Initialize game
  const initializeGame = useCallback(() => {
    try {
      const cards = cardGenerator.current.generateCards(gameConfig);
      actions.initGame(cards);
    } catch (error) {
      console.error('Failed to initialize game:', error);
    }
  }, [gameConfig, actions]);

  // Handle card click
  const handleCardClick = useCallback(
    (cardId: number) => {
      if (state.gameStatus === 'idle') {
        actions.startGame();
      }

      if (state.gameStatus !== 'playing') return;

      actions.flipCard(cardId);
    },
    [state.gameStatus, actions]
  );

  // Process flipped cards for matching
  useEffect(() => {
    if (state.flippedCards.length === 2) {
      actions.incrementMoves();

      const { matches, nonMatches } = matchingEngine.current.findMatches(
        state.cards,
        state.flippedCards
      );

      if (matches.length > 0) {
        // Cards match
        actions.matchCards(matches);
      } else {
        // Cards don't match - flip back after delay
        flipDelayRef.current = setTimeout(() => {
          actions.resetFlippedCards();
        }, gameConfig.flipDelay);
      }
    }
  }, [state.flippedCards, state.cards, actions, gameConfig.flipDelay]);

  // Check for game completion
  useEffect(() => {
    if (state.gameStatus === 'playing' && matchingEngine.current.isGameComplete(state.cards)) {
      actions.winGame();
    }
  }, [state.cards, state.gameStatus, actions]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (flipDelayRef.current) {
        clearTimeout(flipDelayRef.current);
      }
    };
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    if (flipDelayRef.current) {
      clearTimeout(flipDelayRef.current);
    }
    actions.resetGame();
  }, [actions]);

  // Get game statistics
  const getGameStats = useCallback(() => {
    const totalPairs = state.cards.length / 2;
    const accuracy = matchingEngine.current.calculateAccuracy(state.moves, totalPairs);
    const remainingPairs = matchingEngine.current.getRemainingPairs(state.cards);

    return {
      moves: state.moves,
      timeElapsed: state.timeElapsed,
      accuracy,
      remainingPairs,
      isComplete: state.gameStatus === 'won',
    };
  }, [state]);

  return {
    // Game state
    gameState: state,
    gameStats: getGameStats(),

    // Actions
    initializeGame,
    handleCardClick,
    resetGame,

    // Configuration
    config: gameConfig,
  };
}

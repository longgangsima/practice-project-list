export interface Card {
  id: number;
  letter: string;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: number;
}

export interface GameConfig {
  gridSize: 2 | 4 | 6;
  flipDelay: number;
  maxFlippedCards: number;
  letters: string[];
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number;
  moves: number;
  timeElapsed: number;
  gameStatus: 'idle' | 'playing' | 'won' | 'paused';
  startTime: number | null;
}

export interface GameStats {
  moves: number;
  timeElapsed: number;
  accuracy: number;
  bestTime: number;
  gamesPlayed: number;
}

export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  componentUpdates: number;
  lastUpdate: number;
}

export type GameAction =
  | { type: 'INIT_GAME'; payload: { cards: Card[] } }
  | { type: 'FLIP_CARD'; payload: { cardId: number } }
  | { type: 'MATCH_CARDS'; payload: { cardIds: number[] } }
  | { type: 'RESET_FLIPPED_CARDS' }
  | { type: 'INCREMENT_MOVES' }
  | { type: 'START_GAME' }
  | { type: 'WIN_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'UPDATE_TIME'; payload: { time: number } };

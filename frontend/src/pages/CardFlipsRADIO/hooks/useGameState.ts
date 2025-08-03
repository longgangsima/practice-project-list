import { useCallback, useEffect, useReducer } from 'react';
import { Card, GameAction, GameState } from '../types/GameTypes';
import { GAME_CONFIG } from '../utils/constants';

const initialState: GameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  moves: 0,
  timeElapsed: 0,
  gameStatus: 'idle',
  startTime: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INIT_GAME':
      return {
        ...initialState,
        cards: action.payload.cards,
        gameStatus: 'idle',
      };

    case 'START_GAME':
      return {
        ...state,
        gameStatus: 'playing',
        startTime: Date.now(),
      };

    case 'FLIP_CARD':
      const cardId = action.payload.cardId;
      const card = state.cards[cardId];

      // Prevent flipping if card is already flipped, matched, or too many cards flipped
      if (
        card.isFlipped ||
        card.isMatched ||
        state.flippedCards.length >= GAME_CONFIG.MAX_FLIPPED_CARDS
      ) {
        return state;
      }

      return {
        ...state,
        cards: state.cards.map(c => (c.id === cardId ? { ...c, isFlipped: true } : c)),
        flippedCards: [...state.flippedCards, cardId],
      };

    case 'MATCH_CARDS':
      const matchedCardIds = action.payload.cardIds;
      return {
        ...state,
        cards: state.cards.map(card =>
          matchedCardIds.includes(card.id) ? { ...card, isMatched: true } : card
        ),
        flippedCards: [],
        matchedPairs: state.matchedPairs + 1,
      };

    case 'RESET_FLIPPED_CARDS':
      return {
        ...state,
        cards: state.cards.map(card =>
          state.flippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
        ),
        flippedCards: [],
      };

    case 'INCREMENT_MOVES':
      return {
        ...state,
        moves: state.moves + 1,
      };

    case 'WIN_GAME':
      return {
        ...state,
        gameStatus: 'won',
      };

    case 'RESET_GAME':
      return {
        ...initialState,
        cards: state.cards.map(card => ({
          ...card,
          isFlipped: false,
          isMatched: false,
        })),
      };

    case 'UPDATE_TIME':
      return {
        ...state,
        timeElapsed: action.payload.time,
      };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const initGame = useCallback((cards: Card[]) => {
    dispatch({ type: 'INIT_GAME', payload: { cards } });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const flipCard = useCallback((cardId: number) => {
    dispatch({ type: 'FLIP_CARD', payload: { cardId } });
  }, []);

  const matchCards = useCallback((cardIds: number[]) => {
    dispatch({ type: 'MATCH_CARDS', payload: { cardIds } });
  }, []);

  const resetFlippedCards = useCallback(() => {
    dispatch({ type: 'RESET_FLIPPED_CARDS' });
  }, []);

  const incrementMoves = useCallback(() => {
    dispatch({ type: 'INCREMENT_MOVES' });
  }, []);

  const winGame = useCallback(() => {
    dispatch({ type: 'WIN_GAME' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const updateTime = useCallback((time: number) => {
    dispatch({ type: 'UPDATE_TIME', payload: { time } });
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.gameStatus === 'playing' && state.startTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.startTime!) / 1000);
        updateTime(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.gameStatus, state.startTime, updateTime]);

  return {
    state,
    actions: {
      initGame,
      startGame,
      flipCard,
      matchCards,
      resetFlippedCards,
      incrementMoves,
      winGame,
      resetGame,
      updateTime,
    },
  };
}

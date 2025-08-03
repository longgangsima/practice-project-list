import { Card } from '../types/GameTypes';

/**
 * Advanced matching engine with optimized comparison algorithms
 */
export class MatchingEngineService {
  private static instance: MatchingEngineService;

  static getInstance(): MatchingEngineService {
    if (!MatchingEngineService.instance) {
      MatchingEngineService.instance = new MatchingEngineService();
    }
    return MatchingEngineService.instance;
  }

  /**
   * Check if two cards match based on letter and pair validation
   */
  checkMatch(card1: Card, card2: Card): boolean {
    if (!card1 || !card2) return false;
    if (card1.id === card2.id) return false; // Same card

    return card1.letter === card2.letter && card1.pairId === card2.pairId;
  }

  /**
   * Find matching cards in current selection
   */
  findMatches(
    cards: Card[],
    flippedCardIds: number[]
  ): {
    matches: number[];
    nonMatches: number[];
  } {
    const flippedCards = flippedCardIds.map(id => cards[id]);
    const matches: number[] = [];
    const nonMatches: number[] = [];

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;

      if (this.checkMatch(card1, card2)) {
        matches.push(card1.id, card2.id);
      } else {
        nonMatches.push(card1.id, card2.id);
      }
    }

    return { matches, nonMatches };
  }

  /**
   * Check if game is complete (all cards matched)
   */
  isGameComplete(cards: Card[]): boolean {
    return cards.every(card => card.isMatched);
  }

  /**
   * Calculate game accuracy percentage
   */
  calculateAccuracy(totalMoves: number, totalPairs: number): number {
    if (totalMoves === 0) return 0;
    const optimalMoves = totalPairs;
    return Math.max(0, Math.min(100, (optimalMoves / totalMoves) * 100));
  }

  /**
   * Get remaining pairs count
   */
  getRemainingPairs(cards: Card[]): number {
    const unmatchedCards = cards.filter(card => !card.isMatched);
    return unmatchedCards.length / 2;
  }
}

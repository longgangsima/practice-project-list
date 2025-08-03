import { Card, GameConfig } from '../types/GameTypes';
import { GAME_CONFIG } from '../utils/constants';

/**
 * Advanced card generation service with Fisher-Yates shuffle algorithm
 */
export class CardGeneratorService {
  private static instance: CardGeneratorService;

  static getInstance(): CardGeneratorService {
    if (!CardGeneratorService.instance) {
      CardGeneratorService.instance = new CardGeneratorService();
    }
    return CardGeneratorService.instance;
  }

  /**
   * Generate pairs of cards based on configuration
   */
  generateCards(config: Partial<GameConfig> = {}): Card[] {
    const { gridSize = GAME_CONFIG.DEFAULT_GRID_SIZE, letters = GAME_CONFIG.LETTERS } = config;

    const totalCards = gridSize * gridSize;
    const pairsNeeded = totalCards / 2;

    if (pairsNeeded > letters.length) {
      throw new Error(`Not enough letters for ${gridSize}x${gridSize} grid`);
    }

    const selectedLetters = letters.slice(0, pairsNeeded);
    const cardPairs: Card[] = [];

    // Create pairs
    selectedLetters.forEach((letter, index) => {
      const pairId = index;

      // First card of the pair
      cardPairs.push({
        id: index * 2,
        letter,
        isFlipped: false,
        isMatched: false,
        pairId,
      });

      // Second card of the pair
      cardPairs.push({
        id: index * 2 + 1,
        letter,
        isFlipped: false,
        isMatched: false,
        pairId,
      });
    });

    return this.shuffleCards(cardPairs);
  }

  /**
   * Fisher-Yates shuffle algorithm for optimal randomization
   */
  private shuffleCards(cards: Card[]): Card[] {
    const shuffled = [...cards];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Reassign IDs after shuffle to maintain order consistency
    return shuffled.map((card, index) => ({
      ...card,
      id: index,
    }));
  }

  /**
   * Validate card configuration
   */
  validateConfig(config: Partial<GameConfig>): boolean {
    const { gridSize = GAME_CONFIG.DEFAULT_GRID_SIZE } = config;

    // Grid size must be even for pairs
    const totalCards = gridSize * gridSize;
    if (totalCards % 2 !== 0) {
      return false;
    }

    // Must have enough letters
    const pairsNeeded = totalCards / 2;
    if (pairsNeeded > GAME_CONFIG.LETTERS.length) {
      return false;
    }

    return true;
  }
}

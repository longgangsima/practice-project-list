import { CardType } from './types';

/**
 * Generates a shuffled array of 16 cards (8 pairs) with random letters A-Z
 * Uses Fisher-Yates shuffle algorithm for proper randomization
 */
export const generateRandomCards = (): CardType[] => {
  // Generate 8 unique letters from A-Z
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const letters: string[] = [];

  // Fisher-Yates shuffle: proper random selection of 8 unique letters
  const shuffledLetters = [...allLetters]; // Create a copy
  // 通过这个for loop 的方式, 从大到小，随机生成一个random number
  // 然后与现有的index 位置对换 打乱顺序
  for (let i = shuffledLetters.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // 25, 1 -> 1, 25.
    [shuffledLetters[i], shuffledLetters[randomIndex]] = [
      shuffledLetters[randomIndex],
      shuffledLetters[i],
    ];
  }

  // Take first 8 letters from properly shuffled array
  for (let i = 0; i < 8; i++) {
    letters.push(shuffledLetters[i]);
  }

  // Create pairs of cards
  const cards: CardType[] = [];
  letters.forEach((letter, index) => {
    cards.push(
      { id: index * 2, letter, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, letter, isFlipped: false, isMatched: false }
    );
  });

  // Shuffle the cards
  return cards.sort(() => Math.random() - 0.5);
};

export interface CardType {
  id: number;
  letter: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Note: GameState and GameStats interfaces are documented in the RADIO analysis
// but not used in the current default implementation. They are preserved in
// documentation for future reference or RADIO framework implementation.

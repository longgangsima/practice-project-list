export const GAME_CONFIG = {
  DEFAULT_GRID_SIZE: 4 as const,
  DEFAULT_FLIP_DELAY: 1000,
  MAX_FLIPPED_CARDS: 2,
  LETTERS: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
  ],
  ANIMATION_DURATION: 300,
  GRID_SIZES: [2, 4, 6] as const,
  STORAGE_KEY: 'cardflips-radio-stats',
};

export const GAME_MESSAGES = {
  WIN: 'Congratulations! You won!',
  LOADING: 'Initializing game...',
  ERROR: 'Something went wrong. Please try again.',
  RESET_CONFIRM: 'Are you sure you want to reset the game?',
};

export const THEME_CONFIG = {
  PRIMARY_COLOR: '#007acc',
  SECONDARY_COLOR: '#f0f0f0',
  SUCCESS_COLOR: '#28a745',
  WARNING_COLOR: '#ffc107',
  ERROR_COLOR: '#dc3545',
};

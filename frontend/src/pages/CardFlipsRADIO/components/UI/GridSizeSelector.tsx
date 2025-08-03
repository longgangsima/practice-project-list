import { memo } from 'react';

interface GridSizeSelectorProps {
  currentSize: 2 | 4 | 6;
  onSizeChange: (size: 2 | 4 | 6) => void;
  disabled?: boolean;
}

const GridSizeSelector = memo(
  ({ currentSize, onSizeChange, disabled = false }: GridSizeSelectorProps) => {
    const sizes: Array<{ value: 2 | 4 | 6; label: string; description: string }> = [
      { value: 2, label: '2×2', description: 'Easy (4 cards)' },
      { value: 4, label: '4×4', description: 'Medium (16 cards)' },
      { value: 6, label: '6×6', description: 'Hard (36 cards)' },
    ];

    return (
      <div className="grid-size-selector" role="radiogroup" aria-label="Select grid size">
        <label className="selector-label">Grid Size:</label>
        <div className="size-options">
          {sizes.map(({ value, label, description }) => (
            <button
              key={value}
              className={`size-option ${currentSize === value ? 'active' : ''}`}
              onClick={() => onSizeChange(value)}
              disabled={disabled}
              role="radio"
              aria-checked={currentSize === value}
              aria-label={`${label} grid, ${description}`}
            >
              <span className="size-label">{label}</span>
              <span className="size-description">{description}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
);

GridSizeSelector.displayName = 'GridSizeSelector';

export default GridSizeSelector;

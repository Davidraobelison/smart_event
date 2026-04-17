import React from 'react';
import styles from './Toggle.module.css';

interface ToggleProps {
  /** État du toggle (on/off) */
  checked: boolean;
  /** Callback appelé quand le toggle change */
  onChange: (checked: boolean) => void;
  /** Libellé principal */
  label?: string;
  /** Description supplémentaire */
  description?: string;
  /** Désactiver le toggle */
  disabled?: boolean;
  /** Taille du toggle */
  size?: 'small' | 'medium' | 'large';
  /** Mode compact (sans texte) */
  compact?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'medium',
  compact = false
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div className={`${styles.toggleContainer} ${styles[size]} ${compact ? styles.compact : ''}`}>
      {!compact && (label || description) && (
        <div className={styles.labelContainer}>
          {label && (
            <span 
              className={`${styles.label} ${disabled ? styles.disabledText : ''}`}
            >
              {label}
            </span>
          )}
          {description && (
            <span 
              className={`${styles.description} ${disabled ? styles.disabledText : ''}`}
            >
              {description}
            </span>
          )}
        </div>
      )}
      
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={compact && label ? label : undefined}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`${styles.toggleButton} ${checked ? styles.checked : ''} ${
          disabled ? styles.disabled : ''
        }`}
        tabIndex={disabled ? -1 : 0}
      >
        <span className={styles.toggleThumb} />
      </button>
    </div>
  );
};

export default Toggle;
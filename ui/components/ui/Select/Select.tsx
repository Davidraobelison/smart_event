import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: string;
}

const Select: React.FC<SelectProps> = ({ 
  options, 
  value, 
  onChange, 
  label, 
  placeholder = "Sélectionner...", 
  className = "",
  fullWidth = true,
  disabled = false,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (!disabled) {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Tab':
        if (isOpen) setIsOpen(false);
        break;
    }
  };

  return (
    <div 
      className={`${styles.selectContainer} ${fullWidth ? styles.fullWidth : ''} ${className}`} 
      ref={containerRef}
    >
      {label && (
        <label className={`${styles.label} ${error ? styles.labelError : ''}`}>
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          ${styles.selectButton}
          ${isOpen ? styles.selectButtonOpen : ''}
          ${disabled ? styles.selectButtonDisabled : ''}
          ${error ? styles.selectButtonError : ''}
        `}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={label ? `${label}-label` : undefined}
      >
        <div className={styles.selectButtonContent}>
          {selectedOption?.icon && (
            <span className={styles.selectIcon}>
              {selectedOption.icon}
            </span>
          )}
          <span className={`${styles.selectLabel} ${!selectedOption ? styles.placeholder : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown 
          size={18} 
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} 
          aria-hidden="true"
        />
      </button>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {isOpen && !disabled && (
        <div 
          className={styles.dropdown}
          role="listbox"
          aria-label={label || "Options de sélection"}
        >
          <div className={styles.dropdownContent}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  ${styles.option}
                  ${value === option.value ? styles.optionSelected : ''}
                `}
                role="option"
                aria-selected={value === option.value}
              >
                <div className={styles.optionContent}>
                  {option.icon && (
                    <span className={styles.optionIcon}>
                      {option.icon}
                    </span>
                  )}
                  <span className={styles.optionLabel}>
                    {option.label}
                  </span>
                </div>
                {value === option.value && (
                  <Check 
                    size={16} 
                    className={styles.checkIcon}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
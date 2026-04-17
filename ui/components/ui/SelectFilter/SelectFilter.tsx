import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';
import styles from './SelectFilter.module.css';

export interface SelectFilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  tags?: string[];
}

interface SelectFilterProps {
  options: SelectFilterOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: string;
  showSearch?: boolean;
  showClearButton?: boolean;
  emptyMessage?: string;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ 
  options, 
  value, 
  onChange, 
  label, 
  placeholder = "Sélectionner...", 
  searchPlaceholder = "Rechercher...",
  className = "",
  fullWidth = true,
  disabled = false,
  error,
  showSearch = true,
  showClearButton = true,
  emptyMessage = "Aucun résultat trouvé"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    
    const term = searchTerm.toLowerCase();
    return options.filter(option => 
      option.label.toLowerCase().includes(term) ||
      option.description?.toLowerCase().includes(term) ||
      option.tags?.some(tag => tag.toLowerCase().includes(term))
    );
  }, [options, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current && showSearch) {
      searchInputRef.current.focus();
    }
    setSearchTerm('');
    setHighlightedIndex(-1);
  }, [isOpen, showSearch]);

  useEffect(() => {
    if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
      const optionRef = optionsRefs.current[highlightedIndex];
      if (optionRef) {
        optionRef.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, filteredOptions]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (isOpen) {
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex].value);
          }
        } else {
          setIsOpen(true);
        }
        break;
        
      case ' ':
        if (!isOpen) {
          event.preventDefault();
          setIsOpen(true);
        }
        break;
        
      case 'Escape':
        setIsOpen(false);
        break;
        
      case 'ArrowDown':
        event.preventDefault();
        if (isOpen) {
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        } else {
          setIsOpen(true);
        }
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        } else {
          setIsOpen(true);
        }
        break;
        
      case 'Tab':
        if (isOpen) setIsOpen(false);
        break;
    }
  };

  const handleSelect = (optionValue: string) => {
    if (!disabled) {
      onChange(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleClear = () => {
    onChange('');
    if (showSearch) {
      setSearchTerm('');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div 
      className={`${styles.selectFilterContainer} ${fullWidth ? styles.fullWidth : ''} ${className}`} 
      ref={containerRef}
    >
      {label && (
        <div className={styles.labelContainer}>
          <label className={`${styles.label} ${error ? styles.labelError : ''}`}>
            {label}
          </label>
          {showClearButton && value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
              aria-label="Effacer la sélection"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          ${styles.selectFilterButton}
          ${isOpen ? styles.selectFilterButtonOpen : ''}
          ${disabled ? styles.selectFilterButtonDisabled : ''}
          ${error ? styles.selectFilterButtonError : ''}
        `}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className={styles.selectFilterButtonContent}>
          {selectedOption?.icon && (
            <span className={styles.selectFilterIcon}>
              {selectedOption.icon}
            </span>
          )}
          <span className={`${styles.selectFilterLabel} ${!selectedOption ? styles.placeholder : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <div className={styles.buttonIcons}>
          {value && showClearButton && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className={styles.clearSelectionButton}
              aria-label="Effacer la sélection"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown 
            size={18} 
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} 
            aria-hidden="true"
          />
        </div>
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
          aria-label={label || "Options de sélection avec recherche"}
        >
          {showSearch && (
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className={styles.searchInput}
                  onClick={(e) => e.stopPropagation()}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className={styles.clearSearchButton}
                    aria-label="Effacer la recherche"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className={styles.searchInfo}>
                  {filteredOptions.length} résultat{filteredOptions.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          )}
          
          <div className={styles.dropdownContent}>
            {filteredOptions.length === 0 ? (
              <div className={styles.emptyMessage}>
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  ref={(el) => {
                    optionsRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    ${styles.option}
                    ${value === option.value ? styles.optionSelected : ''}
                    ${highlightedIndex === index ? styles.optionHighlighted : ''}
                  `}
                  role="option"
                  aria-selected={value === option.value}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className={styles.optionMain}>
                    {option.icon && (
                      <span className={styles.optionIcon}>
                        {option.icon}
                      </span>
                    )}
                    <div className={styles.optionContent}>
                      <span className={styles.optionLabel}>
                        {option.label}
                      </span>
                      {option.description && (
                        <span className={styles.optionDescription}>
                          {option.description}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.optionFooter}>
                    {option.tags && option.tags.length > 0 && (
                      <div className={styles.tags}>
                        {option.tags.map((tag, i) => (
                          <span key={i} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {value === option.value && (
                      <Check 
                        size={16} 
                        className={styles.checkIcon}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectFilter;
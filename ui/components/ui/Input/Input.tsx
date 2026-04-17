// File: Input.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, Calendar, Clock, Search, Check, X } from 'lucide-react';
import styles from './Input.module.css';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week'
  | 'range'
  | 'color'
  | 'file'
  | 'textarea'
  | 'checkbox'
  | 'radio';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  type?: InputType;
  label?: string;
  placeholder?: string;
  error?: string;
  success?: string;
  helperText?: string;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  checked?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClear?: () => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  error,
  success,
  helperText,
  fullWidth = true,
  iconLeft,
  iconRight,
  clearable = false,
  disabled = false,
  required = false,
  rows = 3,
  maxLength,
  min,
  max,
  step,
  checked = false,
  value = '',
  onChange,
  onClear,
  className = '',
  id,   // extracted id
  name, // extracted name
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isPassword = type === 'password';
  const isTextarea = type === 'textarea';
  const isDateType = ['date', 'datetime-local', 'month', 'time', 'week'].includes(type);
  const isSearch = type === 'search';
  const isCheckbox = type === 'checkbox';
  const isRadio = type === 'radio';
  const isBooleanType = isCheckbox || isRadio;
  const hasValue = value !== undefined && value !== '' && value !== null;
  const showClearButton = clearable && hasValue && !disabled && !isDateType && !isBooleanType;

  // id stable pour aria/descriptions et pour label/htmlFor
  const idRef = useRef<string>(id || `input-${Math.random().toString(36).slice(2, 9)}`);
  const descriptionId = `${idRef.current}-description`;

  useEffect(() => {
    if (typeof value === 'string') {
      setCharCount(value.length);
    } else if (typeof value === 'number') {
      setCharCount(value.toString().length);
    }
  }, [value]);

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      const event = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
      onChange(event);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (isPassword && showPassword) return 'text';
    return type;
  };

  const renderIconLeft = () => {
    if (iconLeft) return iconLeft;

    if (isSearch) {
      return <Search size={18} className={styles.searchIcon} />;
    }

    if (isDateType) {
      if (type === 'time') return <Clock size={18} />;
      return <Calendar size={18} />;
    }

    return null;
  };

  const renderIconRight = () => {
    if (iconRight) return iconRight;

    if (isPassword) {
      const Icon = showPassword ? EyeOff : Eye;
      return (
        <button
          type="button"
          onClick={handleTogglePassword}
          className={styles.iconButton}
          tabIndex={-1}
          aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          <Icon size={18} />
        </button>
      );
    }

    if (showClearButton) {
      return (
        <button
          type="button"
          onClick={handleClear}
          className={styles.iconButton}
          tabIndex={-1}
          aria-label="Effacer"
        >
          <X size={18} />
        </button>
      );
    }

    if (success) {
      return <Check size={18} className={styles.successIcon} />;
    }

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      return;
    }

    if (onChange) {
      onChange(e);
    }
  };

  const renderCheckboxRadio = () => {
    const inputId = idRef.current;

    return (
      <label
        className={`${styles.checkboxRadioContainer} ${disabled ? styles.disabledLabel : ''}`}
        htmlFor={inputId}
      >
        <input
          ref={inputRef}
          id={inputId}
          type={type}
          name={name}
          value={value as string | undefined}
          checked={checked}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={styles.checkboxRadioInput}
          aria-invalid={!!error}
          aria-describedby={helperText || error ? descriptionId : undefined}
          {...props}
        />

        <span
          className={styles.checkboxRadioCustom}
          data-type={isRadio ? 'radio' : 'checkbox'}
          aria-hidden="true"
        >
          {isCheckbox && <Check size={12} className={styles.checkboxCheck} />}
          {isRadio && <span className={styles.radioDot} />}
        </span>

        {label && (
          <span className={styles.checkboxRadioLabel}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </span>
        )}
      </label>
    );
  };

  const renderInput = () => {
    if (isBooleanType) {
      return renderCheckboxRadio();
    }

    // common props for non-boolean inputs (we avoid setting `value` on file inputs)
    const commonProps: any = {
      id: idRef.current,
      name,
      ref: inputRef,
      placeholder,
      disabled,
      required,
      maxLength,
      min,
      max,
      step,
      onChange: handleChange,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      className: `${styles.input} ${isTextarea ? styles.textarea : ''} ${error ? styles.inputError : ''} ${
        success ? styles.inputSuccess : ''
      }`,
      'aria-invalid': !!error,
      'aria-describedby': helperText || error ? descriptionId : undefined,
      ...props,
    };

    // only set value for non-file inputs
    if (type !== 'file') {
      commonProps.value = value as any;
    }

    if (isTextarea) {
      return (
        <textarea
          ref={textareaRef}
          rows={rows}
          value={value as any}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''} ${
            success ? styles.inputSuccess : ''
          }`}
          aria-invalid={!!error}
          aria-describedby={helperText || error ? descriptionId : undefined}
        />
      );
    }

    if (type === 'range') {
      return (
        <div className={styles.rangeContainer}>
          <input {...commonProps} type="range" className={`${styles.input} ${styles.rangeInput}`} />
          <div className={styles.rangeValue}>{value}</div>
        </div>
      );
    }

    if (type === 'color') {
      return (
        <div className={styles.colorContainer}>
          <input {...commonProps} type="color" className={`${styles.input} ${styles.colorInput}`} />
          <span className={styles.colorValue}>{value}</span>
        </div>
      );
    }

    if (type === 'file') {
      // file inputs should not receive value prop
      const fileProps = { ...commonProps } as any;
      delete fileProps.value;
      return (
        <div className={styles.fileContainer}>
          <input {...fileProps} type="file" className={`${styles.input} ${styles.fileInput}`} />
          <div className={styles.fileLabel}>{hasValue ? (value as string) : placeholder || 'Choisir un fichier'}</div>
        </div>
      );
    }

    return <input {...commonProps} type={getInputType()} />;
  };

  if (isBooleanType) {
    return (
      <div className={`${styles.inputContainer} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
        {renderCheckboxRadio()}

        {(helperText || error || success) && (
          <div className={styles.footer}>
            <div className={styles.helperContainer}>
              {error && (
                <span className={styles.errorText} id={descriptionId}>
                  {error}
                </span>
              )}
              {success && !error && (
                <span className={styles.successText} id={descriptionId}>
                  {success}
                </span>
              )}
              {helperText && !error && !success && (
                <span className={styles.helperText} id={descriptionId}>
                  {helperText}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${styles.inputContainer} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
      {label && !isBooleanType && (
        <label className={styles.label} htmlFor={idRef.current}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div
        className={`
        ${styles.inputWrapper}
        ${isFocused ? styles.focused : ''}
        ${error ? styles.error : ''}
        ${success ? styles.success : ''}
        ${disabled ? styles.disabled : ''}
        ${iconLeft ? styles.hasIconLeft : ''}
        ${iconRight || showClearButton || isPassword || success ? styles.hasIconRight : ''}
      `}
      >
        {renderIconLeft() && <div className={styles.iconLeft}>{renderIconLeft()}</div>}

        {renderInput()}

        {renderIconRight() && <div className={styles.iconRight}>{renderIconRight()}</div>}
      </div>

      {(helperText || error || success || maxLength) && !isBooleanType && (
        <div className={styles.footer}>
          <div className={styles.helperContainer}>
            {error && (
              <span className={styles.errorText} id={descriptionId}>
                {error}
              </span>
            )}
            {success && !error && (
              <span className={styles.successText} id={descriptionId}>
                {success}
              </span>
            )}
            {helperText && !error && !success && (
              <span className={styles.helperText} id={descriptionId}>
                {helperText}
              </span>
            )}
          </div>

          {maxLength && (
            <div className={styles.charCounter}>
              <span className={charCount > maxLength * 0.9 ? styles.charCounterWarning : ''}>{charCount}</span>
              / {maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;

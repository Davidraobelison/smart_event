import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'blue'
  | 'outline'
  | 'ghost';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  dotColor?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  dotColor,
  rounded = 'full',
  removable = false,
  onRemove,
  className = '',
  icon,
  ...props
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  const badgeClasses = [
    styles.badge,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`rounded-${rounded}`],
    className,
  ].filter(Boolean).join(' ');

  const renderDot = () => {
    if (!dot) return null;

    const dotStyle = dotColor ? { backgroundColor: dotColor } : undefined;

    return (
      <span
        className={styles.dot}
        style={dotStyle}
        aria-hidden="true"
      />
    );
  };

  const renderIcon = () => {
    if (!icon) return null;
    return <span className={styles.icon}>{icon}</span>;
  };

  return (
    <span
      className={badgeClasses}
      {...props}
    >
      <span className={styles.content}>
        {renderDot()}
        {renderIcon()}
        <span className={styles.text}>{children}</span>
      </span>
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          className={styles.removeButton}
          aria-label="Supprimer le badge"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </span>
  );
};

export default Badge;
import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle' | 'avatar' | 'card' | 'list';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
  count?: number;
  borderRadius?: string | number;
  fullWidth?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  animation = 'pulse',
  className = '',
  count = 1,
  borderRadius,
  fullWidth = false,
  style,
  ...props
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => {
    const skeletonStyle: React.CSSProperties = {
      width: width || undefined,
      height: height || undefined,
      borderRadius: borderRadius || undefined,
      ...style,
    };

    const skeletonClasses = [
      styles.skeleton,
      styles[`variant-${variant}`],
      styles[`animation-${animation}`],
      fullWidth ? styles.fullWidth : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div
        key={index}
        className={skeletonClasses}
        style={skeletonStyle}
        {...props}
        aria-label="Chargement en cours"
      />
    );
  });

  if (count === 1) {
    return skeletons[0];
  }

  return <>{skeletons}</>;
};

// Composant SkeletonText pour le texte
export interface SkeletonTextProps extends Omit<SkeletonProps, 'variant'> {
  lines?: number;
  lineHeight?: string | number;
  spacing?: string | number;
  lastLineWidth?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lineHeight = '1rem',
  spacing = '0.5rem',
  lastLineWidth = '60%',
  ...props
}) => {
  return (
    <div className={styles.textContainer}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : '100%'}
          style={{
            height: lineHeight,
            marginBottom: index < lines - 1 ? spacing : undefined,
          }}
          {...props}
        />
      ))}
    </div>
  );
};

// Composant SkeletonAvatar pour les avatars
export interface SkeletonAvatarProps extends Omit<SkeletonProps, 'variant'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 'md',
  ...props
}) => {
  const sizeMap = {
    sm: '2rem',
    md: '3rem',
    lg: '4rem',
    xl: '5rem',
  };

  return (
    <Skeleton
      variant="circle"
      width={sizeMap[size]}
      height={sizeMap[size]}
      {...props}
    />
  );
};

// Composant SkeletonCard pour les cartes
export const SkeletonCard: React.FC<SkeletonProps> = (props) => {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton variant="rect" height="160px" borderRadius="8px" {...props} />
      <div className={styles.cardContent}>
        <SkeletonText lines={2} />
        <div className={styles.cardFooter}>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="20%" />
        </div>
      </div>
    </div>
  );
};

// Composant SkeletonList pour les listes
export interface SkeletonListProps {
  items?: number;
  withAvatar?: boolean;
  avatarSize?: SkeletonAvatarProps['size'];
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
  items = 5,
  withAvatar = true,
  avatarSize = 'md',
}) => {
  return (
    <div className={styles.listContainer}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className={styles.listItem}>
          {withAvatar && <SkeletonAvatar size={avatarSize} />}
          <div className={styles.listContent}>
            <SkeletonText lines={2} lastLineWidth="40%" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Exporter tout
export default Object.assign(Skeleton, {
  Text: SkeletonText,
  Avatar: SkeletonAvatar,
  Card: SkeletonCard,
  List: SkeletonList,
});
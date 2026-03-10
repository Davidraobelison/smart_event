import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  bordered?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  hoverable = false,
  clickable = false,
  bordered = true,
  shadow = 'sm',
  radius = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickable && onClick) {
      onClick(e);
    }
  };

  const cardClasses = [
    styles.card,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`shadow-${shadow}`],
    styles[`radius-${radius}`],
    hoverable ? styles.hoverable : '',
    clickable ? styles.clickable : '',
    bordered ? styles.bordered : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={clickable ? handleClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Sous-composant CardHeader
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  divider = false,
  ...props
}) => {
  return (
    <div
      className={`${styles.cardHeader} ${divider ? styles.withDivider : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Sous-composant CardTitle
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  as: Tag = 'h3',
  ...props
}) => {
  return (
    <Tag className={`${styles.cardTitle} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

// Sous-composant CardDescription
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <p className={`${styles.cardDescription} ${className}`} {...props}>
      {children}
    </p>
  );
};

// Sous-composant CardBody
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  padded = true,
  ...props
}) => {
  return (
    <div
      className={`${styles.cardBody} ${padded ? styles.padded : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Sous-composant CardFooter
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
  align?: 'start' | 'center' | 'end' | 'space-between';
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  divider = false,
  align = 'start',
  ...props
}) => {
  return (
    <div
      className={`${styles.cardFooter} ${divider ? styles.withDivider : ''} ${styles[`align-${align}`]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Sous-composant CardImage
export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  cover?: boolean;
}

export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className = '',
  cover = false,
  ...props
}) => {
  return (
    <div className={`${styles.cardImageContainer} ${cover ? styles.cover : ''}`}>
      <img
        src={src}
        alt={alt}
        className={`${styles.cardImage} ${className}`}
        {...props}
      />
    </div>
  );
};

// Sous-composant CardIcon
export interface CardIconProps {
  icon: React.ReactNode;
  className?: string;
}

export const CardIcon: React.FC<CardIconProps> = ({ icon, className = '' }) => {
  return (
    <div className={`${styles.cardIcon} ${className}`}>
      {icon}
    </div>
  );
};

// Sous-composant CardBadge
export interface CardBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const CardBadge: React.FC<CardBadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  return (
    <span className={`${styles.cardBadge} ${styles[`badge-${variant}`]} ${className}`}>
      {children}
    </span>
  );
};

// Sous-composant CardAction
export interface CardActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'ghost' | 'outline';
}

export const CardAction: React.FC<CardActionProps> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  return (
    <button
      className={`${styles.cardAction} ${styles[`action-${variant}`]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Exporter tous les sous-composants avec Card
export default Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
  Image: CardImage,
  Icon: CardIcon,
  Badge: CardBadge,
  Action: CardAction,
});
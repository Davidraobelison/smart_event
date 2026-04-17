"use client";

import React from 'react';
import type { ComponentType } from 'react';
import styles from './StatsCard.module.css';

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ComponentType<{ size?: number; className?: string }>;
  /** Couleur CSS variable sans le préfixe : ex "primary", "success", "danger" */
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'blue';
  trend?: {
    value: number;
    label?: string;
  };
  className?: string;
}

const colorMap: Record<NonNullable<StatsCardProps['color']>, { bg: string; text: string }> = {
  primary: { bg: 'rgba(255,147,79,0.1)', text: 'var(--color-primary)' },
  success: { bg: 'rgba(36,180,126,0.1)', text: 'var(--color-success)' },
  warning: { bg: 'rgba(255,176,32,0.1)', text: 'var(--color-warning)' },
  danger:  { bg: 'rgba(239,83,80,0.1)',  text: 'var(--color-danger)' },
  info:    { bg: 'rgba(124,92,255,0.1)', text: 'var(--color-info)' },
  blue:    { bg: 'rgba(47,107,255,0.1)', text: 'var(--color-blue, #2f6bff)' },
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'primary',
  trend,
  className = '',
}) => {
  const { bg, text } = colorMap[color];
  const isPositive = trend && trend.value >= 0;

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.iconBox} style={{ backgroundColor: bg, color: text }}>
        <Icon size={24} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value}</p>
        {trend && (
          <p className={`${styles.trend} ${isPositive ? styles.trendUp : styles.trendDown}`}>
            <span>{isPositive ? '▲' : '▼'} {Math.abs(trend.value)}%</span>
            {trend.label && <span className={styles.trendLabel}> {trend.label}</span>}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

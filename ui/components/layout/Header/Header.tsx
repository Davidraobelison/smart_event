import React, { useState } from 'react';
import { Bell, Search, Moon, Sun, Sparkles, Menu } from 'lucide-react';

import styles from './Header.module.css';

export interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  onMenuClick?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  notifications?: number;
  onNotificationsClick?: () => void;
  language?: string;
  onLanguageClick?: () => void;
  sticky?: boolean;
  className?: string;
}

/**
 * Header réutilisable et stylable via CSS variables (_variables.css).
 * Aucun dépendance à un contexte global — tout passe par props.
 */
const Header: React.FC<HeaderProps> = ({
  title,
  showSearch = true,
  searchPlaceholder = 'Rechercher...',
  onSearch,
  onMenuClick,
  theme = 'light',
  onToggleTheme,
  notifications = 0,
  onNotificationsClick,
  language = 'fr',
  onLanguageClick,
  sticky = true,
  className = '',
}) => {
  const [query, setQuery] = useState('');

  function handleSubmitSearch(e?: React.FormEvent) {
    e?.preventDefault();
    onSearch?.(query.trim());
  }

  return (
    <header
      className={`${styles.header} ${sticky ? styles.sticky : ''} ${className}`}
      role="banner"
    >
      <div className={styles.left}>
        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={onMenuClick}
          className={styles.menuButton}
        >
          <Menu size={22} />
        </button>

        <div className={styles.headerBrand}>
          <div className={styles.brandIconBox}>
            <Sparkles className={styles.brandIcon} size={18} />
          </div>
          <span className={styles.brandTitle}>SmartEvent</span>
        </div>

        {showSearch && (
          <form className={styles.searchWrapper} onSubmit={handleSubmitSearch} role="search" aria-label="Recherche">
            <Search className={styles.searchIcon} size={16} aria-hidden />
            <input
              className={styles.searchInput}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label="Recherche"
            />
            <button type="submit" className={styles.searchSubmit} aria-label="Lancer la recherche">
              <Search size={16} />
            </button>
          </form>
        )}
      </div>



      <div className={styles.right}>
        <button
          type="button"
          title="Basculer le thème"
          onClick={onToggleTheme}
          className={styles.iconButton}
          aria-pressed={theme === 'dark'}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button
          type="button"
          title="Notifications"
          onClick={onNotificationsClick}
          className={styles.iconButton}
          aria-label={`Notifications, ${notifications} non lues`}
        >
          <Bell size={18} />
          {notifications > 0 && <span className={styles.badge} aria-hidden />}
        </button>

        <div className={styles.divider} aria-hidden />

        <button
          type="button"
          onClick={() => onLanguageClick?.()}
          className={styles.lang}
          aria-label="Changer la langue"
        >
          <span className={styles.langText}>{language.toUpperCase()}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

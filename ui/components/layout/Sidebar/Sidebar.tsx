import React from 'react';
import styles from './Sidebar.module.css';
import type { ComponentType, ReactNode } from 'react';
import { X, User } from 'lucide-react';

/** Menu item icon signature (lucide-react or any icon component that accepts size/color) */
export type IconComp = ComponentType<{ size?: number; color?: string; className?: string }>;

export interface MenuItem {
  path: string;
  label: string;
  icon?: IconComp;
  roles?: readonly string[]; // optional roles filter handled by consumer
}

/** Minimal user shape used by the sidebar */
export interface SidebarUser {
  id?: string | number;
  name?: string;
  role?: string;
  avatar?: string;
}

/** Signature minimale pour un LinkComponent optionnel */
export type LinkComponentProps = {
  to: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  'aria-current'?: string | undefined;
};
export type LinkComponent = ComponentType<LinkComponentProps>;

export interface SidebarProps {
  menuItems: readonly MenuItem[];
  /** Filtre appliqué côté parent (ex : user.role) — si fourni, le Sidebar affichera uniquement les menuItems dont roles incluent this value */
  user?: SidebarUser;
  /** Chemin courant pour déterminer l'élément actif (ex: location.pathname) */
  currentPath?: string;
  /** Mobile state */
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
  /** Brand */
  brandTitle?: string;
  brandIcon?: IconComp;
  /** Provide a LinkComponent (ex: react-router Link). If omitted, <a href> is used. */
  LinkComponent?: LinkComponent;
  /** Inline style (use to override CSS variables like --sidebar-accent) */
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Sidebar réutilisable, accessible et stylable.
 * - Color primary override: pass style={{ '--sidebar-accent': '#ff7a00' } as React.CSSProperties}
 * - To use react-router Link: pass LinkComponent={Link}
 */
const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  user,
  currentPath = '/',
  mobileOpen = false,
  onCloseMobile,
  onLogout,
  brandTitle = 'SmartEvent',
  brandIcon,
  LinkComponent,
  style,
  className = '',
}) => {
  const filtered = menuItems.filter((m) =>
    !m.roles || !user?.role ? true : m.roles.includes(user.role ?? '')
  );

  const LinkOrA: LinkComponent = LinkComponent ?? (({ to, children, onClick, className }) => (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={to} onClick={onClick} className={className}>
      {children}
    </a>
  ));

  return (
    <>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className={styles.overlay}
          onClick={onCloseMobile}
          aria-hidden
        />
      )}

      <aside
        className={`${styles.sidebar} ${mobileOpen ? styles.open : styles.closed} ${className}`}
        style={style}
        aria-label="Sidebar"
      >
        <div className={styles.header}>
          <div className={styles.brand}>
            {brandIcon ? (
              <>
                <div className={styles.brandIcon}>
                  {React.createElement(brandIcon, { size: 20 })}
                </div>
                <div className={styles.brandTitle}>{brandTitle}</div>
              </>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="SmartEvent" style={{ height: "36px", width: "auto" }} />
                <div className={styles.brandTitle}>{brandTitle}</div>
              </>
            )}
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onCloseMobile}
            aria-label="Fermer le menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          {filtered.map((item) => {
            const isActive =
              item.path === currentPath || (item.path !== '/' && currentPath.startsWith(item.path));
            const itemClass = `${styles.navItem} ${isActive ? styles.active : ''}`;

            return (
              <LinkOrA
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={itemClass}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon ? React.createElement(item.icon, { size: 18, className: styles.navIcon }) : null}
                <span className={styles.navLabel}>{item.label}</span>
              </LinkOrA>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <div className={styles.profileCard}>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name ?? 'avatar'}
                className={styles.avatar}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <User size={20} />
              </div>
            )}
            <div className={styles.profileMeta}>
              <div className={styles.profileName}>{user?.name ?? 'Invité'}</div>
              <div className={styles.profileRole}>{user?.role ?? ''}</div>
            </div>
          </div>

          <button
            type="button"
            className={styles.logout}
            onClick={onLogout}
            aria-label="Se déconnecter"
          >
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

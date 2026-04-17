import React from 'react';
import styles from './DynamicTable.module.css';
import Skeleton from '../Skeleton/Skeleton';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DynamicTableProps<T extends { id: string | number }> {
  columns: readonly Column<T>[];
  data: readonly T[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  /**
   * Number of skeleton rows to show when isLoading === true.
   * Optional — default = 5
   */
  loadingRows?: number;
}

function DynamicTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  isLoading = false,
  loadingRows = 5,
}: DynamicTableProps<T>) {
  // Render loading skeleton (table layout)
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <table className={styles.table} aria-busy="true" aria-live="polite">
          <thead className={styles.head}>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className={`${styles.th} ${styles[col.align ?? 'left']} ${col.className ?? ''}`}
                >
                  {/* header text as skeleton for a more consistent look */}
                  <Skeleton variant="text" width="60%" height="0.9rem" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styles.body}>
            {Array.from({ length: loadingRows }).map((_, rowIndex) => (
              <tr key={`skeleton-row-${rowIndex}`} className={styles.row}>
                {columns.map((col) => (
                  <td key={`${String(col.accessor)}-${rowIndex}`} className={`${styles.td} ${styles[col.align ?? 'left']}`}>
                    {/* For first column show a circle-avatar-like skeleton to mimic avatar+text if needed */}
                    {col === columns[0] ? (
                      <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                        <Skeleton variant="circle" width="36px" height="36px" />
                        <div style={{ flex: 1 }}>
                          <Skeleton variant="text" width="80%" height="0.9rem" style={{ marginBottom: '6px' }} />
                          <Skeleton variant="text" width="40%" height="0.75rem" />
                        </div>
                      </div>
                    ) : (
                      <Skeleton variant="text" width="70%" height="0.9rem" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Normal rendering
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className={`${styles.th} ${styles[col.align ?? 'left']} ${col.className ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.body}>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={`${styles.row} ${onRowClick ? styles.clickable : ''}`}
            >
              {columns.map((col) => (
                <td key={String(col.accessor)} className={`${styles.td} ${styles[col.align ?? 'left']}`}>
                  {col.render ? col.render(item) : String(item[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;

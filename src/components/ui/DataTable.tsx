import React from 'react';

export interface Column<T = any> {
  header?: string;
  label?: string;
  key?: string;
  accessor?: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

export interface DataTableProps<T = any> {
  columns: Column<T>[];
  data?: T[];
  rows?: T[];
  className?: string;
}

export default function DataTable<T = any>({
  columns,
  data,
  rows,
  className = '',
}: DataTableProps<T>) {
  const tableRows = data || rows || [];

  return (
    <div className={`bg-paper rounded-sm border border-line overflow-x-auto ${className}`}>
      <table className="w-full text-left border-collapse text-sm text-ink font-body">
        <thead>
          <tr className="bg-wash border-b border-line text-xs font-semibold text-ink">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3 px-4 ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.header || col.label || col.key || ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {tableRows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-wash/50 transition-colors">
              {columns.map((col, colIdx) => {
                const cellValue = col.accessor
                  ? col.accessor(row)
                  : col.key
                  ? (row as any)[col.key]
                  : null;

                return (
                  <td
                    key={colIdx}
                    className={`py-3 px-4 ${
                      col.align === 'right'
                        ? 'text-right tabular-nums font-medium'
                        : col.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                    }`}
                  >
                    {cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

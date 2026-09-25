import React from 'react';

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export default function DataTable<T>({ columns, data, className = '' }: DataTableProps<T>) {
  return (
    <div className={`bg-paper rounded-md border border-line overflow-x-auto ${className}`}>
      <table className="w-full text-left border-collapse text-sm text-ink">
        <thead>
          <tr className="bg-wash border-b border-line text-xs font-semibold text-ink">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3 px-4 ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-wash/50 transition-colors">
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className={`py-3 px-4 ${
                    col.align === 'right'
                      ? 'text-right tabular-nums'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

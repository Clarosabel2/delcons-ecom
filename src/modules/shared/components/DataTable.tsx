import React from "react";

export interface DataTableColumn<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
    hideOnMobile?: boolean;
}

export interface DataTableAction<T> {
    label: string;
    icon?: React.ReactNode;
    onClick: (row: T) => void;
    className?: string;
}

interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    actions?: DataTableAction<T>[];
    selectable?: boolean;
}

function DataTable<T extends { id?: string | number }>({
    columns,
    data,
    actions = [],
    selectable = false,
}: DataTableProps<T>) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Responsive container with horizontal scroll */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {selectable && (
                                <th className="px-3 sm:px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key as string}
                                    className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                        col.className || ""
                                    } ${col.hideOnMobile ? 'hidden sm:table-cell' : ''}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                            {actions.length > 0 && (
                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={
                                        columns.length +
                                        (actions.length > 0 ? 1 : 0) +
                                        (selectable ? 1 : 0)
                                    }
                                    className="px-3 sm:px-6 py-4 text-center text-gray-400 text-sm"
                                >
                                    Sin datos
                                </td>
                            </tr>
                        ) : (
                            data.map((row, idx) => (
                                <tr key={row.id || idx} className="hover:bg-gray-50">
                                    {selectable && (
                                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td
                                            key={col.key as string}
                                            className={`px-3 sm:px-6 py-4 text-sm ${
                                                col.className || ""
                                            } ${col.hideOnMobile ? 'hidden sm:table-cell' : ''}`}
                                        >
                                            {col.render
                                                ? col.render(row)
                                                : (row[
                                                      col.key as keyof T
                                                  ] as React.ReactNode)}
                                        </td>
                                    ))}
                                    {actions.length > 0 && (
                                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                                                {actions.map((action) => (
                                                    <button
                                                        key={action.label}
                                                        className={`p-1 sm:p-2 rounded transition-colors ${
                                                            action.className ||
                                                            "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                                        }`}
                                                        onClick={() =>
                                                            action.onClick(row)
                                                        }
                                                        title={action.label}
                                                    >
                                                        {action.icon ||
                                                            action.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;

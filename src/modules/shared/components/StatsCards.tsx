import React from "react";

export interface StatCardItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string; // tailwind color, ej: 'text-blue-600'
}

interface StatsCardsProps {
  stats: StatCardItem[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={stat.label + idx}
          className="bg-white rounded-lg shadow p-6 flex items-center gap-4"
        >
          {stat.icon && (
            <span className={`text-3xl ${stat.color || 'text-blue-600'}`}>{stat.icon}</span>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards; 
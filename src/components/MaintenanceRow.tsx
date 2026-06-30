import type { MaintenanceRecord } from '../types';

interface MaintenanceRowProps {
  record: MaintenanceRecord;
  onDelete: (id: string) => void;
}

export function MaintenanceRow({ record, onDelete }: MaintenanceRowProps) {
  const categoryLabels = {
    Engine: '🔧 Двиг.',
    Brakes: '🛑 Торм.',
    Detailing: '✨ Детейл.',
    Other: '📁 Другое',
  };

  return (
    <tr className="hover:bg-gray-50/70 transition-colors">
      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{record.date}</td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{categoryLabels[record.category]}</td>
      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{record.mileage.toLocaleString()} км</td>
      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{record.description}</td>
      <td className="px-6 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">{record.cost.toLocaleString()} €</td>
      <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
        <button 
          onClick={() => onDelete(record.id)} 
          className="text-red-500 hover:text-red-700 font-semibold text-xs cursor-pointer"
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}
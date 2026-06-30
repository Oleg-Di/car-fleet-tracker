import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarStore } from '../store/useCarStore';
import { MaintenanceForm } from '../components/MaintenanceForm';
import { MaintenanceRow } from '../components/MaintenanceRow';
import type { MaintenanceCategory } from '../types';

type FilterType = MaintenanceCategory | 'All';

export function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { cars, deleteCar, deleteRecord } = useCarStore();
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  // Находим машину
  const car = cars.find(c => c.id === id);

  if (!car) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Машина не найдена</h2>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">Вернуться в гараж</Link>
      </div>
    );
  }

  // Фильтруем записи этой конкретной машины
  const filteredRecords = car.records.filter(record => {
    if (activeFilter === 'All') return true;
    return record.category === activeFilter;
  });

  const totalCost = filteredRecords.reduce((sum, item) => sum + item.cost, 0);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'All', label: '📊 Все' },
    { value: 'Engine', label: '🔧 Двигатель' },
    { value: 'Brakes', label: '🛑 Тормоза' },
    { value: 'Detailing', label: '✨ Детейлинг' },
    { value: 'Other', label: '📁 Другое' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">← Назад в гараж</Link>
        <button 
          onClick={() => {
            if (confirm(`Удалить ${car.brand} из гаража? Все данные будут стерты.`)) {
              deleteCar(car.id);
              window.location.href = '/';
            }
          }}
          className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer"
        >
          Удалить машину
        </button>
      </div>

      {/* Панель информации о машине */}
      <header className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
          <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs font-mono font-bold">
            {car.plateNumber || 'БЕЗ НОМЕРА'}
          </span>
          <h1 className="text-3xl font-black text-gray-950 mt-2">{car.brand} {car.model}</h1>
          <p className="text-sm text-gray-500 mt-1">Год выпуска: {car.year} | Пробег: {car.currentMileage.toLocaleString()} км</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-400 uppercase">Потрачено в категории</p>
          <p className="text-2xl font-black text-gray-950 mt-1">{totalCost.toLocaleString()} €</p>
        </div>
      </header>

      {/* Форма добавления */}
      <MaintenanceForm carId={car.id} />

      {/* Переключатели фильтров */}
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
              activeFilter === filter.value
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Таблица расходов */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 text-left">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Дата</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Категория</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Пробег</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Описание</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Цена</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-400">
                    История обслуживания пуста.
                  </td>
                </tr>
              ) : (
                filteredRecords.map(record => (
                  <MaintenanceRow 
                    key={record.id} 
                    record={record} 
                    onDelete={(recordId) => deleteRecord(car.id, recordId)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
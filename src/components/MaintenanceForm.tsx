import { useState } from 'react';
import type { MaintenanceCategory } from '../types';
import { useCarStore } from '../store/useCarStore';

interface MaintenanceFormProps {
  carId: string;
}

export function MaintenanceForm({ carId }: MaintenanceFormProps) {
  const { addRecord } = useCarStore();
  
  const [category, setCategory] = useState<MaintenanceCategory>('Engine');
  const [mileage, setMileage] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mileage || !description || !cost) return;

    addRecord(carId, {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('ru-RU'),
      category,
      mileage: Number(mileage),
      description,
      cost: Number(cost),
    });

    // Очищаем только описание и стоимость, пробег оставляем для удобства
    setDescription('');
    setCost('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Добавить запись об обслуживании</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Категория</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value as MaintenanceCategory)}
            className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm bg-white"
          >
            <option value="Engine">🔧 Двигатель</option>
            <option value="Brakes">🛑 Тормоза</option>
            <option value="Detailing">✨ Детейлинг</option>
            <option value="Other">📁 Другое</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Пробег (км)</label>
          <input 
            type="number" 
            value={mileage} 
            onChange={(e) => setMileage(e.target.value)} 
            placeholder="0" 
            className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm" 
            required 
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Стоимость (€)</label>
          <input 
            type="number" 
            value={cost} 
            onChange={(e) => setCost(e.target.value)} 
            placeholder="0" 
            className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm" 
            required 
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase">Описание работы</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Замена масла, полировка кузова..." 
          className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm" 
          required 
        />
      </div>

      <button type="submit" className="w-full bg-gray-900 text-white p-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer">
        Сохранить запись
      </button>
    </form>
  );
}
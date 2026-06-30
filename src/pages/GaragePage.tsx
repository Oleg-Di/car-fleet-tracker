import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarStore } from '../store/useCarStore';

export function GaragePage() {
  const { cars, addCar } = useCarStore();
  
  // Стейт для формы новой машины
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [mileage, setMileage] = useState(0);
  const [plate, setPlate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !model) return;

    addCar({
      id: crypto.randomUUID(),
      brand,
      model,
      year,
      currentMileage: mileage,
      plateNumber: plate,
    });

    // Очищаем форму
    setBrand('');
    setModel('');
    setPlate('');
  };

  return (
    <div className="space-y-8">
      <header className="text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-black text-gray-950 tracking-tight">💼 Мой Автопарк</h1>
        <p className="mt-2 text-gray-600">Управляйте расходами и обслуживанием всех автомобилей в одном месте</p>
      </header>

      {/* Форма добавления автомобиля */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Добавить автомобиль</h2>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Марка</label>
          <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Например: Lynk & Co" className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm" required />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Модель</label>
          <input type="text" value={model} onChange={e => setModel(e.target.value)} placeholder="Например: 01" className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm" required />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Год выпуска</label>
          <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Текущий пробег (км)</label>
          <input type="number" value={mileage} onChange={e => setMileage(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm" />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase">Госномер</label>
          <input type="text" value={plate} onChange={e => setPlate(e.target.value)} placeholder="Например: 1234 ABC" className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm" />
        </div>
        <button type="submit" className="col-span-2 mt-2 bg-blue-600 text-white p-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors cursor-pointer">
          Добавить в гараж
        </button>
      </form>

      {/* Список машин */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {cars.length === 0 ? (
          <p className="col-span-2 text-center text-gray-500 py-10 bg-white rounded-xl border border-dashed border-gray-200">Гараж пуст. Добавьте свою первую машину!</p>
        ) : (
          cars.map(car => (
            <Link key={car.id} to={`/car/${car.id}`} className="block bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-all group">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{car.plateNumber || 'Без номера'}</span>
              <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{car.brand} {car.model}</h3>
              <div className="mt-4 flex justify-between text-sm text-gray-500 border-t border-gray-50 pt-3">
                <div>Год: <span className="font-semibold text-gray-800">{car.year}</span></div>
                <div>Пробег: <span className="font-semibold text-gray-800">{car.currentMileage.toLocaleString()} км</span></div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
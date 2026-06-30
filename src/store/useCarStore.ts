import { create } from 'zustand';
import type { Car, MaintenanceRecord, ServiceReminder } from '../types';

interface CarState {
  cars: Car[];
  addCar: (car: Omit<Car, 'records' | 'reminders'>) => void;
  deleteCar: (carId: string) => void;
  addRecord: (carId: string, record: MaintenanceRecord) => void;
  deleteRecord: (carId: string, recordId: string) => void;
  addReminder: (carId: string, reminder: ServiceReminder) => void;
  toggleReminder: (carId: string, reminderId: string) => void;
}

export const useCarStore = create<CarState>((set) => ({
  // Инициализируем данные из localStorage, если они там есть
  cars: (() => {
    const saved = localStorage.getItem('car_fleet_data');
    return saved ? JSON.parse(saved) : [];
  })(),

  addCar: (newCar) => set((state) => {
    const updatedCars = [...state.cars, { ...newCar, records: [], reminders: [] }];
    localStorage.setItem('car_fleet_data', JSON.stringify(updatedCars));
    return { cars: updatedCars };
  }),

  deleteCar: (carId) => set((state) => {
    const updatedCars = state.cars.filter(car => car.id !== carId);
    localStorage.setItem('car_fleet_data', JSON.stringify(updatedCars));
    return { cars: updatedCars };
  }),

  addRecord: (carId, record) => set((state) => {
    const updatedCars = state.cars.map(car => {
      if (car.id !== carId) return car;
      // При добавлении расхода также обновляем текущий пробег машины, если он больше
      const newMileage = record.mileage > car.currentMileage ? record.mileage : car.currentMileage;
      return {
        ...car,
        currentMileage: newMileage,
        records: [record, ...car.records]
      };
    });
    localStorage.setItem('car_fleet_data', JSON.stringify(updatedCars));
    return { cars: updatedCars };
  }),

  deleteRecord: (carId, recordId) => set((state) => {
    const updatedCars = state.cars.map(car => {
      if (car.id !== carId) return car;
      return {
        ...car,
        records: car.records.filter(r => r.id !== recordId)
      };
    });
    localStorage.setItem('car_fleet_data', JSON.stringify(updatedCars));
    return { cars: updatedCars };
  }),

  addReminder: (carId, reminder) => set((state) => {
    const updatedCars = state.cars.map(car => {
      if (car.id !== carId) return car;
      return { ...car, reminders: [...car.reminders, reminder] };
    });
    localStorage.setItem('car_fleet_data', JSON.stringify(updatedCars));
    return { cars: updatedCars };
  }),

  toggleReminder: (carId, reminderId) => set((state) => {
    const updatedCars = state.cars.map(car => {
      if (car.id !== carId) return car;
      return {
        ...car,
        reminders: car.reminders.map(r => r.id === reminderId ? { ...r, isCompleted: !r.isCompleted } : r)
      };
    });
    localStorage.setItem('car_fleet_data', JSON.stringify(updatedCars));
    return { cars: updatedCars };
  })
}));
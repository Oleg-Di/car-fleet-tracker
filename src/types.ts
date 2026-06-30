export type MaintenanceCategory = 'Engine' | 'Brakes' | 'Detailing' | 'Other';

export interface MaintenanceRecord {
  id: string;
  date: string;
  category: MaintenanceCategory;
  mileage: number;
  description: string;
  cost: number;
}

export interface ServiceReminder {
  id: string;
  title: string;
  targetMileage: number; // На каком пробеге нужно обслужить
  isCompleted: boolean;
}

export interface Car {
  id: string;
  brand: string;      // Например: Lynk & Co
  model: string;      // Например: 01
  year: number;       // Например: 2021
  currentMileage: number;
  plateNumber: string; // Номер машины
  records: MaintenanceRecord[];
  reminders: ServiceReminder[];
}
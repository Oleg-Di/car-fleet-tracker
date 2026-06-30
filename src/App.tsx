import { Routes, Route } from "react-router-dom";
import { GaragePage } from "./pages/GaragePage";
import { CarDetailsPage } from "./pages/CarDetailsPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Routes>
          {/* Главная страница — Гараж */}
          <Route path="/" element={<GaragePage />} />

          {/* Динамический роут для конкретной машины */}
          <Route path="/car/:id" element={<CarDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

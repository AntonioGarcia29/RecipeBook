import { Routes, Route, Navigate } from "react-router-dom";
import { RecipesPage } from "./features/recipes/pages/RecipesPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/" element={<Navigate to="/recipes" replace />} />
      </Routes>
    </div>
  );
}

export default App;

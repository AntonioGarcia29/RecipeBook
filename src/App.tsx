import { Routes, Route, Navigate } from "react-router-dom";
import { RecipesPage } from "./features/recipes/pages/RecipesPage";
import { RecipeDetailPage } from "./features/recipes/pages/RecipeDetailPage";
import { CreateRecipePage } from "./features/recipes/pages/CreateRecipePage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/new" element={<CreateRecipePage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/" element={<Navigate to="/recipes" replace />} />
      </Routes>
    </div>
  );
}

export default App;

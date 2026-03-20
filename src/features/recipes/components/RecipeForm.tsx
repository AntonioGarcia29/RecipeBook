import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeFormSchema, type RecipeFormValues } from "../schemas/recipeForm.schema";
import { useGetCategoriesQuery } from "../api/recipesApi";
import { IngredientsField } from "./IngredientsField";
import { StepsField } from "./StepsField";

interface Props {
  onSubmit: (values: RecipeFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  serverError?: string;
}

export function RecipeForm({ onSubmit, onCancel, isSubmitting, serverError }: Props) {
  const { data: categories = [] } = useGetCategoriesQuery();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [{ value: "" }],
      steps: [{ value: "" }],
      category: "",
      difficulty: undefined,
      prepTime: undefined,
      imageUrl: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name")}
          placeholder="Ej. Tacos de canasta"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description")}
          placeholder="Describe brevemente la receta"
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Categoría y Dificultad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dificultad <span className="text-red-500">*</span>
          </label>
          <select
            {...register("difficulty")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            <option value="">Selecciona la dificultad</option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
          {errors.difficulty && (
            <p className="text-red-500 text-xs mt-1">{errors.difficulty.message}</p>
          )}
        </div>
      </div>

      {/* Tiempo de preparación */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tiempo de preparación (minutos) <span className="text-red-500">*</span>
        </label>
        <input
          {...register("prepTime")}
          type="number"
          min={1}
          placeholder="Ej. 30"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.prepTime && (
          <p className="text-red-500 text-xs mt-1">{errors.prepTime.message}</p>
        )}
      </div>

      {/* URL de imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL de imagen <span className="text-red-500">*</span>
        </label>
        <input
          {...register("imageUrl")}
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.imageUrl && (
          <p className="text-red-500 text-xs mt-1">{errors.imageUrl.message}</p>
        )}
      </div>

      {/* Ingredientes */}
      <IngredientsField control={control} register={register} errors={errors} />

      {/* Pasos */}
      <StepsField control={control} register={register} errors={errors} />

      {/* Error de servidor */}
      {serverError && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}

      {/* Acciones */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-medium px-6 py-2 rounded-lg transition-colors text-sm"
        >
          {isSubmitting ? "Guardando..." : "Guardar receta"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2 rounded-lg transition-colors text-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

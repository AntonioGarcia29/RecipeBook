import { useFieldArray } from "react-hook-form";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { RecipeFormValues } from "../schemas/recipeForm.schema";

interface Props {
  control: Control<RecipeFormValues>;
  register: UseFormRegister<RecipeFormValues>;
  errors: FieldErrors<RecipeFormValues>;
}

export function IngredientsField({ control, register, errors }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: "ingredients" });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Ingredientes</label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <div className="flex-1">
              <input
                {...register(`ingredients.${index}.value`)}
                placeholder={`Ingrediente ${index + 1}`}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.ingredients?.[index]?.value && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.ingredients[index]?.value?.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-gray-400 hover:text-red-500 transition-colors px-2"
              aria-label="Eliminar ingrediente"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {errors.ingredients?.root && (
        <p className="text-red-500 text-xs mt-1">{errors.ingredients.root.message}</p>
      )}
      {errors.ingredients?.message && (
        <p className="text-red-500 text-xs mt-1">{errors.ingredients.message}</p>
      )}
      <button
        type="button"
        onClick={() => append({ value: "" })}
        className="mt-2 text-sm text-orange-500 hover:text-orange-600 font-medium"
      >
        + Agregar ingrediente
      </button>
    </div>
  );
}

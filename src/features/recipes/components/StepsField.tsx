import { useFieldArray } from "react-hook-form";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { RecipeFormValues } from "../schemas/recipeForm.schema";

interface Props {
  control: Control<RecipeFormValues>;
  register: UseFormRegister<RecipeFormValues>;
  errors: FieldErrors<RecipeFormValues>;
}

export function StepsField({ control, register, errors }: Props) {
  const { fields, append, remove, move } = useFieldArray({ control, name: "steps" });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Pasos de preparación</label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-start">
            <span className="text-sm text-gray-400 font-medium mt-2.5 w-5 shrink-0">
              {index + 1}.
            </span>
            <div className="flex-1">
              <textarea
                {...register(`steps.${index}.value`)}
                placeholder={`Paso ${index + 1}`}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
              {errors.steps?.[index]?.value && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.steps[index]?.value?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <button
                type="button"
                onClick={() => move(index, index - 1)}
                disabled={index === 0}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-20 disabled:cursor-not-allowed text-xs px-1"
                aria-label="Subir paso"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => move(index, index + 1)}
                disabled={index === fields.length - 1}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-20 disabled:cursor-not-allowed text-xs px-1"
                aria-label="Bajar paso"
              >
                ▼
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-gray-400 hover:text-red-500 transition-colors text-xs px-1"
                aria-label="Eliminar paso"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      {errors.steps?.root && (
        <p className="text-red-500 text-xs mt-1">{errors.steps.root.message}</p>
      )}
      {errors.steps?.message && (
        <p className="text-red-500 text-xs mt-1">{errors.steps.message}</p>
      )}
      <button
        type="button"
        onClick={() => append({ value: "" })}
        className="mt-2 text-sm text-orange-500 hover:text-orange-600 font-medium"
      >
        + Agregar paso
      </button>
    </div>
  );
}

import { z } from "zod";

export const recipeFormSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(1, "La descripción es requerida"),
  ingredients: z
    .array(z.object({ value: z.string().min(1, "El ingrediente no puede estar vacío") }))
    .min(1, "Agrega al menos un ingrediente"),
  steps: z
    .array(z.object({ value: z.string().min(1, "El paso no puede estar vacío") }))
    .min(1, "Agrega al menos un paso"),
  category: z.string().min(1, "Selecciona una categoría"),
  difficulty: z.enum(["Fácil", "Media", "Difícil"], {
    errorMap: () => ({ message: "Selecciona una dificultad" }),
  }),
  prepTime: z.coerce
    .number({ invalid_type_error: "Ingresa un número válido" })
    .positive("El tiempo debe ser mayor a 0"),
  imageUrl: z.string().min(1, "La URL de imagen es requerida").url("Ingresa una URL válida"),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = "Ocurrió un error inesperado." }: ErrorMessageProps) {
  return (
    <div className="flex justify-center items-center py-16">
      <p className="text-red-600 text-center">{message}</p>
    </div>
  );
}

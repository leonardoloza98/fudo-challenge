'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { CreatePostFormData } from '../models/post';

interface CreatePostFormProps {
  onSubmit: (data: CreatePostFormData) => void;
  isLoading?: boolean;
}

export function CreatePostForm({
  onSubmit,
  isLoading = false,
}: CreatePostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePostFormData>();

  const handleFormSubmit = (data: CreatePostFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title" className="text-white font-medium">
          Título
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="Ingresa el título del post"
          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
          {...register('title', {
            required: 'El título es requerido',
            minLength: {
              value: 3,
              message: 'El título debe tener al menos 3 caracteres',
            },
            maxLength: {
              value: 100,
              message: 'El título no puede exceder 100 caracteres',
            },
          })}
        />
        {errors.title && (
          <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="content" className="text-white font-medium">
          Contenido
        </Label>
        <textarea
          id="content"
          rows={4}
          placeholder="Escribe el contenido del post"
          className="block w-full rounded-md border border-gray-600 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
          {...register('content', {
            required: 'El contenido es requerido',
            minLength: {
              value: 10,
              message: 'El contenido debe tener al menos 10 caracteres',
            },
            maxLength: {
              value: 1000,
              message: 'El contenido no puede exceder 1000 caracteres',
            },
          })}
        />
        {errors.content && (
          <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Creando...' : 'Crear post'}
        </Button>
      </div>
    </form>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useAppStore } from '@/lib/store';
import { type AvatarId } from '@/lib/avatars';

interface ReplyFormData {
  content: string;
  name: string;
  avatar: AvatarId;
  parentId: string;
}

interface ReplyFormProps {
  parentId: string;
  onSubmit: (data: ReplyFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ReplyForm({
  parentId,
  onSubmit,
  onCancel,
  isLoading = false,
}: ReplyFormProps) {
  const { currentUser } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplyFormData>({
    defaultValues: {
      content: '',
      name: currentUser?.name || '',
      avatar: currentUser?.avatar || 'cool-dev',
      parentId,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 bg-gray-800/30 p-4 rounded-lg border border-gray-700/30"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="content">Tu respuesta</Label>
          <Input
            id="content"
            {...register('content', {
              required: 'El contenido es requerido',
              minLength: {
                value: 3,
                message: 'El contenido debe tener al menos 3 caracteres',
              },
            })}
            placeholder="Escribe tu respuesta..."
            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
          />
          {errors.content && (
            <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={onCancel}
            className="bg-transparent border border-gray-600 hover:bg-gray-700"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar respuesta'}
          </Button>
        </div>
      </div>
    </form>
  );
}

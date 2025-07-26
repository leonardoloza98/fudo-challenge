'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { AvatarSelector } from '@/modules/login/components/AvatarSelector';
import { AvatarConfig } from '@/modules/login/models/avatars';
import { useAppStore } from '@/lib/store';
import { PATH_ROUTES } from '@/common/constants/routes';

type LoginFormData = {
  name: string;
  avatar: AvatarConfig;
};

export default function LoginPage() {
  const { setCurrentUser } = useAppStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      name: '',
      avatar: {
        style: 'avataaars',
        seed: 'alex-smith',
      },
    },
  });

  const [selectedAvatar, setSelectedAvatar] = useState<AvatarConfig>({
    style: 'avataaars',
    seed: 'alex-smith',
  });

  const handleAvatarSelect = (avatar: AvatarConfig) => {
    setSelectedAvatar(avatar);
    setValue('avatar', avatar);
  };

  const onSubmit = (data: LoginFormData) => {
    const user = {
      id: Date.now().toString(),
      name: data.name.trim(),
      avatar: data.avatar,
    };
    setCurrentUser(user);
    router.push(PATH_ROUTES.POSTS.LIST);
  };

  const name = watch('name');
  const avatar = watch('avatar');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Card className="w-full max-w-lg border-0 backdrop-blur-md flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white text-center text-2xl">
          Iniciar sesión
        </h1>
        <h2 className="text-gray-300 text-lg">
          Elige tu nombre y avatar para comenzar
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-medium">
              Nombre de usuario
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Ingresa tu nombre"
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
              {...register('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres',
                },
                maxLength: {
                  value: 50,
                  message: 'El nombre no puede exceder 50 caracteres',
                },
              })}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-3 w-full">
            <Label className="text-white font-medium">
              Selecciona tu avatar
            </Label>
            <AvatarSelector
              selectedAvatar={selectedAvatar}
              onSelect={handleAvatarSelect}
            />
            <input
              type="hidden"
              {...register('avatar', {
                required: 'Debes seleccionar un avatar',
                validate: value => {
                  if (!value || !value.style || !value.seed) {
                    return 'Debes seleccionar un avatar';
                  }
                  return true;
                },
              })}
            />
            {errors.avatar && (
              <p className="text-red-400 text-sm mt-1">
                {errors.avatar.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={isSubmitting || !name?.trim() || !avatar?.seed}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>
      </Card>
    </div>
  );
}

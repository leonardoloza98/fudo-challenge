'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useAppStore } from '@/lib/store';

interface CreateCommentFormProps {
  onSubmit: (data: { content: string; name: string; avatar: string }) => void;
  isLoading?: boolean;
}

export default function CreateCommentForm({
  onSubmit,
  isLoading = false,
}: CreateCommentFormProps) {
  const { currentUser } = useAppStore();
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      content: content.trim(),
      name: currentUser?.name || 'Anónimo',
      avatar: currentUser?.avatar.seed || '',
    });

    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-white">Tu comentario</h2>
      <div className="flex items-center justify-center gap-3">
        <Input
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Escribe tu comentario..."
          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
          disabled={isLoading}
          required
        />
        <Button
            type="submit"
            disabled={isLoading || !content.trim()}
            className="w-[150px]"
        >
            {isLoading ? 'Enviando...' : 'Comentar'}
        </Button>
      </div>

    </form>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useAppStore } from '@/lib/store';
import { X } from 'lucide-react';

interface ReplyFormProps {
  parentId: string;
  onSubmit: (data: {
    content: string;
    name: string;
    avatar: string;
    parentId: string;
  }) => void;
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
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      content: content.trim(),
      name: currentUser?.name || 'Anónimo',
      avatar: currentUser?.avatar.seed || '',
      parentId,
    });

    setContent('');
  };

  return (
    <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30 mt-3">
      <div className="flex items-center justify-between mb-3">
        <Label className="text-white text-sm">Responder</Label>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors duration-200"
          disabled={isLoading}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-3 items-center justify-center"
      >
        <Input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Escribe tu respuesta..."
          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
          disabled={isLoading}
          required
        />

        <Button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="w-[150px] bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Enviando...' : 'Responder'}
        </Button>
      </form>
    </div>
  );
}

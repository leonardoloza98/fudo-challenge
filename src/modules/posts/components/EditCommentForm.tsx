'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X } from 'lucide-react';

interface EditCommentFormProps {
  commentId: string;
  initialContent: string;
  onSubmit: (data: { content: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function EditCommentForm({ 
  commentId, 
  initialContent, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: EditCommentFormProps) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      content: content.trim(),
    });
  };

  return (
    <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30 mt-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white text-sm font-medium">Editar comentario</span>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors duration-200"
          disabled={isLoading}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Editar comentario..."
          className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
          disabled={isLoading}
          required
        />

        <Button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="w-[150px] bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </Button>
      </form>
    </div>
  );
} 
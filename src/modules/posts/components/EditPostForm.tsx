'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Post } from '../models/post';

interface EditPostFormProps {
  post: Post;
  onSubmit: (data: { title: string; content: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function EditPostForm({ post, onSubmit, onCancel, isLoading = false }: EditPostFormProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      title: title.trim(),
      content: content.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title" className="text-white">
          Título
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del post..."
          className="mt-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <Label htmlFor="content" className="text-white">
          Contenido
        </Label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenido del post..."
          className="mt-1 w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none"
          rows={6}
          disabled={isLoading}
          required
        />
      </div>

      <div className="flex gap-3 items-center justify-end">
        <Button
          type="submit"
          disabled={isLoading || !title.trim() || !content.trim()}
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="bg-gray-600 hover:bg-gray-700"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
} 
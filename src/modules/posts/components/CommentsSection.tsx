'use client';

import { Spinner } from '@/components/ui/Spinner';
import { Comment } from '../models/comment';

interface CommentsSectionProps {
  comments: Comment[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export default function CommentsSection({
  comments,
  isLoading,
  error,
}: CommentsSectionProps) {
  if (isLoading) {
    return (
      <div className="mt-6 flex items-center justify-center py-8">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="md" />
          <div className="text-white">Cargando comentarios...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 text-red-400 text-center">
        Error al cargar comentarios: {error.message}
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="mt-6 text-center py-8">
        <div className="text-gray-400 text-sm">No hay comentarios aún</div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Comentarios</h3>
      {comments.map(comment => (
        <div
          key={comment.id}
          className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {comment.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white font-medium text-sm">
                  {comment.name}
                </span>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-gray-400 text-xs">
                  {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="text-gray-300 text-sm leading-relaxed">
                {comment.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

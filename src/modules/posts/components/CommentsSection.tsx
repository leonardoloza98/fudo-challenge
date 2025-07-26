'use client';

import { Spinner } from '@/components/ui/Spinner';
import { Comment } from '../models/comment';
import CreateCommentForm from './CreateCommentForm';
import CommentTree from './CommentTree';
import { AvatarId } from '@/lib/avatars';

interface CommentsSectionProps {
  comments: Comment[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onCreateComment: (data: {
    content: string;
    name: string;
    avatar: AvatarId;
  }) => void;
  isCreatingComment?: boolean;
  onDeleteComment: (commentId: string) => void;
  isDeletingComment?: boolean;
  onEditComment?: (commentId: string, data: { content: string }) => void;
  isEditingComment?: boolean;
}

export default function CommentsSection({
  comments,
  isLoading,
  error,
  onCreateComment,
  isCreatingComment = false,
  onDeleteComment,
  isDeletingComment = false,
  onEditComment,
  isEditingComment = false,
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

  return (
    <div className="mt-6 space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Comentarios</h3>

      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
        <CreateCommentForm
          onSubmit={onCreateComment}
          isLoading={isCreatingComment}
        />
      </div>

      <div className="space-y-4">
        {comments && comments.length > 0 ? (
          <CommentTree
            comments={comments}
            onDelete={onDeleteComment}
            isDeleting={isDeletingComment}
            onCreateReply={onCreateComment}
            isCreatingReply={isCreatingComment}
            onEditComment={onEditComment}
            isEditingComment={isEditingComment}
          />
        ) : (
          <div className="mt-6 text-center py-8">
            <div className="text-gray-400 text-sm">No hay comentarios aún</div>
          </div>
        )}
      </div>
    </div>
  );
}

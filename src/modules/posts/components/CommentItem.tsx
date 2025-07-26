'use client';

import { useState } from 'react';
import { Trash2, MessageCircle, Edit2 } from 'lucide-react';
import { Comment } from '../models/comment';
import DeleteCommentModal from './DeleteCommentModal';
import ReplyForm from './ReplyForm';
import EditCommentForm from './EditCommentForm';
import { AvatarDisplay } from '@/components/ui/AvatarDisplay';
import { type AvatarId } from '@/lib/avatars';

interface CommentItemProps {
  comment: Comment & { avatar: AvatarId };
  onDelete: (commentId: string) => void;
  isDeleting?: boolean;
  onReply?: (
    parentId: string,
    data?: { content: string; name: string; avatar: AvatarId }
  ) => void;
  isCreatingReply?: boolean;
  showReplyButton?: boolean;
  onEdit?: (commentId: string, data: { content: string }) => void;
  isEditing?: boolean;
}

export default function CommentItem({
  comment,
  onDelete,
  isDeleting = false,
  onReply,
  isCreatingReply = false,
  showReplyButton = false,
  onEdit,
  isEditing = false,
}: CommentItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(comment.id);
    setShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReplyForm(true);
  };

  const handleReplySubmit = (data: {
    content: string;
    name: string;
    avatar: AvatarId;
    parentId: string;
  }) => {
    if (onReply) {
      onReply(comment.id, {
        content: data.content,
        name: data.name,
        avatar: data.avatar,
      });
    }
    setShowReplyForm(false);
  };

  const handleReplyCancel = () => {
    setShowReplyForm(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditForm(true);
  };

  const handleEditSubmit = (data: { content: string }) => {
    if (onEdit) {
      onEdit(comment.id, data);
    }
    setShowEditForm(false);
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
  };

  return (
    <>
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30 relative group">
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
          {showReplyButton && (
            <button
              onClick={handleReplyClick}
              disabled={isCreatingReply}
              className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors duration-200"
              title="Responder comentario"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={handleEditClick}
              disabled={isEditing}
              className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-md transition-colors duration-200"
              title="Editar comentario"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors duration-200"
            title="Eliminar comentario"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start gap-3 pr-8">
          <AvatarDisplay avatarId={comment.avatar} size={32} />
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

      {showReplyForm && (
        <ReplyForm
          parentId={comment.id}
          onSubmit={handleReplySubmit}
          onCancel={handleReplyCancel}
          isLoading={isCreatingReply}
        />
      )}

      {showEditForm && (
        <EditCommentForm
          initialContent={comment.content}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
          isLoading={isEditing}
        />
      )}

      <DeleteCommentModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        commentContent={comment.content}
        isLoading={isDeleting}
      />
    </>
  );
}

'use client';

import { useState } from 'react';
import { Trash2, MessageCircle, Edit2 } from 'lucide-react';
import { Comment } from '../models/comment';
import DeleteCommentModal from './DeleteCommentModal';
import ReplyForm from './ReplyForm';
import EditCommentForm from './EditCommentForm';
import { AvatarDisplay } from '@/components/ui/AvatarDisplay';
import { ActionButton } from '@/components/ui/ActionButton';
import { type AvatarId } from '@/lib/avatars';
import { DateDisplay } from '@/components/ui/DateDisplay';

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

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(comment.id);
    setShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleReplyClick = () => {
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

  const handleEditClick = () => {
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
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
        <div className="flex gap-3">
          <AvatarDisplay avatarId={comment.avatar} size={32} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-white font-medium text-sm truncate">
                  {comment.name}
                </span>
                <span className="text-gray-500 text-xs flex-shrink-0">•</span>
                <DateDisplay date={comment.createdAt} className="text-gray-400 text-xs flex-shrink-0" />
              </div>
              <div className="flex gap-1 flex-shrink-0">
                {showReplyButton && (
                  <ActionButton
                    onClick={handleReplyClick}
                    disabled={isCreatingReply}
                    title="Responder comentario"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </ActionButton>
                )}
                {onEdit && (
                  <ActionButton
                    onClick={handleEditClick}
                    disabled={isEditing}
                    title="Editar comentario"
                    variant="warning"
                  >
                    <Edit2 className="w-4 h-4" />
                  </ActionButton>
                )}
                <ActionButton
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  title="Eliminar comentario"
                  variant="danger"
                >
                  <Trash2 className="w-4 h-4" />
                </ActionButton>
              </div>
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

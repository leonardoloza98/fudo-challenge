'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { type Post } from '../models/post';
import { AvatarDisplay } from '@/components/ui/AvatarDisplay';
import { ActionButton } from '@/components/ui/ActionButton';
import DeleteConfirmModal from './DeleteConfirmModal';
import { type AvatarId } from '@/lib/avatars';
import { DateDisplay } from '@/components/ui/DateDisplay';

interface PostCardProps {
  post: Post & { avatar: AvatarId };
  onDelete?: (postId: string) => void;
  isDeleting?: boolean;
}

export default function PostCard({
  post,
  onDelete,
  isDeleting = false,
}: PostCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${post.id}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(post.id);
    }
    setShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30 relative group cursor-pointer hover:bg-gray-800/70 transition-colors duration-200"
      >
        <div className="absolute top-3 right-3">
          {onDelete && (
            <ActionButton
              onClick={handleDeleteClick}
              disabled={isDeleting}
              title="Eliminar post"
              variant="danger"
            >
              <Trash2 className="w-4 h-4" />
            </ActionButton>
          )}
        </div>

        <div className="flex items-start gap-3 pr-8">
          <AvatarDisplay avatarId={post.avatar} size={40} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white font-medium text-sm">
                {post.name}
              </span>
              <span className="text-gray-500 text-xs">•</span>
              <DateDisplay date={post.createdAt} className="text-gray-400 text-xs" />
            </div>
            <h2 className="text-white font-semibold text-lg mb-2">
              {post.title}
            </h2>
            <div className="text-gray-300 text-sm leading-relaxed">
              {post.content}
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Eliminar post"
        message={`¿Estás seguro de que quieres eliminar el post "${post.title}"? Esta acción no se puede deshacer.`}
        isLoading={isDeleting}
      />
    </>
  );
}

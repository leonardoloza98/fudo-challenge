'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { useDeletePost } from '../queries';
import DeleteConfirmModal from './DeleteConfirmModal';

interface Post {
  id: string;
  title: string;
  content: string;
  name: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClick = () => {
    router.push(`/posts/${post.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deletePost(post.id);
    setShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        key={post.id}
        className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors duration-200 relative group"
        onClick={handleClick}
      >
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors duration-200"
            title="Eliminar post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <h2 className="text-xl font-semibold text-white mb-2 pr-8">
          {post.title}
        </h2>
        <p className="text-gray-300 mb-2">{post.content}</p>
        <div className="text-sm text-gray-400">
          Por: {post.name} • {new Date(post.createdAt).toLocaleDateString()}
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

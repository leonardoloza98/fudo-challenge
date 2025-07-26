'use client';

import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { Post } from '../models/post';
import EditPostForm from './EditPostForm';

interface PostDetailProps {
  post: Post;
  commentsCount?: number;
  onEdit?: (data: { title: string; content: string }) => void;
  isEditing?: boolean;
}

export default function PostDetail({
  post,
  commentsCount = 0,
  onEdit,
  isEditing = false,
}: PostDetailProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleEditSubmit = (data: { title: string; content: string }) => {
    if (onEdit) {
      onEdit(data);
    }
    setShowEditForm(false);
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
  };
  return (
    <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/30">
      <header className="mb-8 pb-6 border-b border-gray-700/50">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-4xl font-bold text-white leading-tight flex-1">
            {post.title}
          </h1>
          {onEdit && (
            <button
              onClick={handleEditClick}
              disabled={isEditing}
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors duration-200 ml-4"
              title="Editar post"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="font-medium">{post.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>•</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </header>

      {showEditForm ? (
        <EditPostForm
          post={post}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
          isLoading={isEditing}
        />
      ) : (
        <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-700/30">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Post #{post.id.slice(0, 8)}</span>
          <span>{commentsCount} comentarios</span>
        </div>
      </div>
    </div>
  );
}

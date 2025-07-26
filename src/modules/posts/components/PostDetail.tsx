'use client';

import { Post } from '../models/post';

interface PostDetailProps {
  post: Post;
  commentsCount?: number;
}

export default function PostDetail({
  post,
  commentsCount = 0,
}: PostDetailProps) {
  return (
    <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/30">
      <header className="mb-8 pb-6 border-b border-gray-700/50">
        <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>

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

      <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700/30">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Post #{post.id.slice(0, 8)}</span>
          <span>{commentsCount} comentarios</span>
        </div>
      </div>
    </div>
  );
}

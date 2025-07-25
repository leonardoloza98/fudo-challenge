'use client';

import { useRouter } from 'next/navigation';

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

  const handleClick = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div 
      key={post.id} 
      className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
      onClick={handleClick}
    >
      <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
      <p className="text-gray-300 mb-2">{post.content}</p>
      <div className="text-sm text-gray-400">
        Por: {post.name} • {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
} 
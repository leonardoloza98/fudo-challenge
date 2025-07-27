'use client';
import { useState } from 'react';
import { useCreatePost, useDeletePost, useGetPosts } from '../queries';
import { useAppStore } from '@/lib/store';
import { CreatePostFormData, Post } from '../models/post';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Modal } from '@/components/ui/Modal';
import { CreatePostForm } from '@/modules/posts/components/CreatePostForm';
import PostCard from '@/modules/posts/components/PostCard';
import { PlusIcon } from 'lucide-react';

const PostListPage = () => {
  const { isLoading, currentUser } = useAppStore();
  const { data: posts, isLoading: postsLoading, error } = useGetPosts();
  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: deletePost } = useDeletePost();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeletePost = (postId: string) => {
    deletePost(postId);
  };

  const handleCreatePost = async (data: CreatePostFormData) => {
    createPost(
      {
        id: crypto.randomUUID(),
        title: data.title,
        content: data.content,
        name: currentUser?.name || 'Anónimo',
        avatar: currentUser?.avatar || 'cool-dev',
        createdAt: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
        },
        onError: error => {
          console.error('Error creating post:', error);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <div className="text-white text-lg">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="p-6">
        <Header />
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Posts</h1>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Nuevo post
            </Button>
          </div>

          {postsLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-4">
                <Spinner size="md" />
                <div className="text-white">Cargando posts...</div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-400">
              Error al cargar posts: {error.message}
            </div>
          )}

          {posts && (
            <div className="space-y-4">
              {posts.map((post: Post) => (
                <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear nuevo post"
        description="Completa los campos para crear un nuevo post"
      >
        <CreatePostForm onSubmit={handleCreatePost} isLoading={isCreating} />
      </Modal>
    </div>
  );
};

export default PostListPage;

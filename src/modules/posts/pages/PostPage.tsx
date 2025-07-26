'use client';
import { useParams, useRouter } from 'next/navigation';
import { useGetComments, useGetPostById, useCreateComment, useDeleteComment, useUpdatePost, useUpdateComment } from '../queries';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ArrowLeft } from 'lucide-react';
import CommentsSection from '../components/CommentsSection';
import PostDetail from '../components/PostDetail';

const PostPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: post, isLoading, error } = useGetPostById(id as string);
  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useGetComments(id as string);
  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateComment(id as string);
  const { mutate: deleteComment, isPending: isDeletingComment } = useDeleteComment(id as string);
  const { mutate: updatePost, isPending: isUpdatingPost } = useUpdatePost();
  const { mutate: updateComment, isPending: isUpdatingComment } = useUpdateComment(id as string);

  const handleBack = () => {
    router.push('/posts');
  };

  const handleCreateComment = (data: {
    content: string;
    name: string;
    avatar: string;
    parentId?: string;
  }) => {
    createComment(data, {
      onError: error => {
        console.error('Error creating comment:', error);
      },
    });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId, {
      onError: error => {
        console.error('Error deleting comment:', error);
      },
    });
  };

  const handleEditPost = (data: { title: string; content: string }) => {
    updatePost(
      { id: id as string, data },
      {
        onError: error => {
          console.error('Error updating post:', error);
        },
      }
    );
  };

  const handleEditComment = (commentId: string, data: { content: string }) => {
    updateComment(
      { commentId, data },
      {
        onError: error => {
          console.error('Error updating comment:', error);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <div className="text-white text-lg">Cargando post...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">
            Error al cargar el post
          </div>
          <div className="text-gray-400 mb-6">{error.message}</div>
          <Button onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a posts
          </Button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">Post no encontrado</div>
          <Button onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a posts
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <Header />
        <div className="p-4">
          <div className="flex items-center mb-6">
            <Button
              onClick={handleBack}
              className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a posts
            </Button>
          </div>

          <PostDetail 
            post={post} 
            commentsCount={comments?.length || 0}
            onEdit={handleEditPost}
            isEditing={isUpdatingPost}
          />

          <CommentsSection
            comments={comments}
            isLoading={isCommentsLoading}
            error={commentsError}
            onCreateComment={handleCreateComment}
            isCreatingComment={isCreatingComment}
            onDeleteComment={handleDeleteComment}
            isDeletingComment={isDeletingComment}
            onEditComment={handleEditComment}
            isEditingComment={isUpdatingComment}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;

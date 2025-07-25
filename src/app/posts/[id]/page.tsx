'use client';
import { useParams } from 'next/navigation';
import PostPage from '@/modules/posts/pages/PostPage';

function PostDetailPage() {
  const { id } = useParams();

  return <PostPage />;
}

export default PostDetailPage;

import { NextRequest, NextResponse } from 'next/server';
import { type AvatarId } from '@/lib/avatars';
import { API_URL } from '@/common/constants/config';

interface Comment {
  id: string;
  content: string;
  name: string;
  avatar: string;
  createdAt: string;
  postId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const response = await fetch(
      `${API_URL}/post/${id}/comment`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json([]);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const comments = await response.json();
    const processedComments = comments.map((comment: Comment) => ({
      ...comment,
      avatar: comment.avatar as AvatarId || 'cool-dev',
    }));
    return NextResponse.json(processedComments);
  } catch (error) {
    console.error('Error in /api/posts/[id]/comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const processedBody = {
      ...body,
      avatar: body.avatar as AvatarId || 'cool-dev',
    };

    const response = await fetch(
      `${API_URL}/post/${id}/comment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedBody),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const comment = await response.json();
    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error in /api/posts/[id]/comments POST:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

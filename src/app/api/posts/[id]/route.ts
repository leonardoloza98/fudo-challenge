import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/common/constants/config';

interface Comment {
  id: string;
  content: string;
  name: string;
  avatar: string;
  createdAt: string;
  postId: string;
  parentId?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const response = await fetch(
      `${API_URL}/post/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const post = await response.json();

    // Obtener comentarios
    const commentsResponse = await fetch(
      `${API_URL}/post/${id}/comment`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    let comments: Comment[] = [];
    if (commentsResponse.ok) {
      comments = await commentsResponse.json();
    } else if (commentsResponse.status !== 404) {
      // Si es 404, probablemente no hay comentarios, lo cual está bien
      // Pero si es otro error, lo registramos
      console.error(
        `Error fetching comments: ${commentsResponse.status}`
      );
    }

    // Eliminar comentarios huérfanos
    comments = comments.filter((comment) => {
      return !comment.parentId || comments.some((c) => c.id === comment.parentId);
    });

    return NextResponse.json({ ...post, comments });
  } catch (error) {
    console.error('Error in /api/posts/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();

    const response = await fetch(
      `${API_URL}/post/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const post = await response.json();
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error in /api/posts/[id] PUT:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const response = await fetch(
      `${API_URL}/post/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in /api/posts/[id] DELETE:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

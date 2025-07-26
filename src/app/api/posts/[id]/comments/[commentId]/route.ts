import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  const { id, commentId } = await params;

  try {
    const response = await fetch(
      `https://665de6d7e88051d60408c32d.mockapi.io/post/${id}/comment/${commentId}`,
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
    console.error('Error in /api/posts/[id]/comments/[commentId] DELETE:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  const { id, commentId } = await params;

  try {
    const body = await request.json();

    const response = await fetch(
      `https://665de6d7e88051d60408c32d.mockapi.io/post/${id}/comment/${commentId}`,
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

    const comment = await response.json();
    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error in /api/posts/[id]/comments/[commentId] PUT:', error);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
} 
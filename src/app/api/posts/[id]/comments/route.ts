import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const response = await fetch(
      `https://665de6d7e88051d60408c32d.mockapi.io/post/${id}/comment`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      // Si es 404, probablemente no hay comentarios, devolvemos array vacío
      if (response.status === 404) {
        return NextResponse.json([]);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const comments = await response.json();
    return NextResponse.json(comments);
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

    const response = await fetch(
      `https://665de6d7e88051d60408c32d.mockapi.io/post/${id}/comment`,
      {
        method: 'POST',
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
    console.error('Error in /api/posts/[id]/comments POST:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://665de6d7e88051d60408c32d.mockapi.io/post',
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

    const posts = await response.json();

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in /api/posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(
      'https://665de6d7e88051d60408c32d.mockapi.io/post',
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

    const post = await response.json();

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error in /api/posts POST:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

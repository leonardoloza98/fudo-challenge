import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PostCard from '../PostCard';
import { type Post } from '../../models/post';

// Mock the router
const mockRouter = {
  push: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn()
};

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter
}));

// Mock the delete post hook
vi.mock('../../queries', () => ({
  useDeletePost: () => ({
    mutate: vi.fn(),
    isPending: false
  })
}));

const mockPost: Post = {
  id: '1',
  title: 'Test Post',
  content: 'This is a test post content',
  createdAt: new Date().toISOString(),
  name: 'Test User',
  avatar: 'cool-dev'
};

describe('PostCard', () => {
  it('renders post title and content', () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
  });

  it('shows delete confirmation modal when delete button is clicked', () => {
    render(<PostCard post={mockPost} />);

    // Click delete button
    const deleteButton = screen.getByTitle('Eliminar post');
    fireEvent.click(deleteButton);

    // Check if modal is shown with specific text
    expect(screen.getByText(/¿Estás seguro/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Eliminar' })).toBeInTheDocument();
  });

  it('navigates to post detail when clicked', () => {
    render(<PostCard post={mockPost} />);

    // Click on the post card
    const postCard = screen.getByText(mockPost.title).closest('div');
    fireEvent.click(postCard!);

    expect(mockRouter.push).toHaveBeenCalledWith(`/posts/${mockPost.id}`);
  });
}); 
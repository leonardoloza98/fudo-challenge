import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CommentTree from '../CommentTree';
import { type Comment } from '../../models/comment';

const mockComments: Comment[] = [
  {
    id: '1',
    content: 'Parent comment',
    name: 'User 1',
    avatar: 'cool-dev',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    content: 'Child comment 1',
    name: 'User 2',
    avatar: 'happy-designer',
    createdAt: new Date().toISOString(),
    parentId: '1'
  },
  {
    id: '3',
    content: 'Child comment 2',
    name: 'User 3',
    avatar: 'tech-lead',
    createdAt: new Date().toISOString(),
    parentId: '1'
  }
];

describe('CommentTree', () => {
  it('renders all comments in the correct hierarchy', () => {
    render(
      <CommentTree
        comments={mockComments}
        onDelete={() => {}}
        onCreateReply={() => {}}
        onEditComment={() => {}}
      />
    );

    // Check if all comments are rendered
    expect(screen.getByText('Parent comment')).toBeInTheDocument();
    expect(screen.getByText('Child comment 1')).toBeInTheDocument();
    expect(screen.getByText('Child comment 2')).toBeInTheDocument();

    // Check if child comments are indented
    const childComments = screen.getAllByText(/Child comment/);
    childComments.forEach(comment => {
      const parentDiv = comment.closest('div[style]');
      expect(parentDiv).toHaveStyle({ marginLeft: '24px' });
    });
  });

  it('renders empty state when no comments', () => {
    render(
      <CommentTree
        comments={[]}
        onDelete={() => {}}
        onCreateReply={() => {}}
        onEditComment={() => {}}
      />
    );

    expect(screen.queryByRole('comment')).not.toBeInTheDocument();
  });

  it('maintains correct nesting levels for deeply nested comments', () => {
    const deeplyNestedComments: Comment[] = [
      {
        id: '1',
        content: 'Level 0',
        name: 'User 1',
        avatar: 'cool-dev',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        content: 'Level 1',
        name: 'User 2',
        avatar: 'happy-designer',
        createdAt: new Date().toISOString(),
        parentId: '1'
      },
      {
        id: '3',
        content: 'Level 2',
        name: 'User 3',
        avatar: 'tech-lead',
        createdAt: new Date().toISOString(),
        parentId: '2'
      }
    ];

    render(
      <CommentTree
        comments={deeplyNestedComments}
        onDelete={() => {}}
        onCreateReply={() => {}}
        onEditComment={() => {}}
      />
    );

    const level0 = screen.getByText('Level 0').closest('div[style]');
    const level1 = screen.getByText('Level 1').closest('div[style]');
    const level2 = screen.getByText('Level 2').closest('div[style]');

    expect(level0).toHaveStyle({ marginLeft: '0' });
    expect(level1).toHaveStyle({ marginLeft: '24px' });
    expect(level2).toHaveStyle({ marginLeft: '48px' });
  });
}); 
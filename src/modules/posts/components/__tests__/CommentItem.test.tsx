import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import CommentItem from '../CommentItem';
import { type Comment } from '../../models/comment';
import { StoreProvider } from '@/lib/store';

const mockComment: Comment & { avatar: 'cool-dev' } = {
  id: '1',
  content: 'This is a test comment',
  name: 'Test User',
  avatar: 'cool-dev',
  createdAt: '2025-07-26T12:00:00.000Z',
};

// Mock user for store
const mockUser = {
  id: '2',
  name: 'Current User',
  avatar: 'happy-designer'
};

const renderWithStore = (ui: React.ReactElement) => {
  return render(
    <StoreProvider initialUser={mockUser}>
      {ui}
    </StoreProvider>
  );
};

describe('CommentItem', () => {
  it('renders comment content and metadata correctly', () => {
    render(
      <CommentItem
        comment={mockComment}
        onDelete={() => {}}
      />
    );

    // Check basic content
    expect(screen.getByText(mockComment.content)).toBeInTheDocument();
    expect(screen.getByText(mockComment.name)).toBeInTheDocument();
    
    // Check date formatting
    expect(screen.getByText(/26 jul 2025/i)).toBeInTheDocument();
  });

  it('shows reply form when reply button is clicked', () => {
    renderWithStore(
      <CommentItem
        comment={mockComment}
        onDelete={() => {}}
        onReply={() => {}}
        showReplyButton={true}
      />
    );

    // Click reply button
    const replyButton = screen.getByTitle('Responder comentario');
    fireEvent.click(replyButton);

    // Check if reply form is shown
    expect(screen.getByPlaceholderText(/Escribe tu respuesta/i)).toBeInTheDocument();
  });

  it('shows edit form when edit button is clicked', () => {
    render(
      <CommentItem
        comment={mockComment}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );

    // Click edit button
    const editButton = screen.getByTitle('Editar comentario');
    fireEvent.click(editButton);

    // Check if edit form is shown with pre-filled content
    const editInput = screen.getByDisplayValue(mockComment.content);
    expect(editInput).toBeInTheDocument();
  });

  it('calls onDelete when delete is confirmed', () => {
    const onDelete = vi.fn();
    render(
      <CommentItem
        comment={mockComment}
        onDelete={onDelete}
      />
    );

    // Click delete button
    const deleteButton = screen.getByTitle('Eliminar comentario');
    fireEvent.click(deleteButton);

    // Find the modal and click its delete button
    const modal = screen.getByRole('dialog');
    const confirmButton = within(modal).getByText('Eliminar');
    fireEvent.click(confirmButton);

    expect(onDelete).toHaveBeenCalledWith(mockComment.id);
  });

  it('calls onReply with correct data when reply is submitted', async () => {
    const onReply = vi.fn();
    renderWithStore(
      <CommentItem
        comment={mockComment}
        onDelete={() => {}}
        onReply={onReply}
        showReplyButton={true}
      />
    );

    // Click reply button
    await act(async () => {
      const replyButton = screen.getByTitle('Responder comentario');
      fireEvent.click(replyButton);
    });

    // Fill and submit reply form
    const replyInput = screen.getByPlaceholderText(/Escribe tu respuesta/i);
    await act(async () => {
      fireEvent.change(replyInput, { target: { value: 'Test reply' } });
    });
    
    const submitButton = screen.getByRole('button', { name: /Enviar respuesta/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(onReply).toHaveBeenCalledWith(mockComment.id, expect.objectContaining({
      content: 'Test reply',
      name: mockUser.name,
      avatar: mockUser.avatar
    }));
  });

  it('calls onEdit with correct data when edit is submitted', () => {
    const onEdit = vi.fn();
    render(
      <CommentItem
        comment={mockComment}
        onDelete={() => {}}
        onEdit={onEdit}
      />
    );

    // Click edit button
    const editButton = screen.getByTitle('Editar comentario');
    fireEvent.click(editButton);

    // Modify and submit edit form
    const editInput = screen.getByDisplayValue(mockComment.content);
    fireEvent.change(editInput, { target: { value: 'Updated comment' } });
    
    const submitButton = screen.getByRole('button', { name: /guardar/i });
    fireEvent.click(submitButton);

    expect(onEdit).toHaveBeenCalledWith(mockComment.id, {
      content: 'Updated comment'
    });
  });

  it('disables buttons when loading states are true', () => {
    render(
      <CommentItem
        comment={mockComment}
        onDelete={() => {}}
        onReply={() => {}}
        onEdit={() => {}}
        isDeleting={true}
        isCreatingReply={true}
        isEditing={true}
        showReplyButton={true}
      />
    );

    const deleteButton = screen.getByTitle('Eliminar comentario');
    const replyButton = screen.getByTitle('Responder comentario');
    const editButton = screen.getByTitle('Editar comentario');

    expect(deleteButton).toBeDisabled();
    expect(replyButton).toBeDisabled();
    expect(editButton).toBeDisabled();
  });
}); 
'use client';

import { Comment } from '../models/comment';
import CommentItem from './CommentItem';

interface CommentTreeProps {
  comments: Comment[];
  onDelete: (commentId: string) => void;
  isDeleting?: boolean;
  onCreateReply: (data: { content: string; name: string; avatar: string; parentId?: string }) => void;
  isCreatingReply?: boolean;
  onEditComment?: (commentId: string, data: { content: string }) => void;
  isEditingComment?: boolean;
}

export default function CommentTree({ 
  comments, 
  onDelete, 
  isDeleting = false,
  onCreateReply,
  isCreatingReply = false,
  onEditComment,
  isEditingComment = false
}: CommentTreeProps) {
  const handleReply = (parentId: string, data?: { content: string; name: string; avatar: string }) => {
    if (data) {
      onCreateReply({ ...data, parentId });
    }
  };
  const buildCommentTree = (comments: Comment[]): CommentNode[] => {
    const commentMap = new Map<string, CommentNode>();
    const roots: CommentNode[] = [];
    // Crear nodos para todos los comentarios
    comments.forEach(comment => {
      commentMap.set(comment.id, {
        comment,
        children: [],
        level: 0
      });
    });

    comments.forEach(comment => {
      const node = commentMap.get(comment.id)!;
      
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.children.push(node);
          node.level = parent.level + 1;
        } else {
          roots.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  const renderCommentNode = (node: CommentNode, index: number) => {
    return (
      <div key={node.comment.id} className="space-y-3">
        <div 
          className="transition-all duration-200"
          style={{ 
            marginLeft: `${node.level * 24}px`,
            borderLeft: node.level > 0 ? '2px solid #374151' : 'none',
            paddingLeft: node.level > 0 ? '12px' : '0'
          }}
        >
          <CommentItem
            comment={node.comment}
            onDelete={onDelete}
            isDeleting={isDeleting}
            onReply={handleReply}
            isCreatingReply={isCreatingReply}
            showReplyButton={true}
            onEdit={onEditComment}
            isEditing={isEditingComment}
          />
        </div>
        
        {node.children.length > 0 && (
          <div className="space-y-3">
            {node.children.map((child, childIndex) => 
              renderCommentNode(child, childIndex)
            )}
          </div>
        )}
      </div>
    );
  };

  const commentTree = buildCommentTree(comments);

  return (
    <div className="space-y-4">
      {commentTree.map((node, index) => renderCommentNode(node, index))}
    </div>
  );
}

interface CommentNode {
  comment: Comment;
  children: CommentNode[];
  level: number;
} 
'use client';

import { Comment } from '../models/comment';
import CommentItem from './CommentItem';
import { buildCommentTree } from '@/modules/posts/utils/comments';

interface CommentTreeProps {
  comments: Comment[];
  onDelete: (commentId: string) => void;
  isDeleting?: boolean;
  onCreateReply: (data: {
    content: string;
    name: string;
    avatar: string;
    parentId?: string;
  }) => void;
  isCreatingReply?: boolean;
  onEditComment?: (commentId: string, data: { content: string }) => void;
  isEditingComment?: boolean;
}

interface CommentNode {
  comment: Comment;
  children: CommentNode[];
  level: number;
}

export default function CommentTree({
  comments,
  onDelete,
  isDeleting = false,
  onCreateReply,
  isCreatingReply = false,
  onEditComment,
  isEditingComment = false,
}: CommentTreeProps) {
  const handleReply = (
    parentId: string,
    data?: { content: string; name: string; avatar: string }
  ) => {
    if (data) {
      onCreateReply({ ...data, parentId });
    }
  };

  const renderCommentNode = (node: CommentNode) => {
    return (
      <div key={node.comment.id} className="space-y-3">
        <div
          className="transition-all duration-200"
          style={{
            marginLeft: `${node.level * 24}px`,
            borderLeft: node.level > 0 ? '2px solid #374151' : 'none',
            paddingLeft: node.level > 0 ? '12px' : '0',
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
            {node.children.map((child) =>
              renderCommentNode(child)
            )}
          </div>
        )}
      </div>
    );
  };

  const commentTree = buildCommentTree(comments);

  return (
    <div className="space-y-4">
      {commentTree.map((node) => renderCommentNode(node))}
    </div>
  );
}

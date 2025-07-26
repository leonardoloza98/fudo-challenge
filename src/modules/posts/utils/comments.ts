import { type Comment } from '../models/comment';

interface CommentNode {
  comment: Comment;
  children: CommentNode[];
  level: number;
}

export function buildCommentTree(comments: Comment[]): CommentNode[] {
  const commentMap = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];

  // Create nodes for all comments
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
}

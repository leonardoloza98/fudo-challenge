import { API_ROUTES } from '@/common/constants/routes';
import { Comment } from '../models/comment';

export class CommentService {
  static async getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
      const response = await fetch(API_ROUTES.POSTS.COMMENTS(postId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const comments: Comment[] = await response.json();
      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  static async createComment(
    postId: string,
    data: Partial<Comment>
  ): Promise<Comment> {
    try {
      const response = await fetch(API_ROUTES.POSTS.COMMENTS(postId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const comment: Comment = await response.json();
      return comment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }
}

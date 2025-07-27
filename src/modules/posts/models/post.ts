import { type AvatarId } from '@/lib/avatars';

export interface Post {
  id: string;
  title: string;
  content: string;
  name: string;
  avatar: AvatarId;
  createdAt: string;
}

export interface CreatePostFormData {
  title: string;
  content: string;
}

export interface CreatePostBody {
  id: string;
  title: string;
  content: string;
  name: string;
  avatar: AvatarId;
  createdAt: string;
}

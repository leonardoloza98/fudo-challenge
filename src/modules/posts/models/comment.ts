import { type AvatarId } from '@/lib/avatars';

export interface Comment {
  id: string;
  content: string;
  name: string;
  avatar: AvatarId;
  createdAt: string;
  parentId?: string;
}

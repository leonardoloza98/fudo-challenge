export interface Comment {
    id: string
    content: string
    createdAt: string
    name: string
    avatar: string
    parentId?: string
}
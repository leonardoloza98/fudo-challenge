import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { PostService } from "./services/post.service"
import { CommentService } from "./services/comment.service"
import { CreatePostBody } from "./models/post"

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: PostService.getPosts,
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreatePostBody) => PostService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => PostService.getPostById(id),
  })
}

export const useGetComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => CommentService.getCommentsByPostId(postId),
  })
}
import { useQuery } from "@tanstack/react-query"
import { PostService } from "./services/post.service"
import { QUERY_KEYS } from "@/common/constants/queryKeys"

export const useGetPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: PostService.getPosts
  })
}

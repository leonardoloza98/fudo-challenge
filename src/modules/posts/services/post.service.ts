import { API_ROUTES } from "@/common/constants/routes"
import { Post } from "../models/post"

export class PostService {
  static async getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(API_ROUTES.POSTS.LIST, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const posts: Post[] = await response.json()
      return posts
    } catch (error) {
      console.error("Error fetching posts:", error)
      throw error
    }
  }
}

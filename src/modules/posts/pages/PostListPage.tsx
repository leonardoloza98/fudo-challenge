"use client"
import { useGetPosts } from "../queries"
import { useAppStore } from "@/lib/store"
import { Post } from "../models/post"
import { Header } from "@/components/ui/Header"
import { Button } from "@/components/ui/Button"
import { PlusIcon } from "lucide-react"

const PostListPage = () => {
    const { isLoading } = useAppStore()
    const { data: posts, isLoading: postsLoading, error } = useGetPosts()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">Cargando...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <div className="p-6">
                <Header />
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-white">Posts</h1>
                        <Button>
                            <PlusIcon className="w-4 h-4" />
                            Nuevo post
                        </Button>
                    </div>
                    
                    {postsLoading && (
                        <div className="text-white">Cargando posts...</div>
                    )}
                    
                    {error && (
                        <div className="text-red-400">Error al cargar posts: {error.message}</div>
                    )}
                    
                    {posts && (
                        <div className="space-y-4">
                            {posts.map((post: Post) => (
                                <div key={post.id} className="bg-gray-800/50 p-4 rounded-lg">
                                    <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
                                    <p className="text-gray-300 mb-2">{post.content}</p>
                                    <div className="text-sm text-gray-400">
                                        Por: {post.name} • {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostListPage
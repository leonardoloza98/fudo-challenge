"use client"
import { useParams, useRouter } from "next/navigation"
import { useGetPostById } from "../queries"
import { Header } from "@/components/ui/Header"
import { Button } from "@/components/ui/Button"
import { Spinner } from "@/components/ui/Spinner"
import { ArrowLeft } from "lucide-react"

const PostPage = () => {
    const { id } = useParams()
    const router = useRouter()

    const { data: post, isLoading, error } = useGetPostById(id as string)

    const handleBack = () => {
        router.push('/posts')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size="lg" />
                    <div className="text-white text-lg">Cargando post...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-400 text-xl mb-4">Error al cargar el post</div>
                    <div className="text-gray-400 mb-6">{error.message}</div>
                    <Button onClick={handleBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver a posts
                    </Button>
                </div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-400 text-xl mb-4">Post no encontrado</div>
                    <Button onClick={handleBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver a posts
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <div className="p-6">
                <Header />
                <div className="p-4">
                    <div className="flex items-center mb-6">
                        <Button 
                            onClick={handleBack}
                            className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver a posts
                        </Button>
                    </div>

                    <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/30">
                        <header className="mb-8 pb-6 border-b border-gray-700/50">
                            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                                {post.title}
                            </h1>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="font-medium">{post.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>•</span>
                                    <span>{new Date(post.createdAt).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                            </div>
                        </header>

                        <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-700/30">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Post #{post.id.slice(0, 8)}</span>
                                <span>Comentarios próximamente</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPage
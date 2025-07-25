"use client"
import { useAppStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { AvatarDisplay } from "@/modules/login/components/AvatarDisplay"

function PostsPage() {
    const { currentUser, isLoading, clearCurrentUser } = useAppStore()
    const router = useRouter()

    const handleLogout = () => {
        clearCurrentUser()
        router.replace("/")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">Cargando...</div>
            </div>
        )
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">No autorizado</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <div className="flex items-center justify-end gap-4 p-4">
                <AvatarDisplay avatar={currentUser.avatar} size={40} />
                <span className="text-white font-medium">{currentUser.name}</span>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                    Cerrar sesión
                </button>
            </div>
            PostsPage
        </div>
    )
}

export default PostsPage
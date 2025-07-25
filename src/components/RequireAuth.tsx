"use client"

import { useAppStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.replace("/")
    }
  }, [currentUser, router])

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    )
  }

  return <>{children}</>
} 
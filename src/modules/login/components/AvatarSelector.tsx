import { getPresetAvatars } from "@/lib/avatars"
import React from "react"

export type AvatarConfig = {
  style: string
  seed: string
}

function getAvatarUrl(avatar: AvatarConfig) {
  const baseUrl = process.env.NEXT_PUBLIC_AVATAR_API_URL
  return `${baseUrl}/${avatar.style}/svg?seed=${avatar.seed}`
}

type AvatarSelectorProps = {
  selectedAvatar: AvatarConfig
  onSelect: (avatar: AvatarConfig) => void
}

export function AvatarSelector({ selectedAvatar, onSelect }: AvatarSelectorProps) {
  const avatars = getPresetAvatars()
  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {avatars.map((avatar) => (
        <button
          key={avatar.seed}
          type="button"
          onClick={() => onSelect(avatar)}
          className={`rounded-full border-2 p-1 transition-all ${selectedAvatar.seed === avatar.seed ? "border-blue-500 ring-2 ring-blue-400" : "border-transparent"}`}
        >
          <img
            src={getAvatarUrl(avatar)}
            alt={avatar.seed}
            className="w-full h-full rounded-full bg-white"
          />
        </button>
      ))}
    </div>
  )
}

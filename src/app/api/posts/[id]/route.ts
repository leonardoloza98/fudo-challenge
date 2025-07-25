import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const response = await fetch(`https://665de6d7e88051d60408c32d.mockapi.io/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    const post = await response.json()
    return NextResponse.json(post)
}
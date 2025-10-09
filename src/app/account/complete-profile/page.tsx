"use client"

import React from "react"
import { Navigation } from "@/components/Navigation"

export default function CompleteProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-4">프로필 설정 완료하기</h1>
          <p className="text-slate-600">계정 정보를 추가하고 경매 경험을 맞춤화하세요.</p>
        </div>
      </div>
    </div>
  )
}

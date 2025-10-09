"use client"

import React from "react"
import { Navigation } from "@/components/Navigation"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-4">고객 지원</h1>
          <p className="text-slate-600">도움이 필요하시면 언제든지 문의하세요.</p>
        </div>
      </div>
    </div>
  )
}

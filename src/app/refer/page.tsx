"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Navigation } from "@/components/Navigation"

export default function ReferPage() {
  const [url, setUrl] = useState("https://megaauction.app/referral=신새벽")
  const [aboutText, setAboutText] = useState("MegaAuction은 크리에이터와 팬을 위한 24시간 경매 플랫폼입니다. 디지털 아트, 한정판 굿즈, 스니커즈 등 다양한 상품을 실시간으로 거래할 수 있으며, 안전한 결제와 자동 낙찰 시스템을 제공합니다. 친구를 초대하고 함께 특별한 경매를 시작해 보세요!")
  const [toasts, setToasts] = useState<Array<{ id: number; message: string }>>([])
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      const id = Date.now()
      // Add newest toast to the top so existing ones move downward
      setToasts((prev) => [{ id, message: "클립보드에 복사되었습니다" }, ...prev].slice(0, 5))
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 2500)
    } catch {}
  }
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8 items-start">
          {/* Toast stack */}
          <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 items-end">
            {toasts.map((t) => (
              <div key={t.id} className="bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-base md:text-lg font-semibold toast-pop">
                {t.message}
              </div>
            ))}
          </div>
          {/* Left: copy + actions */}
          <div>
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            추천한 크리에이터가 가입하면<br /> 최대 50,000원을 드려요!
          </h1>
          <p className="mt-6 text-slate-700 text-lg max-w-3xl">
            아래 나만의 추천 링크를 공유하세요. 추천받은 크리에이터가 MegaAuction에 가입하고 첫 경매를 개설하면 리워드가 지급됩니다.
          </p>

          {/* Share row */}
          <div className="mt-6 flex items-center gap-3">
            <button className="w-11 h-11 rounded-xl border flex items-center justify-center text-slate-700">💬</button>
            <button className="w-11 h-11 rounded-xl border flex items-center justify-center text-slate-700">✈️</button>
            <button className="w-11 h-11 rounded-xl border flex items-center justify-center text-slate-700">✉️</button>
            <div className="flex-1">
              <div className="flex items-center h-11 w-full rounded-xl border bg-white overflow-hidden">
                <div className="pl-3 pr-2 flex items-center text-slate-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 1 0-7.07 0a5 5 0 0 0 7.07 0Zm11.07-7.07a5 5 0 1 0-7.07 7.07a5 5 0 0 0 7.07-7.07ZM8.59 15.41l6.82-6.82"/>
                  </svg>
                </div>
                <Input value={url} onChange={(e)=>setUrl(e.target.value)} className="h-11 border-0 focus-visible:ring-0 flex-1" />
                <div className="w-px h-6 bg-slate-200" />
                <button
                  onClick={() => handleCopy(url)}
                  aria-label="share-copy"
                  className="h-full px-3 sm:px-4 flex items-center gap-2 text-slate-800 bg-gradient-to-r from-amber-50 to-pink-100 hover:from-amber-100 hover:to-pink-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span className="hidden sm:inline-block font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* About box (full-width input + button on the right) */}
          <div className="mt-8 flex items-center gap-3">
            <Card className="flex-1">
              <CardContent className="p-4">
                <Input value={aboutText} onChange={(e)=>setAboutText(e.target.value)} className="h-11 w-full" />
              </CardContent>
            </Card>
            <button
              onClick={() => handleCopy(aboutText)}
              aria-label="copy-about"
              className="w-11 h-11 rounded-xl border flex items-center justify-center text-slate-700 hover:bg-slate-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 max-w-2xl gap-6">
            <div>
              <div className="text-5xl font-extrabold">0</div>
              <div className="text-slate-600 mt-2">총 가입 수</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold">0</div>
              <div className="text-slate-600 mt-2">크리에이터</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold">₩0</div>
              <div className="text-slate-600 mt-2">적립금</div>
            </div>
          </div>

          <p className="mt-6 text-slate-600">
            추천 링크로 가입이 완료되면, 아래에 추천 내역이 표시됩니다.
          </p>

          <div className="mt-4">
            <Link href="/leaderboard" className="text-indigo-600 underline">추천 리더보드 보기</Link>
          </div>
          </div>

          {/* Right: floating avatars aligned to background */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[520px]">
              {[
                {top:20,left:"55%",size:56,img:11},
                {top:40,left:"75%",size:64,img:12},
                {top:80,left:"35%",size:52,img:13},
                {top:180,left:"20%",size:60,img:14},
                {top:160,left:"50%",size:72,img:15},
                {top:180,left:"80%",size:60,img:16},
                {top:300,left:"30%",size:56,img:17},
                {top:320,left:"65%",size:64,img:18},
                {top:360,left:"48%",size:52,img:19},
              ].map((a,idx)=> (
                <img
                  key={idx}
                  src={`https://i.pravatar.cc/80?img=${a.img}`}
                  alt="avatar"
                  draggable={false}
                  className="absolute rounded-full shadow-md border-2 border-white select-none"
                  style={{top:a.top as number,left:typeof a.left==='string'?a.left:a.left,width:a.size,height:a.size}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

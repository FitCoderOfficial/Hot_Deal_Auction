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
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false)
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
      
      {/* Yellow Banner */}
      <div className="bg-yellow-400 py-4 px-4">
        <div className="container mx-auto flex items-center justify-center gap-3">
          <span className="text-2xl">🏆</span>
          <span className="text-black font-semibold text-lg">
            추천 순위에 도전하고 특별한 리워드를 받아보세요!
          </span>
          <button 
            onClick={() => setShowLeaderboardModal(true)}
            className="text-blue-600 underline font-medium hover:text-blue-800"
          >
            순위 보기
          </button>
        </div>
      </div>
      
      <div className="pt-8">
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
            <Link href="/leaderboard" className="text-indigo-600 underline">추천 순위 보기</Link>
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

      {/* Leaderboard Modal */}
      {showLeaderboardModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">추천 순위</h2>
              <button 
                onClick={() => setShowLeaderboardModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              {/* Info Banner */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">순위에 도전하고 특별한 리워드를 받아보세요!</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  상위 순위에 오르면 MegaAuction 굿즈, 기프트카드, 뉴스레터 소개 등 다양한 혜택을 받을 수 있습니다. 
                  현금 수익에 더해 추가 혜택까지!
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 flex items-start gap-3">
                  <span className="text-amber-600 text-xl">⚠️</span>
                  <p className="text-amber-800 text-sm font-medium">
                    추천 링크를 통한 가입만 순위에 반영됩니다.
                  </p>
                </div>
              </div>

              {/* Leaderboard List */}
              <div className="space-y-2">
                {[
                  { rank: 1, name: '김경매러', referrals: 8, avatar: 'https://i.pravatar.cc/40?img=1', reward: '🏆', color: 'bg-gradient-to-r from-yellow-400 to-yellow-500' },
                  { rank: 2, name: '이수집가', referrals: 6, avatar: 'https://i.pravatar.cc/40?img=2', reward: '🥈', color: 'bg-gradient-to-r from-gray-300 to-gray-400' },
                  { rank: 3, name: '박아티스트', referrals: 5, avatar: 'https://i.pravatar.cc/40?img=3', reward: '🥉', color: 'bg-gradient-to-r from-amber-600 to-amber-700' },
                  { rank: 4, name: '최굿즈러', referrals: 4, avatar: 'https://i.pravatar.cc/40?img=4', reward: '👑', color: 'bg-gradient-to-r from-blue-400 to-blue-500' },
                  { rank: 5, name: '정한정판러', referrals: 3, avatar: 'https://i.pravatar.cc/40?img=5', reward: '👑', color: 'bg-gradient-to-r from-purple-400 to-purple-500' },
                  { rank: 6, name: '강아트러버', referrals: 2, avatar: 'https://i.pravatar.cc/40?img=6', reward: '👑', color: 'bg-gradient-to-r from-green-400 to-green-500' },
                  { rank: 7, name: '윤컬렉터', referrals: 2, avatar: 'https://i.pravatar.cc/40?img=7', reward: '👑', color: 'bg-gradient-to-r from-pink-400 to-pink-500' },
                  { rank: 8, name: '임빈티지러', referrals: 1, avatar: 'https://i.pravatar.cc/40?img=8', reward: '👑', color: 'bg-gradient-to-r from-indigo-400 to-indigo-500' },
                  { rank: 9, name: '서디자이너', referrals: 1, avatar: 'https://i.pravatar.cc/40?img=9', reward: '👑', color: 'bg-gradient-to-r from-teal-400 to-teal-500' },
                  { rank: 10, name: '한스타일러', referrals: 1, avatar: 'https://i.pravatar.cc/40?img=10', reward: '👑', color: 'bg-gradient-to-r from-orange-400 to-orange-500' }
                ].map((user, index) => (
                  <div 
                    key={user.rank} 
                    className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-all duration-200 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center text-slate-600 font-bold text-lg">
                      {user.rank}
                    </div>
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 text-lg">{user.name}</div>
                    </div>
                    <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                      {user.referrals}명 추천
                    </div>
                    <div className="text-3xl">{user.reward}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

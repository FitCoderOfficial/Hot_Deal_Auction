"use client"

import React, { useEffect, useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [tab, setTab] = useState<"basic" | "profile" | "experience" | "security" | "notifications">("basic")

  // Basic details
  const [fullName, setFullName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [phone, setPhone] = useState("")

  // Public profile
  const [bio, setBio] = useState("")
  const [website, setWebsite] = useState("")

  // Experience / preferences (auction specific)
  const [isBuyer, setIsBuyer] = useState(true)
  const [favoriteCategories, setFavoriteCategories] = useState<string>("")
  const [sellerStoreName, setSellerStoreName] = useState("")

  // Email & security
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")

  // Notifications
  const [notifyBid, setNotifyBid] = useState(true)
  const [notifyOutbid, setNotifyOutbid] = useState(true)
  const [notifyWin, setNotifyWin] = useState(true)
  const [notifyOrder, setNotifyOrder] = useState(true)

  useEffect(() => {
    // load from localStorage
    try {
      const s = JSON.parse(localStorage.getItem("settings_basic") || "{}")
      setFullName(s.fullName || "")
      setDisplayName(s.displayName || "")
      setPhone(s.phone || "")

      const p = JSON.parse(localStorage.getItem("settings_profile") || "{}")
      setBio(p.bio || "")
      setWebsite(p.website || "")

      const e = JSON.parse(localStorage.getItem("settings_experience") || "{}")
      setIsBuyer(e.isBuyer ?? true)
      setFavoriteCategories(e.favoriteCategories || "")
      setSellerStoreName(e.sellerStoreName || "")

      const sec = JSON.parse(localStorage.getItem("settings_security") || "{}")
      setEmail(sec.email || "")

      const n = JSON.parse(localStorage.getItem("settings_notifications") || "{}")
      setNotifyBid(n.notifyBid ?? true)
      setNotifyOutbid(n.notifyOutbid ?? true)
      setNotifyWin(n.notifyWin ?? true)
      setNotifyOrder(n.notifyOrder ?? true)
    } catch {}
  }, [])

  const saveBasic = () => {
    localStorage.setItem("settings_basic", JSON.stringify({ fullName, displayName, phone }))
    alert("기본 정보가 저장되었습니다.")
  }
  const saveProfile = () => {
    localStorage.setItem("settings_profile", JSON.stringify({ bio, website }))
    alert("프로필이 저장되었습니다.")
  }
  const saveExperience = () => {
    localStorage.setItem(
      "settings_experience",
      JSON.stringify({ isBuyer, favoriteCategories, sellerStoreName })
    )
    alert("환경설정이 저장되었습니다.")
  }
  const saveSecurity = () => {
    localStorage.setItem("settings_security", JSON.stringify({ email }))
    setNewPassword("")
    alert("보안 설정이 업데이트되었습니다.")
  }
  const saveNotifications = () => {
    localStorage.setItem(
      "settings_notifications",
      JSON.stringify({ notifyBid, notifyOutbid, notifyWin, notifyOrder })
    )
    alert("알림 설정이 저장되었습니다.")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8">계정 설정</h1>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="space-y-2">
                <button className={`w-full text-left px-4 py-3 rounded-md ${tab==='basic' ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'}`} onClick={() => setTab('basic')}>기본 정보</button>
                <button className={`w-full text-left px-4 py-3 rounded-md ${tab==='profile' ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'}`} onClick={() => setTab('profile')}>공개 프로필</button>
                <button className={`w-full text-left px-4 py-3 rounded-md ${tab==='experience' ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'}`} onClick={() => setTab('experience')}>환경설정 (구매/판매)</button>
                <button className={`w-full text-left px-4 py-3 rounded-md ${tab==='security' ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'}`} onClick={() => setTab('security')}>이메일 & 보안</button>
                <button className={`w-full text-left px-4 py-3 rounded-md ${tab==='notifications' ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'}`} onClick={() => setTab('notifications')}>알림</button>
              </div>
            </aside>

            {/* Content */}
            <section className="lg:col-span-9 space-y-8">
              {tab === 'basic' && (
                <Card>
                  <CardHeader>
                    <CardTitle>기본 정보</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div>
                        <Label>이름 (Full name)</Label>
                        <Input className="mt-1" value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="예: 홍길동" />
                      </div>
                      <div>
                        <Label>표시 이름 (Display name)</Label>
                        <Input className="mt-1" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} />
                        <p className="text-xs text-slate-500 mt-1">경매 내역과 공개 프로필에 보이는 이름입니다.</p>
                      </div>
                      <div>
                        <Label>휴대폰 번호</Label>
                        <Input className="mt-1" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="예: 010-1234-5678" />
                      </div>
                    </div>
                    <Button onClick={saveBasic} className="h-10">변경 사항 저장</Button>
                  </CardContent>
                </Card>
              )}

              {tab === 'profile' && (
                <Card>
                  <CardHeader>
                    <CardTitle>공개 프로필</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>소개</Label>
                      <Input className="mt-1" value={bio} onChange={(e)=>setBio(e.target.value)} placeholder="간단한 소개를 작성하세요" />
                    </div>
                    <div>
                      <Label>웹사이트</Label>
                      <Input className="mt-1" value={website} onChange={(e)=>setWebsite(e.target.value)} placeholder="https://example.com" />
                    </div>
                    <Button onClick={saveProfile} className="h-10">변경 사항 저장</Button>
                  </CardContent>
                </Card>
              )}

              {tab === 'experience' && (
                <Card>
                  <CardHeader>
                    <CardTitle>환경설정 (구매/판매)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-3">
                      <Button variant={isBuyer ? 'default' : 'outline'} onClick={()=>setIsBuyer(true)}>구매자</Button>
                      <Button variant={!isBuyer ? 'default' : 'outline'} onClick={()=>setIsBuyer(false)}>판매자</Button>
                    </div>
                    {isBuyer ? (
                      <div className="space-y-4">
                        <div>
                          <Label>선호 카테고리</Label>
                          <Input className="mt-1" value={favoriteCategories} onChange={(e)=>setFavoriteCategories(e.target.value)} placeholder="예: 디지털 아트, 스니커즈" />
                        </div>
                        <p className="text-xs text-slate-500">선호 카테고리를 바탕으로 경매 추천을 제공합니다.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label>스토어 이름</Label>
                          <Input className="mt-1" value={sellerStoreName} onChange={(e)=>setSellerStoreName(e.target.value)} placeholder="예: MegaAuction Shop" />
                        </div>
                        <p className="text-xs text-slate-500">판매자 프로필과 상품 상세에 노출됩니다.</p>
                      </div>
                    )}
                    <Button onClick={saveExperience} className="h-10">변경 사항 저장</Button>
                  </CardContent>
                </Card>
              )}

              {tab === 'security' && (
                <Card>
                  <CardHeader>
                    <CardTitle>이메일 & 보안</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>이메일</Label>
                      <Input className="mt-1" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div>
                      <Label>새 비밀번호 (모의)</Label>
                      <Input className="mt-1" type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="영문/숫자 조합 8자 이상" />
                      <p className="text-xs text-slate-500 mt-1">데모에서는 실제로 변경되지 않으며, 저장 시 초기화됩니다.</p>
                    </div>
                    <Button onClick={saveSecurity} className="h-10">변경 사항 저장</Button>
                  </CardContent>
                </Card>
              )}

              {tab === 'notifications' && (
                <Card>
                  <CardHeader>
                    <CardTitle>알림 설정</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ToggleRow label="내 입찰 관련 알림" checked={notifyBid} onChange={setNotifyBid} description="내가 참여한 경매의 상태를 알려드립니다." />
                    <ToggleRow label="누군가 상회 입찰 시 알림" checked={notifyOutbid} onChange={setNotifyOutbid} description="다른 사용자가 나보다 높은 금액을 제시하면 알려드립니다." />
                    <ToggleRow label="낙찰 알림" checked={notifyWin} onChange={setNotifyWin} description="경매에서 낙찰되면 즉시 알림을 보냅니다." />
                    <ToggleRow label="주문/배송 알림" checked={notifyOrder} onChange={setNotifyOrder} description="주문 상태와 배송 현황을 알려드립니다." />
                    <Button onClick={saveNotifications} className="h-10 mt-2">변경 사항 저장</Button>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description?: string; checked: boolean; onChange: (v: boolean)=>void }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div>
        <div className="font-medium">{label}</div>
        {description && <div className="text-xs text-slate-500">{description}</div>}
      </div>
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-slate-900' : 'bg-slate-300'}`}
        onClick={() => onChange(!checked)}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}

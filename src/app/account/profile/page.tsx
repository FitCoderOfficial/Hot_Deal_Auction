"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type UserRole = "user" | "seller"

export default function MyProfilePage() {
  const [role, setRole] = useState<UserRole>("user")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null)
  const [about, setAbout] = useState("")
  const [location, setLocation] = useState("")
  const [nickname, setNickname] = useState("")
  const [phone, setPhone] = useState("")
  const leftCardRef = useRef<HTMLDivElement | null>(null)
  const aboutCardRef = useRef<HTMLDivElement | null>(null)
  const badgesCardRef = useRef<HTMLDivElement | null>(null)
  const experienceCardRef = useRef<HTMLDivElement | null>(null)

  // Buyer defaults
  const [buyerCardBrand, setBuyerCardBrand] = useState("")
  const [buyerCardLast4, setBuyerCardLast4] = useState("")

  // Seller bank
  const [bankName, setBankName] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [bankHolder, setBankHolder] = useState("")

  useEffect(() => {
    // Load mock user info from localStorage created by temporary login
    try {
      const raw = localStorage.getItem("userInfo")
      if (raw) {
        const u = JSON.parse(raw) as { name?: string; email?: string; role?: UserRole }
        if (u.name) setName(u.name)
        if (u.email) setEmail(u.email)
        if (u.role) setRole(u.role)
      }
    } catch {}

    const a = localStorage.getItem("profile_avatar")
    if (a) setAvatarDataUrl(a)

    const aboutRaw = localStorage.getItem("profile_about")
    if (aboutRaw) setAbout(aboutRaw)

    const nickRaw = localStorage.getItem("profile_nickname")
    if (nickRaw) setNickname(nickRaw)

    const emailRaw = localStorage.getItem("profile_email")
    if (emailRaw) setEmail(emailRaw)

    const phoneRaw = localStorage.getItem("profile_phone")
    if (phoneRaw) setPhone(phoneRaw)

    const locRaw = localStorage.getItem("profile_location")
    if (locRaw) setLocation(locRaw)

    const buyerRaw = localStorage.getItem("profile_buyer")
    if (buyerRaw) {
      const b = JSON.parse(buyerRaw) as { brand?: string; last4?: string }
      setBuyerCardBrand(b.brand ?? "")
      setBuyerCardLast4(b.last4 ?? "")
    }

    const sellerRaw = localStorage.getItem("profile_seller")
    if (sellerRaw) {
      const s = JSON.parse(sellerRaw) as { bankName?: string; bankAccount?: string; bankHolder?: string }
      setBankName(s.bankName ?? "")
      setBankAccount(s.bankAccount ?? "")
      setBankHolder(s.bankHolder ?? "")
    }
  }, [])

  useEffect(() => {
    const syncHeights = () => {
      const left = leftCardRef.current
      const about = aboutCardRef.current
      const badges = badgesCardRef.current
      const exp = experienceCardRef.current
      const viewportCap = Math.round(window.innerHeight * 0.38)
      if (left && about) {
        about.style.minHeight = `${left.clientHeight}px`
      }
      if (badges && exp) {
        const desired = Math.min(badges.scrollHeight, viewportCap)
        badges.style.minHeight = `${desired}px`
        badges.style.maxHeight = `${viewportCap}px`
        badges.style.overflow = 'auto'
        exp.style.minHeight = `${desired}px`
        exp.style.maxHeight = `${viewportCap}px`
        exp.style.overflow = 'auto'
      }
    }
    syncHeights()
    window.addEventListener("resize", syncHeights)

    // React to dynamic content changes (images/fonts)
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      const target = badgesCardRef.current
      ro = new ResizeObserver(() => syncHeights())
      if (target) ro.observe(target)
    }
    return () => {
      window.removeEventListener("resize", syncHeights)
      if (ro) ro.disconnect()
    }
  }, [])

  const onUploadAvatar = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarDataUrl(reader.result)
        localStorage.setItem("profile_avatar", reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const saveBuyer = () => {
    localStorage.setItem(
      "profile_buyer",
      JSON.stringify({ brand: buyerCardBrand, last4: buyerCardLast4 })
    )
    alert("구매자 결제 설정이 저장되었습니다.")
  }

  const saveSeller = () => {
    localStorage.setItem(
      "profile_seller",
      JSON.stringify({ bankName, bankAccount, bankHolder })
    )
    alert("판매자 입금 통장 정보가 저장되었습니다.")
  }

  const saveAbout = () => {
    localStorage.setItem("profile_about", about)
    localStorage.setItem("profile_nickname", nickname)
    localStorage.setItem("profile_email", email)
    localStorage.setItem("profile_location", location)
    localStorage.setItem("profile_phone", phone)
    alert("프로필 정보가 저장되었습니다.")
  }

  const saveLocation = () => {
    localStorage.setItem("profile_location", location)
    alert("위치가 저장되었습니다.")
  }

  const grayAvatar = useMemo(
    () => (
      <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center shadow-inner">
        <svg width="42" height="42" viewBox="0 0 24 24" className="text-slate-400">
          <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-4.33 0-8 2.17-8 5v1h16v-1c0-2.83-3.67-5-8-5"/>
        </svg>
      </div>
    ),
    []
  )

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6">내 프로필</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card ref={leftCardRef}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {avatarDataUrl ? (
                        <img src={avatarDataUrl} alt="avatar" className="w-28 h-28 rounded-full object-cover border" />
                      ) : (
                        grayAvatar
                      )}
                      <label className="absolute -bottom-2 -right-2">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0]
                            if (f) onUploadAvatar(f)
                          }}
                        />
                        <span className="inline-block bg-slate-900 text-white text-xs px-2 py-1 rounded-md cursor-pointer">
                          사진 변경
                        </span>
                      </label>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{name || "이름 없음"}</div>
                      <div className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        Not activated
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label className="text-sm">판매자 정보</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div className="rounded-lg border p-3">
                        <div className="text-xs text-slate-500">평점</div>
                        <div className="mt-1 font-semibold">4.9 / 5</div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-xs text-slate-500">누적 판매</div>
                        <div className="mt-1 font-semibold">128 건</div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-xs text-slate-500">응답 속도</div>
                        <div className="mt-1 font-semibold">매우 빠름</div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-xs text-slate-500">인증</div>
                        <div className="mt-1 font-semibold">신원 인증 완료</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                      경매 성실도, 배송 처리 속도 등은 실제 활동에 따라 자동 갱신됩니다.
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card ref={badgesCardRef} className="select-none overscroll-contain">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>획득한 배지</CardTitle>
                </CardHeader>
                <CardContent className="select-none">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 rounded-xl border p-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">🏆</div>
                      <div>
                        <div className="text-sm font-medium">Trusted Seller</div>
                        <div className="text-xs text-slate-500">신뢰도 95% 이상</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border p-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">⚡</div>
                      <div>
                        <div className="text-sm font-medium">Fast Responder</div>
                        <div className="text-xs text-slate-500">평균 응답 1시간 이내</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border p-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">📦</div>
                      <div>
                        <div className="text-sm font-medium">100+ Sales</div>
                        <div className="text-xs text-slate-500">누적 판매 100건 달성</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border p-3">
                      <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center">💎</div>
                      <div>
                        <div className="text-sm font-medium">Premium Items</div>
                        <div className="text-xs text-slate-500">프리미엄 카테고리 판매</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Content */
            }
            <div className="lg:col-span-2 space-y-6">
              {/* About me */}
              <Card ref={aboutCardRef}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>내 소개</CardTitle>
                  <Button variant="ghost" size="sm">편집</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-yellow-50 text-yellow-900 text-sm rounded-md p-3">
                    💡 나의 개성과 구매/판매 성향을 짧게 소개해 보세요. 좋은 소개는 신뢰를 높여 낙찰 확률을 높입니다.
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">이메일</Label>
                      <Input className="mt-1 h-11 text-base" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
                      <p className="text-xs text-slate-500 mt-1">로그인과 알림에 사용됩니다.</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">닉네임</Label>
                      <Input className="mt-1 h-11 text-base" value={nickname} onChange={(e)=>setNickname(e.target.value)} placeholder="예: 길동콜렉터" />
                      <p className="text-xs text-slate-500 mt-1">프로필과 경매 활동에 표시됩니다.</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">주소</Label>
                      <Input className="mt-1 h-11 text-base" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="예: 서울특별시 강남구 ..." />
                      <p className="text-xs text-slate-500 mt-1">배송 및 출고 주소로 사용됩니다.</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">휴대폰 번호</Label>
                      <Input className="mt-1 h-11 text-base" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="예: 010-1234-5678" />
                      <p className="text-xs text-slate-500 mt-1">입찰/낙찰 알림을 문자로 받아보세요.</p>
                    </div>
                  </div>
                  {/* 저장 버튼 제거: 입력은 자동 저장되지는 않지만 버튼 UI는 숨깁니다. */}
                </CardContent>
              </Card>

              {/* My experience */}
              <Card ref={experienceCardRef} className="select-none overscroll-contain">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>활동 이력</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 select-none">
                  <div className="text-center py-12">
                    <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="text-slate-500"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m1 15h-2v-2h2Zm0-4h-2V7h2Z"/></svg>
                    </div>
                    <div className="mt-3 font-medium text-slate-700">아직 활동 이력이 없습니다.</div>
                  </div>
                </CardContent>
              </Card>

              {/* 상세 정보 레이아웃 제거됨 */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

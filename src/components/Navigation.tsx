"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X, ShoppingCart, User, Bell, ChevronRight, Settings, HelpCircle, Trophy, LogOut, Zap } from 'lucide-react'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<{name: string, role: string} | null>(null)
  const [openMenu, setOpenMenu] = useState<'none' | 'notifications' | 'cart' | 'user'>('none')

  // 컴포넌트 마운트 시 로그인 상태 확인
  React.useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn')
      const userData = localStorage.getItem('userInfo')
      
      if (loginStatus === 'true' && userData) {
        setIsLoggedIn(true)
        setUserInfo(JSON.parse(userData))
      }
    }
    
    checkLoginStatus()
    
    // localStorage 변경 감지
    const handleStorageChange = () => {
      checkLoginStatus()
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userInfo')
    setIsLoggedIn(false)
    setUserInfo(null)
    window.location.href = '/'
  }

  const toggleMenu = (menu: 'notifications' | 'cart' | 'user') => {
    setOpenMenu(prev => (prev === menu ? 'none' : menu))
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-sm shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-slate-900">
            MegaAuction
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-slate-600 hover:text-slate-900 transition-colors">
              상품
            </Link>
            <Link href="/auctions" className="text-slate-600 hover:text-slate-900 transition-colors">
              경매
            </Link>
            <Link href="/leaderboard" className="text-slate-600 hover:text-slate-900 transition-colors">
              리더보드
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && (
              <>
                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="sm" onClick={() => toggleMenu('notifications')}>
                    <Bell className="w-4 h-4" />
                  </Button>
                  <div className={`absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg overflow-hidden transition-all duration-200 origin-top-right ${openMenu==='notifications' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="p-3 text-sm font-semibold text-slate-700">알림</div>
                    <div className="divide-y">
                      <div className="p-3 hover:bg-slate-50 flex items-start gap-3">
                        <span className="text-lg">🔔</span>
                        <div className="text-sm"><div className="font-medium">경매 마감 임박</div><div className="text-slate-500">관심 상품이 1시간 후 종료됩니다.</div></div>
                      </div>
                      <div className="p-3 hover:bg-slate-50 flex items-start gap-3">
                        <span className="text-lg">✅</span>
                        <div className="text-sm"><div className="font-medium">입찰 성공</div><div className="text-slate-500">최고 입찰자가 되었습니다.</div></div>
                      </div>
                      <div className="p-3 hover:bg-slate-50 flex items-start gap-3">
                        <span className="text-lg">📦</span>
                        <div className="text-sm"><div className="font-medium">주문 업데이트</div><div className="text-slate-500">배송 준비 중입니다.</div></div>
                      </div>
                    </div>
                    <div className="p-2 text-sm text-slate-600 flex items-center justify-between hover:bg-slate-50">
                      전체 알림 보기 <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Cart */}
                <div className="relative">
                  <Button variant="ghost" size="sm" onClick={() => toggleMenu('cart')}>
                    <div className="relative">
                      <ShoppingCart className="w-5 h-5" />
                      <Badge className="absolute -top-2 -right-2 w-[14px] h-[14px] flex items-center justify-center text-[9px] leading-none">3</Badge>
                    </div>
                  </Button>
                  <div className={`absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg overflow-hidden transition-all duration-200 origin-top-right ${openMenu==='cart' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="p-3 text-sm font-semibold text-slate-700">장바구니</div>
                    <div className="divide-y">
                      <div className="p-3 hover:bg-slate-50 flex items-center gap-3">
                        <span className="text-xl">👟</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium">한정판 스니커즈</div>
                          <div className="text-xs text-slate-500">₩450,000</div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-slate-50 flex items-center gap-3">
                        <span className="text-xl">🎨</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium">디지털 아트</div>
                          <div className="text-xs text-slate-500">₩320,000</div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-slate-50 flex items-center gap-3">
                        <span className="text-xl">💎</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium">프리미엄 주얼리</div>
                          <div className="text-xs text-slate-500">₩180,000</div>
                        </div>
                      </div>
                    </div>
                    <Link href="/cart" onClick={() => setOpenMenu('none')} className="p-2 text-sm text-slate-600 flex items-center justify-between hover:bg-slate-50">
                      장바구니 보기 <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </>
            )}
            {isLoggedIn ? (
              <>
                {/* User */}
                <div className="relative">
                  <Button variant="ghost" size="sm" onClick={() => toggleMenu('user')}>
                    <User className="w-4 h-4" />
                  </Button>
                  <div className={`absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg overflow-hidden transition-all duration-200 origin-top-right ${openMenu==='user' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    {/* Header */}
                    <div className="p-4 flex items-center gap-3 border-b">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{userInfo?.name ?? '사용자'}</div>
                        <div className="text-xs text-slate-500">{(userInfo as any)?.email ?? 'user@example.com'}</div>
                      </div>
                    </div>
                    {/* Items */}
                    <div className="py-2">
                      <Link href="/account/complete-profile" onClick={() => setOpenMenu('none')} className="w-full px-4 py-3 text-sm flex items-center gap-3 text-orange-600 hover:bg-orange-50">
                        <Zap className="w-4 h-4" /> 프로필 설정 완료하기
                      </Link>
                      <Link href="/account/profile" onClick={() => setOpenMenu('none')} className="w-full px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50">
                        <User className="w-4 h-4 text-slate-600" /> 내 프로필
                      </Link>
                      <Link href="/settings" onClick={() => setOpenMenu('none')} className="w-full px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50">
                        <Settings className="w-4 h-4 text-slate-600" /> 설정
                      </Link>
                      <Link href="/support" onClick={() => setOpenMenu('none')} className="w-full px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50">
                        <HelpCircle className="w-4 h-4 text-slate-600" /> 고객 지원
                      </Link>
                      <Link href="/refer" onClick={() => setOpenMenu('none')} className="w-full px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50">
                        <Trophy className="w-4 h-4 text-slate-600" /> 친구 초대하고 혜택 받기
                      </Link>
                    </div>
                    {/* Logout */}
                    <div className="border-t">
                      <button onClick={handleLogout} className="w-full px-4 py-3 text-sm flex items-center gap-3 text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4" /> 로그아웃
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="lg" className="text-base font-semibold">
                  로그인
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="py-4 space-y-4">
              <Link
                href="/products"
                className="block text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                상품
              </Link>
              <Link
                href="/auctions"
                className="block text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                경매
              </Link>
              <Link
                href="/leaderboard"
                className="block text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                리더보드
              </Link>
              <div className="pt-4 border-t space-y-2">
                {isLoggedIn ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-base md:text-lg font-bold text-slate-800">내 계정</div>
                    <Link href="/account/complete-profile" className="w-full px-4 py-3 text-sm flex items-center gap-3 text-orange-600 hover:bg-orange-50">
                      <Zap className="w-4 h-4" /> 프로필 설정 완료하기
                    </Link>
                    <Link href="/account/profile" className="w-full px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50">
                      <User className="w-4 h-4 text-slate-600" /> 내 프로필
                    </Link>
                    <Link href="/settings" className="w-full px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50">
                      <Settings className="w-4 h-4 text-slate-600" /> 설정
                    </Link>
                    <Link href="/support" className="w-full px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50">
                      <HelpCircle className="w-4 h-4 text-slate-600" /> 고객 지원
                    </Link>
                    <Link href="/refer" className="w-full px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50">
                      <Trophy className="w-4 h-4 text-slate-600" /> 친구 초대하고 혜택 받기
                    </Link>
                    <div className="border-t pt-2">
                      <button onClick={handleLogout} className="w-full px-4 py-3 text-sm flex items-center gap-3 text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4" /> 로그아웃
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button variant="ghost" className="w-full text-base font-semibold">
                      로그인
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X, ShoppingCart, User, Bell } from 'lucide-react'
import { LoginModal } from '@/components/LoginModal'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<{name: string, role: string} | null>(null)

  return (
    <nav className="bg-white shadow-sm border-b">
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
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>
              </>
            )}
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">
                    {userInfo?.name} ({userInfo?.role === 'user' ? '일반사용자' : '판매자'})
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setIsLoggedIn(false)
                      setUserInfo(null)
                    }}
                  >
                    로그아웃
                  </Button>
                </div>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsLoginModalOpen(true)}>
                로그인
              </Button>
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
                  <div className="space-y-2">
                    <div className="flex justify-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <Bell className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="relative">
                        <ShoppingCart className="w-4 h-4" />
                        <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs">
                          3
                        </Badge>
                      </Button>
                    </div>
                    <div className="text-sm text-slate-600 text-center">
                      {userInfo?.name} ({userInfo?.role === 'user' ? '일반사용자' : '판매자'})
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        setIsLoggedIn(false)
                        setUserInfo(null)
                      }}
                    >
                      로그아웃
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full" onClick={() => setIsLoginModalOpen(true)}>
                    로그인
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={(userData) => {
          setIsLoggedIn(true)
          setUserInfo(userData)
          setIsLoginModalOpen(false)
        }}
      />
    </nav>
  )
}

"use client"

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Navigation } from '@/components/Navigation'

type UserType = 'user' | 'seller'

interface LoginFormData {
  email: string
  password: string
  userType: UserType
}

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>('user')
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    userType: 'user'
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = useCallback((field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleUserTypeChange = useCallback((type: UserType) => {
    setUserType(type)
    setFormData(prev => ({ ...prev, userType: type }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      alert('이메일과 비밀번호를 입력해주세요.')
      return
    }

    setIsLoading(true)
    
    try {
      // 로그인 상태로 설정
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userInfo', JSON.stringify({
        name: formData.email.split('@')[0],
        role: formData.userType,
        email: formData.email
      }))
      
      // 메인 페이지로 리다이렉트
      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
      alert('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }, [formData, router])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-lg mx-auto">
          
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center py-4">
              <CardTitle className="text-3xl">로그인</CardTitle>
              <CardDescription className="text-lg">
                MegaAuction에 오신 것을 환영합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label className="text-center block text-lg">계정 유형을 선택하세요</Label>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant={userType === 'user' ? 'default' : 'outline'}
                      className="flex-1 h-11 text-base"
                      onClick={() => handleUserTypeChange('user')}
                    >
                      일반 사용자
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'seller' ? 'default' : 'outline'}
                      className="flex-1 h-11 text-base"
                      onClick={() => handleUserTypeChange('seller')}
                    >
                      판매자
                    </Button>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-lg">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-11 text-base"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Password */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-lg">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="h-11 text-base"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-500">또는</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center gap-4 h-12 text-lg"
                      disabled={isLoading}
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center gap-4 h-12 text-lg"
                      disabled={isLoading}
                    >
                      <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center gap-4 h-12 text-lg"
                      disabled={isLoading}
                    >
                      <svg className="w-6 h-6" fill="#000000" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      Apple
                    </Button>
                  </div>
                </div>

                {/* Login Button */}
                <Button 
                  type="submit" 
                  className="w-full h-11 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? '로그인 중...' : '로그인'}
                </Button>

                {/* Sign Up Link */}
                <div className="text-center mt-3">
                  <p className="text-sm text-slate-600">
                    계정이 없으신가요?{' '}
                    <Link 
                      href="/signup"
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      회원가입
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

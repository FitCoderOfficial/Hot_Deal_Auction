'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/Navigation"
import Link from "next/link"

export default function SignupPage() {
  const [userType, setUserType] = useState<'user' | 'seller'>('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 회원가입 로직 구현
    console.log('Signup:', { userType, email, password, confirmPassword, name })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-lg mx-auto">
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center py-4">
              <CardTitle className="text-3xl">회원가입</CardTitle>
              <CardDescription className="text-lg">
                MegaAuction에 가입하여 특별한 경매를 경험해보세요
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
                      onClick={() => setUserType('user')}
                    >
                      일반 사용자
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'seller' ? 'default' : 'outline'}
                      className="flex-1 h-11 text-base"
                      onClick={() => setUserType('seller')}
                    >
                      판매자
                    </Button>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-lg">이름</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 text-base"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-lg">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 text-base"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-lg">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 text-base"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-lg">비밀번호 확인</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 text-base"
                    required
                  />
                </div>


                {/* Signup Button */}
                <Button type="submit" className="w-full h-11 text-lg">
                  회원가입
                </Button>

                {/* Login Link */}
                <div className="text-center mt-3">
                  <p className="text-sm text-slate-600">
                    이미 계정이 있으신가요?{' '}
                    <Link 
                      href="/login"
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      로그인
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  )
}

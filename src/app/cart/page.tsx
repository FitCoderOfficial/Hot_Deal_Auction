"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  emoji?: string
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])

  // Load from localStorage (compat with earlier mock: megaauction_cart)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("megaauction_cart")
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        setItems(parsed)
      } else {
        // Fallback mock
        setItems([
          { id: "sneaker", name: "한정판 스니커즈", price: 450000, qty: 1, emoji: "👟" },
          { id: "art", name: "디지털 아트", price: 320000, qty: 1, emoji: "🎨" },
        ])
      }
    } catch {
      // ignore parsing errors
    }
  }, [])

  const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items])

  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id)
    setItems(next)
    localStorage.setItem("megaauction_cart", JSON.stringify(next))
  }

  const clearAll = () => {
    setItems([])
    localStorage.removeItem("megaauction_cart")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6">장바구니</h1>

          {items.length === 0 ? (
            <Card className="border-slate-200">
              <CardContent className="py-12 text-center text-slate-600">
                장바구니가 비어있습니다.
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">상품 목록</CardTitle>
                </CardHeader>
                <CardContent className="divide-y">
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{it.emoji ?? "🛍️"}</span>
                        <div>
                          <div className="font-medium">{it.name}</div>
                          <div className="text-sm text-slate-500">₩{it.price.toLocaleString()} × {it.qty}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-semibold">₩{(it.price * it.qty).toLocaleString()}</div>
                        <Button variant="outline" size="sm" onClick={() => removeItem(it.id)}>삭제</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">결제 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>총 상품금액</span>
                    <span>₩{total.toLocaleString()}</span>
                  </div>
                  <Button className="w-full h-11 text-base">결제하기</Button>
                  <Button variant="outline" className="w-full h-11 text-base" onClick={clearAll}>전체 비우기</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

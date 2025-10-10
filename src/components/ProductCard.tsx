"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  sellerName: string
  isAuction?: boolean
  auctionEndsAt?: string
  currentBid?: number
  bidCount?: number
  sellerAvatar?: string
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  sellerName,
  isAuction = false,
  auctionEndsAt,
  currentBid,
  bidCount = 0,
  sellerAvatar,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false)
  const [burst, setBurst] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const key = `megaauction_wishlist_${id}`
    setLiked(localStorage.getItem(key) === '1')
  }, [id])

  const toggleLike = () => {
    if (typeof window === 'undefined') return
    const key = `megaauction_wishlist_${id}`
    const next = !liked
    setLiked(next)
    localStorage.setItem(key, next ? '1' : '0')
    // burst animation
    setBurst(true)
    setTimeout(() => setBurst(false), 250)
  }
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price)
  }

  const showToast = (message: string) => {
    if (typeof window === 'undefined') return
    const toast = document.createElement('div')
    toast.textContent = message
    toast.style.position = 'fixed'
    toast.style.right = '24px'
    toast.style.bottom = '24px'
    toast.style.zIndex = '9999'
    toast.style.background = 'rgba(17,24,39,0.9)'
    toast.style.color = '#fff'
    toast.style.padding = '10px 14px'
    toast.style.borderRadius = '8px'
    toast.style.fontSize = '14px'
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
    toast.style.opacity = '0'
    toast.style.transition = 'opacity 150ms ease'
    document.body.appendChild(toast)
    requestAnimationFrame(() => (toast.style.opacity = '1'))
    setTimeout(() => {
      toast.style.opacity = '0'
      setTimeout(() => toast.remove(), 200)
    }, 1800)
  }

  const addToCart = () => {
    if (typeof window === 'undefined') return
    const key = 'megaauction_cart'
    const raw = localStorage.getItem(key)
    const items: any[] = raw ? JSON.parse(raw) : []
    items.push({ id, name, price, isAuction, quantity: 1 })
    localStorage.setItem(key, JSON.stringify(items))
    showToast(`${isAuction ? '입찰 준비' : '장바구니'}: "${name}" 추가됨`)
  }

  const formatTimeRemaining = (endDate: string) => {
    const now = new Date()
    const end = new Date(endDate)
    const diff = end.getTime() - now.getTime()
    
    if (diff <= 0) return '종료됨'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}일 ${hours}시간`
    if (hours > 0) return `${hours}시간 ${minutes}분`
    return `${minutes}분`
  }

  return (
    <Card className="group overflow-hidden h-full flex flex-col w-full max-w-sm p-0">
      <Link href={`/products/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            onError={() => setImageError(true)}
            unoptimized
            priority={false}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <div className="w-16 h-16 mx-auto mb-2 bg-slate-300 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm">이미지 로딩 실패</p>
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {category}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 z-10">
          <div className="relative">
            {burst && <span className="absolute -inset-2 rounded-full bg-red-400/40 animate-ping" />}
            <Button
              size="sm"
              variant="secondary"
              className={`rounded-full shadow-md transition-transform ${liked ? 'scale-110' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleLike()
              }}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${liked ? 'text-red-500' : 'text-slate-600'}`}
                fill={liked ? 'currentColor' : 'none'}
              />
            </Button>
          </div>
        </div>
      </div>
      </Link>
      
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="text-sm text-gray-500 -mb-1">
          {sellerName}
        </div>
        <CardTitle className="text-lg line-clamp-2 -mt-1">{name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow flex flex-col">
        <div className="flex-1 flex items-end">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">현재 입찰가</span>
              <div className="relative overflow-hidden">
                <span className="font-semibold text-lg text-blue-600 transition-all duration-300 ease-in-out">
                  {formatPrice(isAuction ? (currentBid ?? 0) : price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
    </Card>
  )
}

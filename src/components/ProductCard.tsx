"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"

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
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-105 h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {category}
          </Badge>
        </div>
        {isAuction && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-orange-100 text-orange-800">
              경매
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="relative">
            {burst && <span className="absolute -inset-2 rounded-full bg-red-400/40 animate-ping" />}
            <Button
              size="sm"
              variant="secondary"
              className={`rounded-full shadow-md transition-transform ${liked ? 'scale-110' : ''}`}
              onClick={toggleLike}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${liked ? 'text-red-500' : 'text-slate-600'}`}
                fill={liked ? 'currentColor' : 'none'}
              />
            </Button>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={sellerAvatar} />
            <AvatarFallback>{sellerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{sellerName}</span>
        </div>
        <CardTitle className="text-lg line-clamp-2">{name}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        
        {isAuction ? (
          <div className="space-y-3 min-h-[80px]">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">현재 입찰가</span>
              <span className="font-semibold text-lg text-blue-600">
                {formatPrice(currentBid ?? 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">입찰 수</span>
              <span className="text-sm font-medium">{bidCount ?? 0}건</span>
            </div>
            {auctionEndsAt && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatTimeRemaining(auctionEndsAt)}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-between items-center min-h-[40px]">
            <span className="text-sm text-muted-foreground">가격</span>
            <span className="font-semibold text-lg text-slate-900">
              {formatPrice(price)}
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex-shrink-0">
        <Button className="w-full" size="sm" onClick={addToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isAuction ? '입찰하기' : '장바구니에 추가'}
        </Button>
      </CardFooter>
    </Card>
  )
}

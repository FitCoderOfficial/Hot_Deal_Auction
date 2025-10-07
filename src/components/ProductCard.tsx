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
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price)
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
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-105">
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
          <div className="absolute top-3 right-3">
            <Badge className="bg-orange-100 text-orange-800">
              경매
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="secondary" className="rounded-full">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={sellerAvatar} />
            <AvatarFallback>{sellerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{sellerName}</span>
        </div>
        <CardTitle className="text-lg line-clamp-2">{name}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        
        {isAuction ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">현재 입찰가</span>
              <span className="font-semibold text-lg text-blue-600">
                {formatPrice(currentBid || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">입찰 수</span>
              <span className="text-sm font-medium">{bidCount}건</span>
            </div>
            {auctionEndsAt && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatTimeRemaining(auctionEndsAt)}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">가격</span>
            <span className="font-semibold text-lg text-slate-900">
              {formatPrice(price)}
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button className="w-full" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isAuction ? '입찰하기' : '장바구니에 추가'}
        </Button>
      </CardFooter>
    </Card>
  )
}

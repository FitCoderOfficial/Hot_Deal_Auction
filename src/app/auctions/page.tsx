"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Gavel, TrendingUp } from 'lucide-react'
import Image from 'next/image'

// Mock auction data
const mockAuctions = [
  {
    id: '1',
    productName: '한정판 아티스트 굿즈 세트',
    productImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
    category: '굿즈',
    mode: 'bid' as const,
    status: 'active' as const,
    startPrice: 150000,
    currentBid: 180000,
    bidCount: 12,
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    sellerName: '아티스트스토어'
  },
  {
    id: '2',
    productName: '디지털 아트 NFT',
    productImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    category: '아트',
    mode: 'bid' as const,
    status: 'active' as const,
    startPrice: 250000,
    currentBid: 320000,
    bidCount: 8,
    endsAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    sellerName: '디지털아티스트'
  },
  {
    id: '3',
    productName: '한정판 스니커즈',
    productImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: '신발',
    mode: 'apply' as const,
    status: 'active' as const,
    startPrice: 300000,
    currentBid: null,
    bidCount: 25,
    endsAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    sellerName: '스니커헤드'
  }
]

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
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  if (days > 0) return `${days}일 ${hours}시간`
  if (hours > 0) return `${hours}시간 ${minutes}분`
  if (minutes > 0) return `${minutes}분 ${seconds}초`
  return `${seconds}초`
}

export default function AuctionsPage() {
  const [filter, setFilter] = useState<'all' | 'bid' | 'apply'>('all')

  const filteredAuctions = mockAuctions.filter(auction => {
    if (filter === 'all') return true
    return auction.mode === filter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">실시간 경매</h1>
              <p className="text-slate-600 mt-1">24시간 경매에 참여하고 특별한 상품을 획득하세요</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                전체
              </Button>
              <Button
                variant={filter === 'bid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('bid')}
              >
                입찰 경매
              </Button>
              <Button
                variant={filter === 'apply' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('apply')}
              >
                신청 경매
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {filteredAuctions.length === 0 ? (
          <div className="text-center py-12">
            <Gavel className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">
              현재 진행 중인 경매가 없습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image
                    src={auction.productImage}
                    alt={auction.productName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-100 text-blue-800">
                      {auction.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={auction.mode === 'bid' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}>
                      {auction.mode === 'bid' ? '입찰 경매' : '신청 경매'}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">
                    {auction.productName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    판매자: {auction.sellerName}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">시작가</span>
                    <span className="font-semibold">
                      {formatPrice(auction.startPrice)}
                    </span>
                  </div>
                  
                  {auction.currentBid && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">현재 입찰가</span>
                      <span className="font-semibold text-lg text-blue-600">
                        {formatPrice(auction.currentBid)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">입찰 수</span>
                    <span className="font-semibold">{auction.bidCount}건</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>종료까지</span>
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      {formatTimeRemaining(auction.endsAt)}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      {auction.mode === 'bid' ? '입찰하기' : '신청하기'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Live Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gavel className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">12</h3>
            <p className="text-muted-foreground">진행 중인 경매</p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">1,234</h3>
            <p className="text-muted-foreground">활성 참여자</p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">₩50M+</h3>
            <p className="text-muted-foreground">총 거래액</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

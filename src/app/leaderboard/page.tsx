"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/Navigation'
import { Badge } from '@/components/ui/badge'
import { Trophy, TrendingUp, Users, Star } from 'lucide-react'

// Mock leaderboard data
const sellerLeaderboard = [
  { rank: 1, name: '아티스트스토어', sales: 15000000, products: 45, avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 2, name: '디지털아티스트', sales: 12000000, products: 32, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 3, name: '스니커헤드', sales: 9800000, products: 28, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 4, name: '가죽공방', sales: 7500000, products: 22, avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 5, name: '도예공방', sales: 6200000, products: 18, avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&crop=faces&w=80&h=80' }
]

const buyerLeaderboard = [
  { rank: 1, name: '김경매러', spent: 8500000, purchases: 23, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 2, name: '이수집가', spent: 7200000, purchases: 19, avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 3, name: '박아티스트', spent: 6800000, purchases: 17, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 4, name: '최굿즈러', spent: 5400000, purchases: 15, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 5, name: '정한정판러', spent: 4200000, purchases: 12, avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&crop=faces&w=80&h=80' }
]

const highestSoldProducts = [
  { rank: 1, name: '한정판 아티스트 굿즈 세트', price: 2500000, seller: '아티스트스토어', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=60&h=60&fit=crop' },
  { rank: 2, name: '디지털 아트 NFT', price: 1800000, seller: '디지털아티스트', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=60&h=60&fit=crop' },
  { rank: 3, name: '한정판 스니커즈', price: 1500000, seller: '스니커헤드', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=60&h=60&fit=crop' },
  { rank: 4, name: '수제 가죽 지갑', price: 1200000, seller: '가죽공방', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop' },
  { rank: 5, name: '수제 도자기 세트', price: 980000, seller: '도예공방', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop' }
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price)
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'sellers' | 'buyers' | 'products'>('sellers')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-slate-900">리더보드</h1>
          </div>
          <p className="text-lg text-slate-600">
            Mega Auction의 최고 판매자, 구매자, 그리고 인기 상품들을 확인해보세요
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('sellers')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'sellers' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              판매자 순위
            </button>
            <button
              onClick={() => setActiveTab('buyers')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'buyers' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              구매자 순위
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'products' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              인기 상품
            </button>
          </div>
        </div>

        {/* Sellers Leaderboard */}
        {activeTab === 'sellers' && (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  판매자 순위
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sellerLeaderboard.map((seller) => (
                    <div key={seller.rank} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold">
                          {seller.rank}
                        </div>
                        <img
                          src={seller.avatar}
                          alt={seller.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{seller.name}</h3>
                          <p className="text-sm text-slate-600">{seller.products}개 상품</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-blue-600">
                          {formatPrice(seller.sales)}
                        </div>
                        <div className="text-sm text-slate-600">총 판매액</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Buyers Leaderboard */}
        {activeTab === 'buyers' && (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  구매자 순위
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {buyerLeaderboard.map((buyer) => (
                    <div key={buyer.rank} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full font-bold">
                          {buyer.rank}
                        </div>
                        <img
                          src={buyer.avatar}
                          alt={buyer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{buyer.name}</h3>
                          <p className="text-sm text-slate-600">{buyer.purchases}회 구매</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-green-600">
                          {formatPrice(buyer.spent)}
                        </div>
                        <div className="text-sm text-slate-600">총 구매액</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Leaderboard */}
        {activeTab === 'products' && (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  인기 상품
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {highestSoldProducts.map((product) => (
                    <div key={product.rank} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full font-bold">
                          {product.rank}
                        </div>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-slate-600">판매자: {product.seller}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-purple-600">
                          {formatPrice(product.price)}
                        </div>
                        <div className="text-sm text-slate-600">판매가</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">1,234</h3>
            <p className="text-slate-600">활성 판매자</p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">5,678</h3>
            <p className="text-slate-600">활성 구매자</p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">₩2.5B+</h3>
            <p className="text-slate-600">총 거래액</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

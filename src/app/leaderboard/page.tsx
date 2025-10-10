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
  { rank: 5, name: '도예공방', sales: 6200000, products: 18, avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 6, name: '핸드메이드샵', sales: 5800000, products: 16, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 7, name: '빈티지컬렉션', sales: 5200000, products: 14, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 8, name: '아트갤러리', sales: 4800000, products: 12, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 9, name: '커스텀샵', sales: 4200000, products: 10, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 10, name: '디자인스튜디오', sales: 3800000, products: 8, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=80&h=80' }
]

const buyerLeaderboard = [
  { rank: 1, name: '김경매러', spent: 8500000, purchases: 23, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 2, name: '이수집가', spent: 7200000, purchases: 19, avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 3, name: '박아티스트', spent: 6800000, purchases: 17, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 4, name: '최굿즈러', spent: 5400000, purchases: 15, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 5, name: '정한정판러', spent: 4200000, purchases: 12, avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 6, name: '강아트러버', spent: 3800000, purchases: 11, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 7, name: '윤컬렉터', spent: 3500000, purchases: 10, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 8, name: '임빈티지러', spent: 3200000, purchases: 9, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 9, name: '서디자이너', spent: 2900000, purchases: 8, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&crop=faces&w=80&h=80' },
  { rank: 10, name: '한스타일러', spent: 2600000, purchases: 7, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&crop=faces&w=80&h=80' }
]

const highestSoldProducts = [
  { rank: 1, name: '한정판 아티스트 굿즈 세트', price: 2500000, seller: '아티스트스토어', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=60&h=60&fit=crop' },
  { rank: 2, name: '디지털 아트 NFT', price: 1800000, seller: '디지털아티스트', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=60&h=60&fit=crop' },
  { rank: 3, name: '한정판 스니커즈', price: 1500000, seller: '스니커헤드', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=60&h=60&fit=crop' },
  { rank: 4, name: '수제 가죽 지갑', price: 1200000, seller: '가죽공방', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop' },
  { rank: 5, name: '수제 도자기 세트', price: 980000, seller: '도예공방', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop' },
  { rank: 6, name: '핸드메이드 목걸이', price: 850000, seller: '핸드메이드샵', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=60&h=60&fit=crop' },
  { rank: 7, name: '빈티지 시계', price: 750000, seller: '빈티지컬렉션', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop' },
  { rank: 8, name: '아트 프린트', price: 650000, seller: '아트갤러리', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=60&h=60&fit=crop' },
  { rank: 9, name: '커스텀 케이스', price: 550000, seller: '커스텀샵', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop' },
  { rank: 10, name: '디자인 포스터', price: 450000, seller: '디자인스튜디오', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=60&h=60&fit=crop' }
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
            <h1 className="text-4xl font-bold text-slate-900">순위</h1>
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
                        <div className="text-sm text-slate-600 mb-1">총 판매액</div>
                        <div className="font-bold text-lg text-blue-600">
                          {formatPrice(seller.sales)}
                        </div>
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
                        <div className="text-sm text-slate-600 mb-1">총 구매액</div>
                        <div className="font-bold text-lg text-green-600">
                          {formatPrice(buyer.spent)}
                        </div>
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
                        <div className="text-sm text-slate-600 mb-1">판매가</div>
                        <div className="font-bold text-lg text-purple-600">
                          {formatPrice(product.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  )
}

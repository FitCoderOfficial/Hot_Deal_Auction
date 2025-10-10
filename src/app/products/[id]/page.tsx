"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Navigation } from '@/components/Navigation'
import { Heart, Share2, Clock, Users, Gavel, Shield, Truck, Star, ThumbsUp, ThumbsDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock product data
const mockProduct = {
  id: '1',
  name: '한정판 아티스트 굿즈 세트',
  description: '인기 아티스트의 한정판 굿즈가 포함된 프리미엄 세트입니다. 독점 디자인과 고품질 소재로 제작된 수집가용 아이템입니다.',
  category: '굿즈',
  sellerName: '아티스트스토어',
  sellerAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&crop=faces&w=80&h=80',
  currentBid: 180000,
  startingBid: 100000,
  bidCount: 15,
  auctionEndsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  images: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&h=600'
  ],
  isAuction: true,
  condition: '새상품',
  shipping: '무료배송',
  returnPolicy: '7일 무료반품',
  sellerRating: 4.8,
  totalSales: 1247
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [liked, setLiked] = useState(false)
  const [bidAmount, setBidAmount] = useState('')
  const [activeTab, setActiveTab] = useState('description')
  const [reviewLikes, setReviewLikes] = useState({
    review1: { liked: false, count: 22 },
    review2: { liked: false, count: 8 },
    review3: { liked: false, count: 15 }
  })
  const [reviewDislikes, setReviewDislikes] = useState({
    review1: { disliked: false, count: 0 },
    review2: { disliked: false, count: 0 },
    review3: { disliked: false, count: 0 }
  })
  const [animations, setAnimations] = useState({
    review1: { like: false, dislike: false },
    review2: { like: false, dislike: false },
    review3: { like: false, dislike: false }
  })

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

    if (diff <= 0) return '경매 종료'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}일 ${hours}시간`
    if (hours > 0) return `${hours}시간 ${minutes}분`
    return `${minutes}분`
  }

  const handleBid = () => {
    const amount = parseInt(bidAmount.replace(/[^0-9]/g, ''))
    if (amount > mockProduct.currentBid) {
      alert(`₩${amount.toLocaleString()}원으로 입찰하시겠습니까?`)
      // 여기에 실제 입찰 로직 구현
    } else {
      alert('현재 입찰가보다 높은 금액을 입력해주세요.')
    }
  }

  const handleLike = (reviewId: string) => {
    setReviewLikes(prev => {
      const current = prev[reviewId as keyof typeof prev]
      const newLiked = !current.liked
      return {
        ...prev,
        [reviewId]: {
          liked: newLiked,
          count: newLiked ? current.count + 1 : current.count - 1
        }
      }
    })
    
    // Trigger animation
    setAnimations(prev => ({
      ...prev,
      [reviewId]: { ...prev[reviewId as keyof typeof prev], like: true }
    }))
    
    setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        [reviewId]: { ...prev[reviewId as keyof typeof prev], like: false }
      }))
    }, 1000)
  }

  const handleDislike = (reviewId: string) => {
    setReviewDislikes(prev => {
      const current = prev[reviewId as keyof typeof prev]
      const newDisliked = !current.disliked
      return {
        ...prev,
        [reviewId]: {
          disliked: newDisliked,
          count: newDisliked ? current.count + 1 : current.count - 1
        }
      }
    })
    
    // Trigger animation
    setAnimations(prev => ({
      ...prev,
      [reviewId]: { ...prev[reviewId as keyof typeof prev], dislike: true }
    }))
    
    setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        [reviewId]: { ...prev[reviewId as keyof typeof prev], dislike: false }
      }))
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-6 flex flex-col items-end justify-center">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden w-full max-w-lg">
              <Image
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-lg">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${mockProduct.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6 max-w-lg mx-auto lg:mx-0">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
              <Link href="/products" className="hover:text-blue-600">상품</Link> &gt; {mockProduct.category}
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockProduct.name}</h1>
              <p className="text-gray-600 text-lg">{mockProduct.description}</p>
            </div>

            {/* Auction Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">현재 입찰가</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(mockProduct.currentBid)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">남은 시간</div>
                  <div className="text-2xl font-bold text-red-600">
                    {formatTimeRemaining(mockProduct.auctionEndsAt)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">시작가:</span>
                  <span className="ml-2 font-medium">{formatPrice(mockProduct.startingBid)}</span>
                </div>
                <div>
                  <span className="text-gray-600">입찰 수:</span>
                  <span className="ml-2 font-medium">{mockProduct.bidCount}건</span>
                </div>
              </div>
            </div>

            {/* Bid Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="입찰가를 입력하세요"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button onClick={handleBid} className="px-8 py-3 bg-blue-600 hover:bg-blue-700">
                  입찰하기
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <Avatar className="w-12 h-12">
                <AvatarImage src={mockProduct.sellerAvatar} />
                <AvatarFallback>{mockProduct.sellerName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{mockProduct.sellerName}</div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{mockProduct.sellerRating}</span>
                  <span>•</span>
                  <span>총 {mockProduct.totalSales}건 판매</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                판매자 문의
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 ${liked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                {liked ? '찜함' : '찜하기'}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                공유하기
              </Button>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>안전거래 보장</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>{mockProduct.shipping}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span>{mockProduct.returnPolicy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gavel className="w-4 h-4 text-purple-600" />
                  <span>경매 진행중</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 justify-center">
              {[
                { id: 'description', label: '상품 설명' },
                { id: 'shipping', label: '배송 정보' },
                { id: 'reviews', label: '리뷰' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">상품 상세 정보</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {mockProduct.description}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">구성품</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>독점 아트 프린트 (A3 사이즈, 한정판 넘버링)</li>
                      <li>프리미엄 에코백 (아티스트 시그니처 디자인)</li>
                      <li>고급 세라믹 머그컵</li>
                      <li>미공개 포토카드 세트 (5종)</li>
                      <li>특별 제작 인증서</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">특징</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li><strong>독점 디자인:</strong> 오직 이 세트에서만 만나볼 수 있는 유니크한 디자인</li>
                      <li><strong>고품질 소재:</strong> 오래도록 소장할 수 있는 내구성 좋은 소재 사용</li>
                      <li><strong>수집 가치:</strong> 한정 수량으로 제작되어 높은 희소성</li>
                      <li><strong>인증서 포함:</strong> 진품 인증서와 함께 제공</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">상품 상태:</span>
                      <span className="ml-2 text-gray-600">{mockProduct.condition}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">배송 방법:</span>
                      <span className="ml-2 text-gray-600">{mockProduct.shipping}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">제조사:</span>
                      <span className="ml-2 text-gray-600">아티스트스토어</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">원산지:</span>
                      <span className="ml-2 text-gray-600">대한민국</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">배송 정보</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">무료배송 (전국)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <span>경매 종료 후 3-5일 내 발송</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span>안전 포장 보장</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">배송 안내</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• 도서산간 지역 추가 배송비 없음</li>
                        <li>• 배송 추적 가능</li>
                        <li>• 택배사: CJ대한통운</li>
                        <li>• 배송 시간: 평일 오전 9시-오후 6시</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-3">배송 지역별 소요시간</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="font-medium">서울/경기</div>
                        <div className="text-gray-600">1-2일</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="font-medium">충청/전라</div>
                        <div className="text-gray-600">2-3일</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="font-medium">경상/강원</div>
                        <div className="text-gray-600">2-3일</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="font-medium">제주/도서산간</div>
                        <div className="text-gray-600">3-4일</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">이전 경매 후기 24</h3>
                
                {/* Overall Review Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">상품 품질</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{width: '98%'}}></div>
                        </div>
                        <span className="text-sm font-bold text-red-500">98%</span>
                        <span className="text-gray-400">▼</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">배송 속도</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{width: '95%'}}></div>
                        </div>
                        <span className="text-sm font-bold text-red-500">95%</span>
                        <span className="text-gray-400">▼</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">판매자 소통</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                        <span className="text-sm font-bold text-red-500">100%</span>
                        <span className="text-gray-400">▼</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm">김</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">김수집가</span>
                          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">후원자 Pick</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">후원한 경매 3 · 후기 2</div>
                        <div className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded inline-block mb-3">
                          후원자 Pick
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-800 leading-relaxed">
                        최고입니다! 정말 만족스러운 구매였습니다. 아티스트의 시그니처가 들어간 에코백이 특히 마음에 들어요. 
                        콘서트 갈 때도 가져갔어요. 포토카드도 넣고 다녀요.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-lg shadow-sm mb-2 mx-auto flex items-center justify-center">
                              <span className="text-2xl">🎒</span>
                            </div>
                            <p className="text-xs text-gray-600">에코백 사용 모습</p>
                          </div>
                        </div>
                      </div>
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-pink-100 to-yellow-100 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-lg shadow-sm mb-2 mx-auto flex items-center justify-center">
                              <span className="text-2xl">💳</span>
                            </div>
                            <p className="text-xs text-gray-600">포토카드 컬렉션</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">2024.01.15</span>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleLike('review1')}
                          className={`relative flex items-center gap-1 transition-colors ${
                            reviewLikes.review1.liked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                          }`}
                        >
                          <ThumbsUp className={`w-5 h-5 ${reviewLikes.review1.liked ? 'fill-blue-600 text-blue-600' : ''}`} />
                          <span className="text-sm">{reviewLikes.review1.count}</span>
                          {animations.review1.like && (
                            <span className="pointer-events-none absolute -top-3 -right-3 confetti-burst" />
                          )}
                        </button>
                        <button 
                          onClick={() => handleDislike('review1')}
                          className={`relative flex items-center gap-1 transition-colors ${
                            reviewDislikes.review1.disliked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                          }`}
                        >
                          <ThumbsDown className={`w-5 h-5 ${reviewDislikes.review1.disliked ? 'fill-red-600 text-red-600' : ''}`} />
                          <span className="text-sm">{reviewDislikes.review1.count}</span>
                          {animations.review1.dislike && (
                            <span className="pointer-events-none absolute -top-3 -right-3 warning-burst" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-green-300 rounded-full flex items-center justify-center">
                        <span className="text-green-700 text-sm">이</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">이굿즈러버</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">후원한 경매 1 · 후기 1</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-800 leading-relaxed">
                        한정판이라 걱정했는데 품질이 정말 좋네요. 머그컵도 실용적이고 디자인도 예뻐서 매일 사용하고 있습니다. 
                        다음에도 이런 굿즈가 나오면 또 구매하고 싶어요!
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">2024.01.10</span>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleLike('review2')}
                          className={`relative flex items-center gap-1 transition-colors ${
                            reviewLikes.review2.liked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                          }`}
                        >
                          <ThumbsUp className={`w-5 h-5 ${reviewLikes.review2.liked ? 'fill-blue-600 text-blue-600' : ''}`} />
                          <span className="text-sm">{reviewLikes.review2.count}</span>
                          {animations.review2.like && (
                            <span className="pointer-events-none absolute -top-3 -right-3 confetti-burst" />
                          )}
                        </button>
                        <button 
                          onClick={() => handleDislike('review2')}
                          className={`relative flex items-center gap-1 transition-colors ${
                            reviewDislikes.review2.disliked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                          }`}
                        >
                          <ThumbsDown className={`w-5 h-5 ${reviewDislikes.review2.disliked ? 'fill-red-600 text-red-600' : ''}`} />
                          <span className="text-sm">{reviewDislikes.review2.count}</span>
                          {animations.review2.dislike && (
                            <span className="pointer-events-none absolute -top-3 -right-3 warning-burst" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center">
                        <span className="text-purple-700 text-sm">박</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">박아티스트</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">후원한 경매 5 · 후기 3</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-800 leading-relaxed">
                        포토카드가 정말 귀여워요! 5종 모두 다른 표정이라 수집의 재미가 있습니다. 
                        인증서도 함께 와서 진품임을 확인할 수 있어서 안심이 되네요.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">2024.01.08</span>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleLike('review3')}
                          className={`relative flex items-center gap-1 transition-colors ${
                            reviewLikes.review3.liked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                          }`}
                        >
                          <ThumbsUp className={`w-5 h-5 ${reviewLikes.review3.liked ? 'fill-blue-600 text-blue-600' : ''}`} />
                          <span className="text-sm">{reviewLikes.review3.count}</span>
                          {animations.review3.like && (
                            <span className="pointer-events-none absolute -top-3 -right-3 confetti-burst" />
                          )}
                        </button>
                        <button 
                          onClick={() => handleDislike('review3')}
                          className={`relative flex items-center gap-1 transition-colors ${
                            reviewDislikes.review3.disliked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                          }`}
                        >
                          <ThumbsDown className={`w-5 h-5 ${reviewDislikes.review3.disliked ? 'fill-red-600 text-red-600' : ''}`} />
                          <span className="text-sm">{reviewDislikes.review3.count}</span>
                          {animations.review3.dislike && (
                            <span className="pointer-events-none absolute -top-3 -right-3 warning-burst" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center py-6">
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    더 많은 후기 보기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Scoped styles for confetti/warning bursts
<style jsx>{`
  .confetti-burst {
    width: 1px;
    height: 1px;
  }
  .confetti-burst::before, .confetti-burst::after {
    content: '';
    position: absolute;
    inset: 0;
    animation: confetti 600ms ease-out forwards;
    background:
      radial-gradient(circle at 10px 0, #fbbf24 2px, transparent 3px),
      radial-gradient(circle at -6px 4px, #34d399 2px, transparent 3px),
      radial-gradient(circle at 0 12px, #60a5fa 2px, transparent 3px),
      radial-gradient(circle at 8px 10px, #ef4444 2px, transparent 3px);
    background-size: 6px 6px;
    background-repeat: no-repeat;
  }
  .warning-burst {
    width: 1px;
    height: 1px;
  }
  .warning-burst::before, .warning-burst::after {
    content: '';
    position: absolute;
    inset: 0;
    animation: warning 600ms ease-out forwards;
    background:
      radial-gradient(circle at 10px 0, #ef4444 2px, transparent 3px),
      radial-gradient(circle at -6px 4px, #f87171 2px, transparent 3px),
      radial-gradient(circle at 0 12px, #fb7185 2px, transparent 3px),
      radial-gradient(circle at 8px 10px, #dc2626 2px, transparent 3px);
    background-size: 6px 6px;
    background-repeat: no-repeat;
  }
  @keyframes confetti {
    0% { transform: translate(0,0) scale(1); opacity: 1; }
    100% { transform: translate(-8px,-16px) scale(0.8); opacity: 0; }
  }
  @keyframes warning {
    0% { transform: translate(0,0) scale(1); opacity: 1; }
    100% { transform: translate(-8px,-16px) scale(0.8) rotate(10deg); opacity: 0; }
  }
`}</style>

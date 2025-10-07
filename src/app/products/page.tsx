"use client"

import { useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { Navigation } from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Grid, List } from 'lucide-react'

// Mock data
const mockProducts = [
  {
    id: '1',
    name: '한정판 아티스트 굿즈 세트',
    description: '인기 아티스트의 한정판 굿즈가 포함된 프리미엄 세트입니다.',
    price: 150000,
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
    category: '굿즈',
    sellerName: '아티스트스토어',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    isAuction: true,
    auctionEndsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    currentBid: 180000,
    bidCount: 12
  },
  {
    id: '2',
    name: '수제 가죽 지갑',
    description: '장인정신으로 만든 프리미엄 가죽 지갑입니다.',
    price: 89000,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: '패션',
    sellerName: '가죽공방',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    isAuction: false
  },
  {
    id: '3',
    name: '디지털 아트 NFT',
    description: '신진 작가의 독창적인 디지털 아트 작품입니다.',
    price: 250000,
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    category: '아트',
    sellerName: '디지털아티스트',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    isAuction: true,
    auctionEndsAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    currentBid: 320000,
    bidCount: 8
  },
  {
    id: '4',
    name: '수제 도자기 세트',
    description: '전통 기법으로 제작된 아름다운 도자기 세트입니다.',
    price: 120000,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: '공예',
    sellerName: '도예공방',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    isAuction: false
  },
  {
    id: '5',
    name: '한정판 스니커즈',
    description: '콜라보레이션 한정판 스니커즈입니다.',
    price: 300000,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: '신발',
    sellerName: '스니커헤드',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    isAuction: true,
    auctionEndsAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    currentBid: 450000,
    bidCount: 25
  },
  {
    id: '6',
    name: '수제 향수',
    description: '천연 원료로 만든 프리미엄 향수입니다.',
    price: 180000,
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    category: '뷰티',
    sellerName: '향수마스터',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face',
    isAuction: false
  }
]

const categories = [
  '전체',
  '굿즈',
  '패션',
  '아트',
  '공예',
  '신발',
  '뷰티',
  '기타'
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '전체' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">상품 둘러보기</h1>
              <p className="text-slate-600 mt-1">다양한 크리에이터들의 특별한 상품을 만나보세요</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="상품명 또는 설명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {searchTerm || selectedCategory !== '전체' 
                ? '검색 결과가 없습니다.' 
                : '등록된 상품이 없습니다.'
              }
            </p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              더 많은 상품 보기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

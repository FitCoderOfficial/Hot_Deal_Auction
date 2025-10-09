import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star, Users, Zap, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-blue-700">1000+ 크리에이터의 작품</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-4">
            You can discover
          </h1>
          <h2 className="text-6xl md:text-8xl font-bold italic text-slate-900 mb-6">
            Mega Auction
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            독창적인 작품과 한정판 아이템을 만나보세요. 
            경험 많은 아티스트와 크리에이터의 프리미엄 작품들을 경매로 만나보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-6">
                경매 시작하기
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              상품 둘러보기
            </Button>
          </div>
          <p className="text-sm text-slate-500">무료로 시작하세요 ••</p>
        </div>
        
        {/* Scrolling Product Cards (below text) */}
        <div className="mt-10 overflow-hidden w-screen relative left-1/2 right-1/2 -mx-[50vw] py-4 px-6">
          <div className="flex w-max animate-scroll gap-6">
            {/* First set of cards */}
            <div className="flex gap-6">
              <div className="w-72 h-96 bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
                <div className="relative h-full">
                  <Image src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&h=800" alt="디지털 아트" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-left">디지털 아트</div>
                    <div className="mt-2 flex items-center gap-2 text-sm opacity-95">
                      <Image src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&crop=faces&w=64&h=64" alt="seller" width={28} height={28} className="rounded-full object-cover" />
                      <span className="font-medium">디지털아티스트</span>
                    </div>
                    <div className="mt-2 text-xl font-bold text-left">₩320,000</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">NFT 아트워크</h3>
                  <p className="text-xs text-slate-600">독창적인 디지털 아트</p>
                </div>
              </div>
              
              <div className="w-72 h-96 bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
                <div className="relative h-full">
                  <Image src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&h=800" alt="수제 가죽" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-left">수제 가죽</div>
                    <div className="mt-2 flex items-center gap-2 text-sm opacity-95">
                      <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=64&h=64" alt="seller" width={28} height={28} className="rounded-full object-cover" />
                      <span className="font-medium">가죽공방</span>
                    </div>
                    <div className="mt-2 text-xl font-bold text-left">₩89,000</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">프리미엄 지갑</h3>
                  <p className="text-xs text-slate-600">장인정신의 가죽 제품</p>
                </div>
              </div>
              
              <div className="w-72 h-96 bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
                <div className="relative h-full">
                  <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=800" alt="한정판 굿즈" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-left">한정판 굿즈</div>
                    <div className="mt-2 flex items-center gap-2 text-sm opacity-95">
                      <Image src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&crop=faces&w=64&h=64" alt="seller" width={28} height={28} className="rounded-full object-cover" />
                      <span className="font-medium">아티스트스토어</span>
                    </div>
                    <div className="mt-2 text-xl font-bold text-left">₩180,000</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">아티스트 굿즈</h3>
                  <p className="text-xs text-slate-600">한정판 프리미엄 세트</p>
                </div>
              </div>
              
              <div className="w-72 h-96 bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
                <div className="relative h-full">
                  <Image src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&h=800" alt="스니커즈" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-left">스니커즈</div>
                    <div className="mt-2 flex items-center gap-2 text-sm opacity-95">
                      <Image src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&crop=faces&w=64&h=64" alt="seller" width={28} height={28} className="rounded-full object-cover" />
                      <span className="font-medium">스니커헤드</span>
                    </div>
                    <div className="mt-2 text-xl font-bold text-left">₩450,000</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">한정판 스니커즈</h3>
                  <p className="text-xs text-slate-600">콜라보레이션 한정판</p>
                </div>
              </div>
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex gap-6">
              <div className="w-72 h-96 bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
                <div className="relative h-full">
                  <Image src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&h=800" alt="디지털 아트" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-left">디지털 아트</div>
                    <div className="mt-2 flex items-center gap-2 text-sm opacity-95">
                      <Image src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&crop=faces&w=64&h=64" alt="seller" width={28} height={28} className="rounded-full object-cover" />
                      <span className="font-medium">디지털아티스트</span>
                    </div>
                    <div className="mt-2 text-xl font-bold text-left">₩320,000</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">NFT 아트워크</h3>
                  <p className="text-xs text-slate-600">독창적인 디지털 아트</p>
                </div>
              </div>
              
              <div className="w-72 h-96 bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
                <div className="relative h-full">
                  <Image src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&h=800" alt="수제 가죽" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-left">수제 가죽</div>
                    <div className="mt-2 flex items-center gap-2 text-sm opacity-95">
                      <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=64&h=64" alt="seller" width={28} height={28} className="rounded-full object-cover" />
                      <span className="font-medium">가죽공방</span>
                    </div>
                    <div className="mt-2 text-xl font-bold text-left">₩89,000</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">프리미엄 지갑</h3>
                  <p className="text-xs text-slate-600">장인정신의 가죽 제품</p>
                </div>
              </div>
              
              <div className="w-72 h-96 bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
                <div className="relative h-full">
                  <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=800" alt="한정판 굿즈" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-left">한정판 굿즈</div>
                    <div className="mt-2 flex items-center gap-2 text-sm opacity-95">
                      <Image src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&crop=faces&w=64&h=64" alt="seller" width={28} height={28} className="rounded-full object-cover" />
                      <span className="font-medium">아티스트스토어</span>
                    </div>
                    <div className="mt-2 text-xl font-bold text-left">₩180,000</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">아티스트 굿즈</h3>
                  <p className="text-xs text-slate-600">한정판 프리미엄 세트</p>
                </div>
              </div>
              
              <div className="w-72 h-96 bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
                <div className="relative h-full">
                  <Image src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&h=800" alt="스니커즈" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-left">스니커즈</div>
                    <div className="mt-2 flex items-center gap-2 text-sm opacity-95">
                      <Image src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&crop=faces&w=64&h=64" alt="seller" width={28} height={28} className="rounded-full object-cover" />
                      <span className="font-medium">스니커헤드</span>
                    </div>
                    <div className="mt-2 text-xl font-bold text-left">₩450,000</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">한정판 스니커즈</h3>
                  <p className="text-xs text-slate-600">콜라보레이션 한정판</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creators Section - Full Width */}
      <section className="bg-slate-50 py-16">
        <div className="w-full">
          <div className="text-center mb-12 px-4">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-8">
              CREATORS HIRING WITH MEGAAUCTION
            </h3>
            
            {/* Avatar Group - Real People Images */}
            <div className="flex justify-center items-center mb-8">
              <div className="flex -space-x-2">
                <Image 
                  src="https://i.pravatar.cc/64?img=1" 
                  alt="Creator 1" 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <Image 
                  src="https://i.pravatar.cc/64?img=2" 
                  alt="Creator 2" 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <Image 
                  src="https://i.pravatar.cc/64?img=3" 
                  alt="Creator 3" 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <Image 
                  src="https://i.pravatar.cc/64?img=4" 
                  alt="Creator 4" 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <Image 
                  src="https://i.pravatar.cc/64?img=5" 
                  alt="Creator 5" 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                />
              </div>
            </div>
          </div>

          {/* Role Cards - Fixed Layout */}
          <div className="w-full py-4">
            <div className="flex items-center justify-center gap-4 px-4 overflow-x-auto">
              <Card className="p-10 text-center bg-white rounded-xl border-2 border-yellow-300 shadow-sm hover:shadow-md transition-shadow min-w-[220px]">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-8xl">🎨</span>
                </div>
                <h4 className="text-lg font-medium text-slate-900">디지털 아트</h4>
              </Card>
              
              <Card className="p-10 text-center bg-gray-100 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow min-w-[220px]">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-8xl">👟</span>
                </div>
                <h4 className="text-lg font-medium text-slate-900">스니커즈</h4>
              </Card>
              
              <Card className="p-10 text-center bg-white rounded-xl border-2 border-yellow-300 shadow-sm hover:shadow-md transition-shadow min-w-[220px]">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-8xl">💎</span>
                </div>
                <h4 className="text-lg font-medium text-slate-900">보석</h4>
              </Card>
              
              <Card className="p-10 text-center bg-gray-100 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow min-w-[220px]">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-8xl">👜</span>
                </div>
                <h4 className="text-lg font-medium text-slate-900">명품 가방</h4>
              </Card>
              
              <Card className="p-10 text-center bg-white rounded-xl border-2 border-yellow-300 shadow-sm hover:shadow-md transition-shadow min-w-[220px]">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-8xl">⌚</span>
                </div>
                <h4 className="text-lg font-medium text-slate-900">시계</h4>
              </Card>
              
              <Card className="p-10 text-center bg-gray-100 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow min-w-[220px]">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-8xl">👗</span>
                </div>
                <h4 className="text-lg font-medium text-slate-900">패션</h4>
              </Card>
              
              <Card className="p-10 text-center bg-white rounded-xl border-2 border-yellow-300 shadow-sm hover:shadow-md transition-shadow min-w-[220px]">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-8xl">🎮</span>
                </div>
                <h4 className="text-lg font-medium text-slate-900">게임</h4>
              </Card>
              
              <Card className="p-10 text-center bg-gray-100 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow min-w-[220px]">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-8xl">🏠</span>
                </div>
                <h4 className="text-lg font-medium text-slate-900">부동산</h4>
              </Card>
              
              <Card className="p-10 text-center bg-white rounded-xl border-2 border-yellow-300 shadow-sm hover:shadow-md transition-shadow min-w-[220px]">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-8xl">📱</span>
                </div>
                <h4 className="text-lg font-medium text-slate-900">전자제품</h4>
              </Card>
              
              <Card className="p-10 text-center bg-gray-100 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow min-w-[220px]">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-8xl">🎵</span>
                </div>
                <h4 className="text-lg font-medium text-slate-900">음악</h4>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            왜 MegaAuction인가?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            혁신적인 24시간 경매 시스템으로 특별한 상품을 만나보세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">24시간 경매</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                짧고 강렬한 24시간 경매로 흥미진진한 경쟁을 경험하세요. 
                시간이 지날수록 긴장감이 높아집니다.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">자동 수상</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                경매 종료와 동시에 자동으로 낙찰자가 결정됩니다. 
                공정하고 투명한 시스템으로 신뢰할 수 있습니다.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">크리에이터 마켓</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                다양한 크리에이터들의 독점 상품을 만나보세요. 
                일반적으로 구할 수 없는 특별한 아이템들입니다.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-slate-300">활성 사용자</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-slate-300">완료된 경매</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₩50M+</div>
              <div className="text-slate-300">총 거래액</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-slate-300">만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Floating Cards */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Floating Profile Cards */}
            {/* Top Left Card */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-white rounded-2xl shadow-lg p-2 transform rotate-3">
              <Image 
                src="https://i.pravatar.cc/120?img=6" 
                alt="아트 컬렉터" 
                width={120} 
                height={120} 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                🎨 아트 컬렉터
              </div>
            </div>

            {/* Top Right Card */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white rounded-2xl shadow-lg p-2 transform -rotate-3">
              <Image 
                src="https://i.pravatar.cc/120?img=7" 
                alt="럭셔리 바이어" 
                width={120} 
                height={120} 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                💎 럭셔리 바이어
              </div>
            </div>

            {/* Bottom Left Card */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-2xl shadow-lg p-2 transform -rotate-3">
              <Image 
                src="https://i.pravatar.cc/120?img=8" 
                alt="판매자" 
                width={120} 
                height={120} 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                🛍️ 판매자
              </div>
            </div>

            {/* Bottom Right Card */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white rounded-2xl shadow-lg p-2 transform rotate-3">
              <Image 
                src="https://i.pravatar.cc/120?img=9" 
                alt="입찰자" 
                width={120} 
                height={120} 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                💰 입찰자
              </div>
            </div>

            {/* Central Content */}
            <div className="relative z-20 pt-16 pb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                <span className="block">원하는 보물을</span>
                <span className="block text-6xl md:text-7xl">하루 만에 찾아보세요!</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                1000+ 크리에이터가 MegaAuction을 통해 특별한 상품을 판매하고 있습니다. 
                경매의 스릴을 경험해보세요.
              </p>
              <Link href="/login">
                <Button size="lg" className="text-lg px-8 py-6 bg-slate-900 hover:bg-slate-800">
                  경매 시작하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-6 gap-8">
            {/* Logo Section */}
            <div className="md:col-span-1">
              <div className="text-2xl font-bold mb-4">MegaAuction</div>
            </div>
            
            {/* Platform Section */}
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">PLATFORM</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>경매 참여</li>
                <li>판매자 등록</li>
                <li>크리에이터</li>
                <li>디지털 아트 경매</li>
                <li>스니커즈 경매</li>
                <li>명품 가방 경매</li>
                <li>시계 경매</li>
                <li>부동산 경매</li>
              </ul>
            </div>
            
            {/* Features Section */}
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">FEATURES</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>24시간 경매</li>
                <li>실시간 입찰</li>
                <li>자동 낙찰</li>
                <li>AI 추천</li>
                <li>경매 알림</li>
              </ul>
            </div>
            
            {/* Company Section */}
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">COMPANY</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>파트너 프로그램</li>
                <li>수수료 정책</li>
                <li>개인정보처리방침</li>
                <li>이용약관</li>
                <li>취소 정책</li>
              </ul>
            </div>
            
            {/* Resources Section */}
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">RESOURCES</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>FAQ</li>
                <li>블로그</li>
                <li>경매 가이드</li>
                <li>AI 상품 추천</li>
                <li>판매자 추천</li>
              </ul>
            </div>
            
            {/* Contact Section */}
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">CONTACT</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>고객지원</li>
                <li>문의하기</li>
                <li>기술지원</li>
                <li className="flex items-center gap-2 mt-4">
                  <span>X</span>
                  <span>Instagram</span>
                  <span>LinkedIn</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Border and Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="text-center text-sm text-gray-400">
              <p>&copy; 2024 MegaAuction. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
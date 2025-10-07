import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import { ArrowRight, Star, Users, Zap, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
            24시간 경매
            <span className="text-blue-600"> 마켓플레이스</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            크리에이터들의 특별한 상품을 24시간 경매로 만나보세요. 
            자동 수상 시스템으로 공정하고 투명한 거래를 경험하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              경매 참여하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              상품 둘러보기
            </Button>
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
      <section className="bg-slate-900 text-white py-20">
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            지금 시작하세요
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            MegaAuction에서 특별한 상품을 발견하고 경매에 참여해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              무료로 시작하기
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              더 알아보기
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">MegaAuction</div>
              <p className="text-slate-300">
                24시간 경매 마켓플레이스
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-slate-300">
                <li>경매 참여</li>
                <li>상품 등록</li>
                <li>리더보드</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">고객지원</h3>
              <ul className="space-y-2 text-slate-300">
                <li>도움말</li>
                <li>문의하기</li>
                <li>이용약관</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">연락처</h3>
              <ul className="space-y-2 text-slate-300">
                <li>support@megaauction.com</li>
                <li>02-1234-5678</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
            <p>&copy; 2024 MegaAuction. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, DollarSign, Users, Clock } from 'lucide-react'

export default function LotteryHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center max-w-4xl mx-auto">
          <div className="space-y-2 w-full">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Is it Your Lucky Block?
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Fair and transparent lottery games powered by blockchain technology.
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg" variant="default">
              Play Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-8 w-full max-w-3xl">
            <Card className="bg-background border-border">
              <CardContent className="flex flex-col items-center p-6">
                <DollarSign className="h-10 w-10 mb-2" />
                <h2 className="text-2xl font-bold">$1,000,000</h2>
                <p className="text-sm text-muted-foreground">Total Jackpot</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-border">
              <CardContent className="flex flex-col items-center p-6">
                <Users className="h-10 w-10 mb-2" />
                <h2 className="text-2xl font-bold">10,000+</h2>
                <p className="text-sm text-muted-foreground">Players</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-border">
              <CardContent className="flex flex-col items-center p-6">
                <Clock className="h-10 w-10 mb-2" />
                <h2 className="text-2xl font-bold">24h</h2>
                <p className="text-sm text-muted-foreground">Closing Time</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}


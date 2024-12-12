import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { ArrowRight, DollarSign, Users, Clock } from "lucide-react";

/**
 * LotteryHero Component
 *
 * A hero section component that serves as the main banner for the lottery application.
 * It displays the main value proposition, call-to-action buttons, and key statistics
 * about the lottery game.
 *
 * Features:
 * - Responsive design that adapts to different screen sizes
 * - Main heading with lottery tagline
 * - Two CTA buttons: "Play Now" and "Learn More"
 * - Three statistics cards showing jackpot amount, player count, and time remaining
 *
 * @component
 * @example
 * ```tsx
 * <LotteryHero />
 * ```
 */
export default function LotteryHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-24pnpm">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main content wrapper with centered alignment */}
        <div className="flex flex-col items-center space-y-4 text-center max-w-4xl mx-auto">
          {/* Hero text section */}
          <div className="space-y-2 w-full">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Is it Your Lucky Block?
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Fair and transparent lottery games powered by blockchain
              technology.
            </p>
          </div>

          {/* Call-to-action buttons */}
          <div className="space-x-4">
            <Button size="lg" variant="default">
              Play Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          {/* Statistics cards grid
           * Displays three cards showing:
           * 1. Total jackpot amount
           * 2. Number of active players
           * 3. Time remaining until lottery closes
           */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-8 w-full max-w-3xl">
            {/* Jackpot amount card */}
            <Card className="bg-background border-border">
              <CardContent className="flex flex-col items-center p-6">
                <DollarSign className="h-10 w-10 mb-2" />
                <h2 className="text-2xl font-bold">$1,000,000</h2>
                <p className="text-sm text-muted-foreground">Total Jackpot</p>
              </CardContent>
            </Card>

            {/* Player count card */}
            <Card className="bg-background border-border">
              <CardContent className="flex flex-col items-center p-6">
                <Users className="h-10 w-10 mb-2" />
                <h2 className="text-2xl font-bold">10,000+</h2>
                <p className="text-sm text-muted-foreground">Players</p>
              </CardContent>
            </Card>

            {/* Time remaining card */}
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
  );
}

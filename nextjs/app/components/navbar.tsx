import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { DollarSign, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { ConnectButton } from "@rainbow-me/rainbowkit";

/**
 * @component Navbar
 * @description The main navigation component that appears at the top of every page.
 * It provides navigation links and wallet connection functionality.
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Wallet connection integration via RainbowKit
 * - Sticky positioning with backdrop blur
 * - Dynamic navigation links
 * 
 * Layout:
 * - Desktop: Full horizontal navigation with visible links
 * - Mobile: Hamburger menu that opens a side sheet
 * 
 * @example
 * ```tsx
 * // Usage in layout
 * import Navbar from '@/app/components/Navbar';
 * 
 * export default function Layout() {
 *   return (
 *     <>
 *       <Navbar />
 *     </>
 *   );
 * }
 * ```
 * 
 * @returns {JSX.Element} The rendered Navbar component
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-[1600px] items-center justify-between px-8 md:px-16">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <DollarSign className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              LUCKY BLOCK
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/play"
            >
              Play Now
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/admin"
            >
              Admin
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link className="flex items-center" href="/">
              <DollarSign className="mr-2 h-4 w-4" />
              <span className="font-bold">LotteryDApp</span>
            </Link>
            <nav className="mt-6 flex flex-col space-y-4">
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/Play"
              >
                Play Now
              </Link>
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/winners"
              >
                Winners
              </Link>
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/Admin"
              >
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}

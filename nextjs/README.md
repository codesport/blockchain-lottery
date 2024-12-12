# 🎰 Blockchain Lottery DApp (FRONT-END)

A modern, decentralized lottery application built with Next.js 15, shadcn/ui, and Ethereum smart contracts.

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

## 🎯 Overview

This decentralized lottery application showcases modern web3 development practices, combining Next.js 15's server components, shadcn/ui's component library, and blockchain integration. Perfect for developers looking to understand full-stack web3 development.

## ✨ Features

- 🎟️ Decentralized lottery system
- 👛 Wallet integration
- 🌓 Dark/light mode
- 🎨 Modern UI with shadcn/ui
- 📱 Responsive design
- 🔒 Secure smart contract integration

## 📋 Prerequisites

- Node.js 18.x or later
- npm/yarn/pnpm
- MetaMask or another Web3 wallet
- Basic knowledge of React/Next.js
- Understanding of Ethereum and smart contracts

## 🚀 Getting Started

1. Clone the repository:   ```bash
   git clone https://github.com/yourusername/blockchain-lottery-dapp.git
   cd blockchain-lottery-dapp
   cd nextjs   ```

2. Install dependencies:   ```bash
   npm install   ```

3. Set up environment variables:   ```bash
   cp .env.example .env.local   ```
   Edit `.env.local`:   ```env
   NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_id
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_LOTTERY_ADDRESS=deployed_contract_address   ```

4. Start the development server:   ```bash
   npm run dev   ```
   Visit http://localhost:3000 to see your application.

## 📁 Project Structure

```
nextjs/
├── app/
│   ├── admin/
│   │   └── page.tsx                    # Admin dashboard
│   ├── components/
│   │   ├── ui/                         # shadcn/ui components
│   │   │   ├── alert.tsx              
│   │   │   ├── button.tsx             
│   │   │   ├── card.tsx               
│   │   │   ├── dropdown-menu.tsx      
│   │   │   ├── input.tsx              
│   │   │   ├── sheet.tsx              
│   │   │   └── tabs.tsx               
│   │   ├── Bet.tsx                    
│   │   ├── BetMany.tsx                
│   │   ├── BuyToken.tsx               
│   │   ├── Footer.tsx                 
│   │   ├── LotteryHero.tsx            
│   │   ├── LotteryPlayerDashboard.tsx 
│   │   ├── Navbar.tsx                 
│   │   ├── OwnerCloseLottery.tsx      
│   │   ├── OwnerDashboard.tsx         
│   │   ├── OwnerOpenBets.tsx          
│   │   ├── OwnerWithdraw.tsx          
│   │   ├── ThemeSwitcher.tsx          
│   │   └── WithdrawRewards.tsx        
│   ├── config/
│   │   └── wagmi.ts                    
└── lib/
    └── utils.ts
```

## 🛠 Tech Stack

### Core Technologies

#### Next.js 15
- React Server Components (RSC)
- Automatic code splitting
- Built-in API routes
- Enhanced SEO capabilities

#### shadcn/ui
- Accessible components
- Tailwind CSS integration
- Dark mode support
- Customizable themes

#### Ethereum Integration
- Smart contract interaction
- Wallet connection
- Transaction management
- Event listening

#### TypeScript
- Type safety
- Better IDE support
- Enhanced maintainability

## 👩‍💻 Development Guide

### Setting Up shadcn/ui

1. Initialize shadcn/ui:
   ```bash
   npx shadcn-ui@latest init
   ```

2. Configure tailwind.config.js:
   ```javascript
   module.exports = {
     darkMode: ["class"],
     content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
     theme: {
       container: {
         center: true,
         padding: "2rem",
         screens: {
           "2xl": "1400px",
         },
       },
       extend: {
         colors: {
           border: "hsl(var(--border))",
           input: "hsl(var(--input))",
           ring: "hsl(var(--ring))",
           background: "hsl(var(--background))",
           foreground: "hsl(var(--foreground))",
           primary: {
             DEFAULT: "hsl(var(--primary))",
             foreground: "hsl(var(--primary-foreground))",
           },
         },
       },
     },
   };
   ```

### Component Examples (Not actively used in the project)

#### Button with Loading State
```typescript
import { Button } from "@/components/ui/button";

export const BetButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <Button 
      variant="default" 
      disabled={isLoading}
      onClick={handleBet}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Placing Bet
        </>
      ) : (
        "Place Bet"
      )}
    </Button>
  );
};
```

#### Alert Dialog
```typescript
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export const WithdrawConfirmation = () => {
  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your funds will be transferred to your wallet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleWithdraw}>
            Withdraw
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
```

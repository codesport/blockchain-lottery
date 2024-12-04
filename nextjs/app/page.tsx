'use client'


import LotteryHero from '@/app/components/lottery-hero';
import Navbar from '@/app/components/navbar';
import  Footer  from '@/app/components/footer';


export default function Home() {
    return (

        <>
            <Navbar />
            <LotteryHero/>
            <Footer/>   
        </>

       
    );
}

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, DollarSign, ArrowRight, Home, Wrench, HeartPulse, CheckCircle2 } from 'lucide-react';

export function ProgressiveHierarchy() {
  return (
    <div className="w-full h-full overflow-y-auto bg-[#0A1118] text-slate-200 font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap');
        .font-serif { font-family: 'DM Serif Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-12 px-6 lg:px-12 text-center bg-[#05080c]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#05080c]/80 via-[#05080c]/70 to-[#0A1118] mix-blend-multiply z-10" />
          <img 
            src="/__mockup/images/hotel-hero.png" 
            alt="Hotel Exterior" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center mt-12">
          <Badge variant="outline" className="mb-6 border-[#0ea5a0]/40 text-[#0ea5a0] bg-[#0ea5a0]/10 px-4 py-1.5 rounded-full uppercase tracking-wider text-xs font-semibold backdrop-blur-sm">
            Newly Renovated · Extended Stay
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#F8F9FA] mb-6 leading-tight tracking-tight">
            Williston's Newest <br/>
            <span className="text-[#0ea5a0]">Full-Kitchen</span> Extended-Stay Hotel
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed">
            Microtel Inn & Suites by Wyndham — Full kitchens, free laundry, free breakfast. 
            Built for Bakken crews, travel nurses, and long-term business stays.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
            <Button className="bg-[#0ea5a0] hover:bg-[#0c8c88] text-white px-8 py-6 text-base rounded-sm shadow-[0_0_20px_rgba(14,165,160,0.3)] border-none transition-all">
              Reserve on Wyndham
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white px-8 py-6 text-base rounded-sm bg-black/20 backdrop-blur-md">
              View Property
            </Button>
          </div>

          {/* Booking Info Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6 w-full max-w-3xl">
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className="w-5 h-5 text-[#0ea5a0] mb-2 opacity-80" />
              <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Check-in</span>
              <span className="font-medium text-slate-200">3:00 PM</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-l border-slate-700/50">
              <Clock className="w-5 h-5 text-[#0ea5a0] mb-2 opacity-80" />
              <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Check-out</span>
              <span className="font-medium text-slate-200">11:00 AM</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-t md:border-t-0 md:border-l border-slate-700/50 pt-4 md:pt-0">
              <DollarSign className="w-5 h-5 text-[#0ea5a0] mb-2 opacity-80" />
              <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Rates From</span>
              <span className="font-medium text-slate-200">$87 / night</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-t md:border-t-0 md:border-l border-slate-700/50 pt-4 md:pt-0">
              <Star className="w-5 h-5 text-[#0ea5a0] mb-2 opacity-80 fill-[#0ea5a0]" />
              <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Rating</span>
              <span className="font-medium text-slate-200">4.0 ★</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STAT BAR */}
      <section className="bg-[#111822] border-y border-slate-800/80 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-x-12 gap-y-8 divide-x-0 lg:divide-x divide-slate-800">
          
          {/* THE BIG 39 */}
          <div className="flex items-center gap-4 lg:pr-8">
            <span className="text-7xl font-serif text-[#0ea5a0] leading-none">39</span>
            <div className="flex flex-col">
              <span className="text-lg font-medium text-slate-200">Kitchen</span>
              <span className="text-slate-400">Suites</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:px-8">
            <span className="text-4xl font-serif text-slate-300">Free</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-200">Hot</span>
              <span className="text-sm text-slate-400">Breakfast</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:px-8">
            <span className="text-4xl font-serif text-slate-300">Indoor</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-200">Heated</span>
              <span className="text-sm text-slate-400">Pool</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:px-8">
            <span className="text-4xl font-serif text-slate-300">16 mi</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-200">To</span>
              <span className="text-sm text-slate-400">Airport</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:pl-8">
            <span className="text-4xl font-serif text-slate-300">24/7</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-200">Front</span>
              <span className="text-sm text-slate-400">Desk</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images Left */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[#0ea5a0]/5 border border-[#0ea5a0]/20 rounded-lg transform -rotate-2"></div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <img 
                src="/__mockup/images/hotel-about-1.png" 
                alt="Suite living area" 
                className="rounded-sm object-cover w-full h-[400px] shadow-2xl"
              />
              <img 
                src="/__mockup/images/hotel-about-2.png" 
                alt="Dining area" 
                className="rounded-sm object-cover w-full h-[300px] mt-[100px] shadow-2xl"
              />
            </div>
          </div>

          {/* Copy Right */}
          <div>
            <span className="text-[#0ea5a0] font-medium tracking-widest uppercase text-sm mb-4 block">
              About the Property
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif text-[#F8F9FA] mb-6 leading-tight">
              Full-Kitchen Suites — <br/>
              <span className="text-slate-400">Newly Renovated</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Welcome to Microtel Inn & Suites by Wyndham Williston — your home base in the heart of the Bakken oilfield region. We've recently completed a major suite renovation: all 39 of our rooms are now full-kitchen Queen Suites, purpose-built for guests staying multiple nights, weeks, or months.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-slate-800/50 p-3 rounded-md text-[#0ea5a0]">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-1">Cook Like You're Home</h3>
                  <p className="text-slate-400 text-sm">Full-size fridge, stovetop, microwave, and dishwasher in every suite.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-slate-800/50 p-3 rounded-md text-[#0ea5a0]">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-1">Built for Bakken Workforce</h3>
                  <p className="text-slate-400 text-sm">Heavy-duty blackout shades, soundproofing, and plenty of workspace.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-slate-800/50 p-3 rounded-md text-[#0ea5a0]">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-1">Convenient for Travel Medical</h3>
                  <p className="text-slate-400 text-sm">Quiet atmosphere just minutes from major medical centers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KITCHENETTE SPOTLIGHT */}
      <section className="py-24 bg-[#0a1017] border-t border-slate-800 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0ea5a0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center mb-16 relative z-10">
          <span className="text-[#0ea5a0] font-medium tracking-widest uppercase text-sm mb-4 block">
            Extended-Stay Suite
          </span>
          <h2 className="text-4xl lg:text-6xl font-serif text-[#F8F9FA] mb-4">
            Queen Kitchenette Suite
          </h2>
          <p className="text-xl text-slate-400">
            Newly renovated · Full kitchen · Extended-stay ready
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 group relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118] via-transparent to-transparent opacity-80 z-10"></div>
            <img 
              src="/__mockup/images/hotel-kitchenette.png" 
              alt="Queen Kitchenette Suite" 
              className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5a0]" />
                  <span>Full-size refrigerator</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5a0]" />
                  <span>Two-burner stovetop</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5a0]" />
                  <span>Dishwasher & sink</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5a0]" />
                  <span>Cookware & utensils</span>
                </div>
              </div>
              
              <Button className="bg-white text-[#0A1118] hover:bg-slate-200 px-8 py-6 rounded-sm whitespace-nowrap">
                View Room Details <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="py-12 text-center text-slate-600 text-sm bg-[#05080c] border-t border-slate-800">
        <p>© {new Date().getFullYear()} Microtel Inn & Suites by Wyndham Williston. All rights reserved.</p>
      </footer>
    </div>
  );
}

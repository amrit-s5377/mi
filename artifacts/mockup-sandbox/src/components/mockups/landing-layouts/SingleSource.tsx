import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Wifi, Car, Utensils, Info, Check, Star, CheckCircle2 } from "lucide-react";

export function SingleSource() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2A26] font-sans selection:bg-[#D4AF37] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/__mockup/images/hotel-hero-dark.png"
            alt="Hotel Exterior at Twilight"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center mt-12">
          <Badge 
            variant="outline" 
            className="mb-6 border-white/30 text-white bg-black/20 backdrop-blur-sm px-4 py-1.5 text-xs font-medium tracking-widest uppercase"
          >
            Extended-Stay Hotel · Williston, ND
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 max-w-4xl leading-tight text-balance">
            Williston's Newest <span className="text-[#E5C158] italic">Full-Kitchen</span> Extended-Stay Hotel
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light text-balance leading-relaxed">
            Microtel Inn & Suites by Wyndham — Full kitchens, free laundry, free breakfast. 
            Built for Bakken crews, travel nurses, and long-term business stays.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="bg-[#D4AF37] hover:bg-[#C19B2E] text-white rounded-none px-8 h-14 text-base font-semibold tracking-wide transition-all">
              Reserve on Wyndham
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white rounded-none px-8 h-14 text-base font-semibold tracking-wide transition-all bg-transparent">
              View Property
            </Button>
          </div>
        </div>

        {/* Floating Booking Info Card */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-4xl px-4">
          <Card className="rounded-none border-none shadow-2xl bg-white/95 backdrop-blur-md">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-2 md:pt-0 w-full">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Check-in</span>
                <span className="text-xl font-serif text-gray-900">3:00 PM</span>
              </div>
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0 w-full pl-0 md:pl-8">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Check-out</span>
                <span className="text-xl font-serif text-gray-900">11:00 AM</span>
              </div>
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0 w-full pl-0 md:pl-8">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Rates</span>
                <span className="text-xl font-serif text-gray-900">From $87<span className="text-sm text-gray-500 font-sans">/night</span></span>
              </div>
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0 w-full pl-0 md:pl-8">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Guest Rating</span>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <span className="text-xl font-serif text-gray-900 mr-1">4.0</span>
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 2. STAT BAR */}
      <section className="bg-[#2D2A26] text-[#FDFBF7] pt-28 pb-16 md:pt-32 md:pb-20 border-b-8 border-[#D4AF37]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/10 text-center">
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-2xl md:text-3xl font-serif text-[#D4AF37] mb-2">Full</span>
              <span className="text-sm tracking-widest uppercase text-white/70">Kitchens</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-2xl md:text-3xl font-serif text-[#D4AF37] mb-2">Free</span>
              <span className="text-sm tracking-widest uppercase text-white/70">Hot Breakfast</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-2xl md:text-3xl font-serif text-[#D4AF37] mb-2">Indoor</span>
              <span className="text-sm tracking-widest uppercase text-white/70">Heated Pool</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-2xl md:text-3xl font-serif text-[#D4AF37] mb-2">16 mi</span>
              <span className="text-sm tracking-widest uppercase text-white/70">To Airport</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 col-span-2 md:col-span-1">
              <span className="text-2xl md:text-3xl font-serif text-[#D4AF37] mb-2">24/7</span>
              <span className="text-sm tracking-widest uppercase text-white/70">Front Desk</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="py-24 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Images */}
            <div className="relative group">
              <div className="aspect-[4/5] md:aspect-square overflow-hidden bg-gray-100 rounded-sm">
                <img 
                  src="/__mockup/images/hotel-about-kitchen.png" 
                  alt="Modern Kitchenette Interior"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Subtle 39 Badge Overlay */}
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-32 h-32 md:w-40 md:h-40 bg-[#D4AF37] rounded-full flex flex-col items-center justify-center text-[#2D2A26] p-4 shadow-xl border-4 border-[#FDFBF7]">
                <span className="text-4xl md:text-5xl font-serif italic leading-none">39</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 text-center">Suites</span>
              </div>
            </div>

            {/* Right: Copy */}
            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-4">About the Property</span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2D2A26] mb-8 leading-[1.1] text-balance">
                <span className="text-6xl md:text-7xl lg:text-8xl text-[#D4AF37] pr-2 block md:inline italic">39</span> 
                Newly Renovated Full-Kitchen Suites
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed mb-10">
                <p>
                  We've completely reimagined our property to serve the people who keep Williston running. Every one of our newly renovated suites is designed not just for a night, but for a lifestyle.
                </p>
                <p>
                  Located in the heart of the Bakken, just minutes from the medical center and major job sites, we provide a true home base. With full kitchens in every suite, you're not eating out every night—unless you want to.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 mt-1">
                    <Utensils className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#2D2A26]">Cook Like You're Home</h3>
                    <p className="text-gray-500 text-sm mt-1">Full-size fridge, two-burner stove, microwave, and all the cookware you need.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#2D2A26]">Built for Bakken Workforce</h3>
                    <p className="text-gray-500 text-sm mt-1">Free guest laundry, ample truck parking, and hearty hot breakfast starting early.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#2D2A26]">Convenient for Travel Medical</h3>
                    <p className="text-gray-500 text-sm mt-1">Quiet rooms, blackout shades, and just minutes from the regional medical center.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KITCHENETTE SPOTLIGHT */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-4 block">Our Signature Room</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2D2A26] mb-4">Queen Kitchenette Suite</h2>
            <p className="text-xl text-gray-500 font-light italic">Newly renovated · Full kitchen · Extended-stay ready</p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 relative">
              <div className="aspect-[16/9] overflow-hidden bg-gray-100 rounded-sm">
                <img 
                  src="/__mockup/images/hotel-room-queen.png" 
                  alt="Queen Kitchenette Suite"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[#2D2A26] rounded-none px-3 py-1 font-medium hover:bg-white">
                  Popular
                </Badge>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between h-full bg-[#FDFBF7] p-8 md:p-10 border border-[#D4AF37]/20">
              <div>
                <h3 className="text-2xl font-serif mb-6 pb-6 border-b border-gray-200">Suite Features</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#D4AF37]" />
                    <span>Plush Queen Bed</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#D4AF37]" />
                    <span>Full Kitchen Setup</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#D4AF37]" />
                    <span>Full-size Refrigerator</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#D4AF37]" />
                    <span>Two-Burner Cooktop</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#D4AF37]" />
                    <span>Microwave & Coffee Maker</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#D4AF37]" />
                    <span>Dedicated Work Desk</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#D4AF37]" />
                    <span>Flat-screen HDTV</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-gray-500 uppercase tracking-wider text-xs font-bold">Starting at</span>
                  <span className="text-3xl font-serif text-[#2D2A26]">$87<span className="text-sm text-gray-500 font-sans font-light">/night</span></span>
                </div>
                <Button className="w-full bg-[#2D2A26] hover:bg-[#1A1815] text-white rounded-none h-14 text-base tracking-wide">
                  Check Availability
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Coffee, Droplets, Plane, Clock, CalendarDays, MapPin } from 'lucide-react';

export function MilestoneStrip() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-900 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/__mockup/images/hotel-exterior.png"
            alt="Microtel Inn & Suites exterior"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 mt-24">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 text-white space-y-6">
              <Badge variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm tracking-wide uppercase font-medium">
                Extended-Stay Hotel
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-balance">
                Williston's Newest Full-Kitchen Extended-Stay Hotel
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 max-w-2xl font-light leading-relaxed">
                Premium comfort designed for the long haul. Experience residential-style living with hotel amenities in the heart of North Dakota.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white border-none rounded-none px-8 py-6 text-base font-semibold">
                  Book Your Stay
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-none px-8 py-6 text-base font-semibold">
                  View Suites
                </Button>
              </div>
            </div>

            {/* Quick Booking Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 text-white">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-teal-400" />
                  Plan Your Visit
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1 block">Location</label>
                    <div className="flex items-center gap-2 pb-2 border-b border-white/20">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">Williston, ND</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1 block">Rates</label>
                    <p className="font-medium">Nightly • Weekly • Monthly</p>
                  </div>
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-none mt-4 font-bold">
                    Check Availability
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MILESTONE STRIP - Bold Typographic Drama */}
      <section className="bg-[#0f172a] text-white py-24 md:py-32 relative overflow-hidden border-t-8 border-teal-600">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* The Big Number */}
            <div className="relative shrink-0">
              <span className="text-[120px] md:text-[200px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-2xl">
                39
              </span>
              <div className="absolute -left-8 -top-8 w-24 h-24 border-t-2 border-l-2 border-teal-500 opacity-50 hidden md:block"></div>
              <div className="absolute -right-8 -bottom-8 w-24 h-24 border-b-2 border-r-2 border-teal-500 opacity-50 hidden md:block"></div>
            </div>

            {/* The Statement */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
                Newly Renovated <br />
                <span className="text-teal-400 font-serif italic font-normal">Full-Kitchen</span> Suites
              </h2>
              
              <div className="h-px w-24 bg-teal-600/50 mx-auto lg:mx-0"></div>

              <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl">
                Every suite upgraded. Full kitchens, premium bedding, 65″ TVs. 
                Designed from the ground up for the ultimate extended stay experience. 
                <span className="block mt-4 text-white font-medium">Available nightly, weekly, and monthly.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STAT BAR */}
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-x divide-slate-100">
            <div className="flex flex-col items-center justify-center text-center px-4 space-y-2">
              <div className="text-slate-400 mb-1"><Coffee className="w-6 h-6" /></div>
              <div className="text-xl font-bold text-slate-900">Full</div>
              <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">Kitchen Suites</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4 space-y-2">
              <div className="text-slate-400 mb-1"><Check className="w-6 h-6" /></div>
              <div className="text-xl font-bold text-slate-900">Free</div>
              <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">Hot Breakfast</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4 space-y-2">
              <div className="text-slate-400 mb-1"><Droplets className="w-6 h-6" /></div>
              <div className="text-xl font-bold text-slate-900">Indoor</div>
              <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">Heated Pool</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4 space-y-2">
              <div className="text-slate-400 mb-1"><Plane className="w-6 h-6" /></div>
              <div className="text-xl font-bold text-slate-900">16 mi</div>
              <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">To Airport</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4 space-y-2">
              <div className="text-slate-400 mb-1"><Clock className="w-6 h-6" /></div>
              <div className="text-xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">Front Desk</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 text-balance">
                Full-Kitchen Suites — Built for Extended Stays
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  Whether you're in Williston for a quick business trip or a month-long project, 
                  our freshly renovated property offers everything you need to maintain your routine. 
                  Cook your own meals, relax in spacious living areas, and enjoy the convenience of 
                  hotel services.
                </p>
                <p>
                  Located just minutes from major corporate offices and downtown Williston, you're 
                  never far from where you need to be.
                </p>
              </div>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Fully equipped kitchens in every suite",
                  "Complimentary high-speed Wi-Fi",
                  "On-site guest laundry facilities",
                  "Pet-friendly accommodations"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-teal-100 text-teal-700 p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-lg text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-slate-200 translate-x-4 translate-y-4 rounded-none"></div>
              <img 
                src="/__mockup/images/kitchenette-suite.png" 
                alt="Modern Kitchenette Suite" 
                className="relative z-10 w-full h-auto object-cover grayscale-[20%] contrast-125"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. KITCHENETTE SPOTLIGHT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-teal-600"></div>
            <span className="text-teal-700 font-semibold tracking-widest uppercase text-sm">Extended-Stay Suite</span>
            <div className="h-px w-8 bg-teal-600"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8">
            Queen Kitchenette Suite
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-12">
            The perfect balance of form and function. Featuring a plush queen bed, a dedicated workspace, 
            and a complete kitchen setup including a full-size refrigerator, microwave, stovetop, and dishwasher.
          </p>
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-none px-12 py-6 text-lg font-semibold">
            View Suite Details
          </Button>
        </div>
      </section>
    </div>
  );
}


import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Venue, SportType } from '../types';
import { DANCING_SUNLIGHT_VENUES, SPORT_LABELS } from '../constants';

interface VenueSelectionPageProps {
  currentVenue: Venue;
  onSelect: (venue: Venue) => void;
}

const VenueSelectionPage: React.FC<VenueSelectionPageProps> = ({ currentVenue, onSelect }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      setIsScrolled(target.scrollTop > 50);
    };
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="flex flex-col h-full bg-[#f8fafc] font-['Noto_Sans_TC'] overflow-y-auto scrollbar-hide">
      <header className={`bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'p-3 rounded-b-[20px]' : 'p-4 rounded-b-[30px]'
      }`}>
        
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center active:scale-90 transition-all"
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>
          <h1 className="text-[20px] font-bold">選擇場館</h1>
        </div>

        <div className="relative w-full">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-sm"></i>
          <input 
            type="text" 
            placeholder="搜尋場館名稱、地址..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white/15 rounded-xl text-white placeholder-white/60 text-[14px] outline-none focus:bg-white/25 transition-all border-none shadow-inner"
          />
        </div>
      </header>

      <div className="flex-1 p-5 pb-32">
        <div className="space-y-4">
          {DANCING_SUNLIGHT_VENUES.map((venue) => (
            <div 
              key={venue.id}
              onClick={() => onSelect(venue)}
              className={`bg-white rounded-[2rem] shadow-sm border overflow-hidden cursor-pointer transition-all active:scale-[0.98] group ${
                currentVenue.id === venue.id ? 'border-[#f97316] ring-1 ring-[#f97316]' : 'border-gray-100'
              }`}
            >
              <div className="h-32 relative">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#ea580c]">
                  {venue.district}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[18px] font-black text-gray-900 leading-tight">{venue.name}</h4>
                  {currentVenue.id === venue.id && (
                    <span className="text-[#ea580c] text-sm font-bold">
                      <i className="fas fa-check-circle"></i> 當前
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-gray-400 font-bold mb-3 flex items-center gap-1">
                  <i className="fas fa-map-marker-alt text-[10px]"></i> {venue.address}
                </p>
                <div className="flex flex-wrap gap-2">
                  {venue.facilities.map(f => (
                    <span key={f} className="bg-gray-50 text-gray-500 text-[10px] px-2 py-0.5 rounded-md font-bold">
                      {SPORT_LABELS[f]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueSelectionPage;


import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RentalVenue, Venue, SportType } from '../types';
import { SPORT_ICONS, SPORT_LABELS } from '../constants';
import { X, MapPin, Info, Calendar, ChevronLeft } from 'lucide-react';

interface VenueRentalPageProps {
  currentVenue: Venue;
}

const VenueRentalPage: React.FC<VenueRentalPageProps> = ({ currentVenue }) => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState<SportType>('all');
  const [selectedVenue, setSelectedVenue] = useState<RentalVenue | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getVenueGradient = (type: string) => {
    switch (type) {
      case 'badminton': return 'from-[#f97316] to-[#ea580c]';
      case 'basketball': return 'from-[#ea580c] to-[#c2410c]';
      case 'fitness': return 'from-[#fb923c] to-[#f97316]';
      case 'swimming': return 'from-[#fdba74] to-[#fb923c]';
      default: return 'from-[#f59e0b] to-[#d97706]';
    }
  };

  // Generate rental items based on current venue's facilities
  const venueFacilities: RentalVenue[] = currentVenue.facilities.map((type, index) => ({
    id: index + 1,
    name: `${currentVenue.name} - ${SPORT_LABELS[type]}`,
    type: type,
    area: 'taipei',
    district: currentVenue.district,
    location: currentVenue.address,
    rating: 4.8,
    verified: true,
    popular: index === 0,
    pricePerHour: type === 'fitness' ? 100 : 500,
    courts: type === 'fitness' ? 1 : 6,
    description: `舞動陽光專業${SPORT_LABELS[type]}場地，設備新穎，環境舒適。提供最優質的運動體驗。`,
    facilities: ['冷氣', '淋浴間', '飲水機', 'WiFi'],
    openHours: '06:00-22:00',
    phone: currentVenue.phone,
    images: [SPORT_ICONS[type]]
  }));

  const filteredFacilities = selectedSport === 'all' 
    ? venueFacilities 
    : venueFacilities.filter(f => f.type === selectedSport);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      setIsScrolled(scrollTop > 40);
    }
  };

  const VenueCard: React.FC<{ venue: RentalVenue }> = ({ venue }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-gray-100 transition-all active:scale-[0.97] duration-200">
      <div className={`h-32 relative overflow-hidden bg-gradient-to-br ${getVenueGradient(venue.type)} flex items-center justify-center`}>
        <span className="text-white font-black text-lg text-center px-6 drop-shadow-md z-10 leading-tight">
          {venue.name}
        </span>
        <div className="absolute bottom-2 right-2 flex gap-1 opacity-80">
          <span className="text-2xl drop-shadow-lg">{SPORT_ICONS[venue.type]}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-black text-gray-800 text-base mb-1 truncate">{SPORT_LABELS[venue.type]}場地</h3>
            <div className="flex items-center text-gray-400 text-[11px] font-bold">
              <MapPin size={12} className="mr-1 opacity-60" />
              {venue.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-[#f97316] tracking-tighter">NT$ {venue.pricePerHour}</div>
            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none">/ {venue.type === 'fitness' ? '次' : '小時'}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {venue.facilities.map(f => (
            <span key={f} className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full text-[10px] font-black">{f}</span>
          ))}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedVenue(venue)}
            className="flex-1 bg-white border-2 border-[#f97316] text-[#f97316] font-black py-2.5 rounded-xl transition-all active:scale-95 text-center text-xs"
          >
            查看詳情
          </button>
          <button 
            onClick={() => navigate('/reserve-venue')}
            className="flex-1 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-black py-2.5 rounded-xl transition-all active:scale-95 text-center text-xs shadow-md shadow-orange-100"
          >
            立即預約
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden font-['Noto_Sans_TC']">
      <header 
        className={`bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white z-50 shadow-lg sticky top-0 transition-all duration-300 ${
          isScrolled ? 'p-3 rounded-b-[20px]' : 'p-4 rounded-b-[30px]'
        }`}
      >
        <div className={`flex justify-between items-center transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-20 opacity-100 mb-4'
        }`}>
          <div className="flex items-center gap-2 cursor-pointer active:opacity-70 transition-all" onClick={() => navigate('/select-venue')}>
            <ChevronLeft size={20} className="text-white/80" />
            <div className="flex flex-col">
              <h1 className="text-[18px] font-bold leading-tight">舞動陽光</h1>
              <p className="text-[13px] opacity-80">{currentVenue.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center active:scale-95 transition-all">
              <i className="fas fa-bell text-[18px]"></i>
            </button>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-[14px] font-bold cursor-pointer" onClick={() => navigate('/profile')}>
              李
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
          {['all', ...currentVenue.facilities].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedSport(f as SportType)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-black transition-all whitespace-nowrap border ${
                selectedSport === f 
                  ? 'bg-white text-[#ea580c] border-white shadow-md' 
                  : 'bg-white/10 text-white border-white/20'
              }`}
            >
              {SPORT_LABELS[f as SportType] || '全部'}
            </button>
          ))}
        </div>
      </header>

      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-5 pb-32 scrollbar-hide space-y-6"
      >
        <div className="grid grid-cols-1 gap-5">
          {filteredFacilities.length > 0 ? (
            filteredFacilities.map(v => <VenueCard key={v.id} venue={v} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Info size={48} className="mb-4 opacity-20" />
              <p className="font-bold">目前暫無此類場地</p>
            </div>
          )}
        </div>
      </div>

      {selectedVenue && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedVenue(null)} />
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-slide-up flex flex-col max-h-[90vh]">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-20">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">{selectedVenue.name}</h3>
              <button onClick={() => setSelectedVenue(null)} className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 active:scale-90">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              <div className={`h-56 rounded-3xl flex items-center justify-center shadow-inner relative bg-gradient-to-br ${getVenueGradient(selectedVenue.type)}`}>
                <span className="text-7xl drop-shadow-2xl">{SPORT_ICONS[selectedVenue.type]}</span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">{selectedVenue.name}</h2>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                  <MapPin size={14} className="text-[#f97316]" />
                  {selectedVenue.location}
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2rem] p-6 space-y-4 border border-slate-100">
                <h4 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Info size={18} className="text-[#f97316]" />
                  場地資訊
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-bold text-sm">租借費用</span>
                    <span className="text-[#f97316] font-black text-base">NT$ {selectedVenue.pricePerHour}/{selectedVenue.type === 'fitness' ? '次' : '小時'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-bold text-sm">場地數量</span>
                    <span className="text-gray-900 font-black text-base">{selectedVenue.courts} 個場地</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-bold text-sm">營業時間</span>
                    <span className="text-gray-900 font-black text-base">{selectedVenue.openHours}</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
                <p className="text-orange-800 text-sm font-medium leading-relaxed">
                  {selectedVenue.description}
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-gray-100 space-y-3">
              <button 
                onClick={() => navigate('/reserve-venue')}
                className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-black py-4 rounded-2xl text-lg shadow-xl shadow-orange-100 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                立即預約
              </button>
              <button 
                onClick={() => {
                  // Mock long-term rental application
                  alert('已送出長租申請，專員將於 1-3 個工作天內與您聯繫。');
                  setSelectedVenue(null);
                }}
                className="w-full bg-white border-2 border-[#f97316] text-[#f97316] font-black py-4 rounded-2xl text-lg transition-all active:scale-95"
              >
                長租申請
              </button>
              <button 
                onClick={() => setSelectedVenue(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-black py-4 rounded-2xl text-lg transition-all active:scale-95"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueRentalPage;

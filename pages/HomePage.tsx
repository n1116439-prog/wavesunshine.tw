
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Venue } from '../types';
import { MOCK_COURSES, NOTIFICATIONS } from '../constants';
import { 
  MapPin, 
  Search, 
  Bell, 
  ChevronRight, 
  Calendar, 
  Users, 
  Clock,
  Trophy, 
  Star,
  ChevronDown
} from 'lucide-react';

interface HomePageProps {
  currentVenue: Venue;
}

const HomePage: React.FC<HomePageProps> = ({ currentVenue }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉通知中心
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 監聽滾動事件來切換標頭狀態
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
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const quickActions = [
    { label: '場地預約', icon: 'fa-calendar-check', gradient: 'from-[#fff7ed] to-[#ffedd5]', iconColor: 'text-[#f97316]', path: '/venues' },
    { label: '臨打活動', icon: 'fa-running', gradient: 'from-[#f0fdf4] to-[#dcfce7]', iconColor: 'text-[#16a34a]', path: '/pickup-activities' },
    { label: '運動課程', icon: 'fa-graduation-cap', gradient: 'from-[#eff6ff] to-[#dbeafe]', iconColor: 'text-[#2563eb]', path: '/courses' },
    { label: '我的預約', icon: 'fa-clipboard-list', gradient: 'from-[#faf5ff] to-[#f3e8ff]', iconColor: 'text-[#9333ea]', path: '/my' },
  ];

  const upcomingSchedules = [
    { 
      time: "14:00", 
      date: "今天", 
      title: "羽球課程", 
      attendee: "小寶", 
      isChild: true,
      loc: currentVenue.name, 
      status: "confirmed", 
      label: "已確認" 
    },
    { 
      time: "10:30", 
      date: "明天", 
      title: "籃球課程", 
      attendee: "王小明", 
      isChild: false,
      loc: currentVenue.name, 
      status: "pending", 
      label: "待確認" 
    },
  ];

  const popularCourses = MOCK_COURSES.slice(0, 2);

  return (
    <div ref={scrollContainerRef} className="flex flex-col h-full bg-white font-['Noto_Sans_TC'] overflow-y-auto scrollbar-hide">
      {/* Sticky Header with dynamic scaling */}
      <header className={`bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'p-3 rounded-b-[20px]' : 'p-4 rounded-b-[30px]'
      }`}>
        {/* Top Section - Location & Profile (Hides on scroll) */}
        <div className={`flex justify-between items-center transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-20 opacity-100 mb-4'
        }`}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/select-venue')}>
            <i className="fas fa-map-marker-alt text-white/80"></i>
            <div className="flex flex-col">
              <h1 className="text-[18px] font-bold leading-tight">舞動陽光</h1>
              <p className="text-[13px] opacity-80">{currentVenue.name}</p>
            </div>
            <i className="fas fa-chevron-down text-[10px] opacity-80 ml-1"></i>
          </div>
          
          <div className="flex items-center gap-2 relative">
            <button 
              className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center active:scale-95 transition-all" 
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="fas fa-bell text-[18px]"></i>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#ef4444] rounded-full flex items-center justify-center text-[10px] font-bold border border-[#ea580c]">4</span>
            </button>

            {/* 通知中心小視窗 */}
            {showNotifications && (
              <div 
                ref={notificationRef}
                className="absolute top-12 right-0 w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in zoom-in duration-200 origin-top-right"
              >
                <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-sm font-black text-gray-900">通知中心</h3>
                  <button 
                    onClick={() => navigate('/notifications')}
                    className="text-[11px] font-bold text-[#f97316] hover:underline"
                  >
                    查看全部
                  </button>
                </div>
                <div className="max-h-[320px] overflow-y-auto scrollbar-hide">
                  {NOTIFICATIONS.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                      {NOTIFICATIONS.map((n) => (
                        <div key={n.id} className="p-3 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 items-start">
                          <div className={`w-8 h-8 ${n.colorClass} rounded-full flex items-center justify-center shrink-0 shadow-sm`}>
                            <i className={`fas ${n.icon} text-white text-[10px]`}></i>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex justify-between items-start mb-0.5">
                              <p className="text-[12px] font-black text-gray-900 truncate">{n.title}</p>
                              <span className="text-[9px] text-gray-400 font-bold shrink-0 ml-2">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-gray-500 font-medium line-clamp-2 leading-relaxed">{n.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <i className="fas fa-bell-slash text-gray-200 text-3xl mb-2"></i>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">目前沒有通知</p>
                    </div>
                  )}
                </div>
                <div className="p-2 bg-gray-50 text-center border-t border-gray-100">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] font-bold text-gray-400 py-1 w-full"
                  >
                    關閉
                  </button>
                </div>
              </div>
            )}

            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-[14px] font-bold cursor-pointer" onClick={() => navigate('/profile')}>
              李
            </div>
          </div>
        </div>

        {/* Search Bar - Always Visible */}
        <div className="relative w-full">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-sm"></i>
          <input 
            type="text" 
            placeholder="搜尋課程、場地、教練..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white/15 rounded-xl text-white placeholder-white/60 text-[14px] outline-none focus:bg-white/25 transition-all border-none shadow-inner"
          />
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-8 pb-32">
        {/* Quick Actions */}
        <section>
          <div className="flex justify-around items-center gap-4 px-2">
            {quickActions.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-all group" onClick={() => navigate(item.path)}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${item.gradient} shadow-md group-hover:-translate-y-1 transition-all`}>
                  <i className={`fas ${item.icon} text-2xl ${item.iconColor}`}></i>
                </div>
                <span className="text-[13px] font-bold text-gray-800 text-center leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Banner */}
        <section className="bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg mx-1">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">新用戶專享優惠</h3>
            <p className="text-[14px] opacity-90 mb-4">首次預約課程享 8 折優惠，立即開始你的運動之旅！</p>
            <button className="bg-white/20 border border-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold active:scale-95 transition-all">
              立即體驗
            </button>
          </div>
          <div className="absolute -top-12 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </section>

        {/* Upcoming Schedules */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-bold text-gray-900">即將到來的行程</h2>
            <button className="text-[#f97316] text-sm font-medium" onClick={() => navigate('/my')}>查看全部</button>
          </div>
          <div className="space-y-4">
            {upcomingSchedules.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[25px] p-5 flex items-center gap-4 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-50 active:scale-[0.98] transition-all">
                <div className="text-center min-w-[70px] border-r border-gray-100 pr-2">
                  <p className="text-[20px] font-black text-[#f97316] leading-none">{item.time}</p>
                  <p className="text-[12px] text-gray-400 mt-1.5 font-bold">{item.date}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-[17px] font-black text-gray-800 truncate">{item.title}</h3>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                      item.isChild ? 'bg-orange-50 text-orange-500 border border-orange-100' : 'bg-orange-50 text-[#f97316] border border-orange-100'
                    }`}>
                      {item.attendee}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-400 font-bold flex items-center gap-1.5 mt-1">
                    <i className="fas fa-map-marker-alt text-[11px] text-gray-300"></i> {item.loc}
                  </p>
                </div>
                <div className={`status-badge ${item.status} px-4 py-2 rounded-2xl text-[11px] font-black text-white shadow-lg shrink-0`}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Courses */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">熱門課程</h2>
            <button className="text-[#f97316] text-sm font-medium" onClick={() => navigate('/courses')}>查看全部</button>
          </div>
          <div className="space-y-4">
            {popularCourses.map((course, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer active:scale-[0.98] transition-all group flex h-32" 
                onClick={() => navigate(`/class/${course.id}`)}
              >
                <div className="relative w-32 h-32 shrink-0 overflow-hidden">
                   <img src={course.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-2 left-2">
                      <span className="bg-white/90 backdrop-blur-md text-purple-700 text-[8px] px-2 py-0.5 rounded-full font-black shadow-sm border border-purple-100">
                        {course.area}
                      </span>
                   </div>
                </div>
                
                <div className="p-3 flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-black text-[14px] text-gray-900 leading-tight group-hover:text-[#f97316] transition-colors truncate pr-1">
                        {course.title}
                      </h3>
                      <div className="flex items-center text-yellow-400 text-[10px] font-bold shrink-0">
                        <Star size={10} fill="currentColor" className="mr-0.5" />
                        <span className="text-gray-600">{course.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold">
                        <Clock size={10} className="text-[#f97316] shrink-0" />
                        <span className="truncate">{course.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                        <MapPin size={10} className="text-gray-300 shrink-0" />
                        <span className="truncate">{course.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold">
                      <Users size={10} className="text-[#f97316] shrink-0" />
                      <span>{course.capacity}</span>
                    </div>
                    <span className="text-[18px] font-black text-[#f97316] tracking-tighter leading-none">{course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Venues */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-bold text-gray-900">熱門場地</h2>
            <button className="text-[#f97316] text-sm font-medium" onClick={() => navigate('/venues')}>查看全部</button>
          </div>
          <div className="carousel flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {[
              { title: '台北運動中心籃球場', area: '信義區', addr: '台北市信義區松壽路20號', price: '$800', rating: '4.9', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop' },
              { title: '新北羽球館', area: '板橋區', addr: '新北市板橋區文化路一段188號', price: '$600', rating: '4.6', img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop' },
            ].map((venue, i) => (
              <div key={i} className="flex-none w-[280px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer" onClick={() => navigate('/venues')}>
                <img src={venue.img} alt="" className="w-full h-32 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-[14px] text-gray-800 leading-tight">{venue.title}</h3>
                    <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{venue.area}</span>
                  </div>
                  <div className="space-y-1 mb-3 text-[12px] text-gray-500 font-medium">
                    <div className="flex items-start gap-2"><i className="fas fa-map-marker-alt w-3 mt-1"></i> <span className="flex-1">{venue.addr}</span></div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <div className="flex items-center text-yellow-400 text-[12px]">
                      <i className="fas fa-star"></i>
                      <span className="text-gray-500 font-bold ml-1">({venue.rating})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#f97316]">{venue.price}</span>
                      <p className="text-[10px] text-gray-400 font-bold leading-none">每小時</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

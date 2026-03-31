
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
import { Course, Venue } from '../types';
import { MapPin, Bell, Search, ChevronDown, Clock, Users, Star } from 'lucide-react';

interface CoursesPageProps {
  currentVenue: Venue;
  showToast: (msg: string) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ currentVenue }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('全部');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const filters = ['全部', '籃球', '羽球', '網球'];

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setIsScrolled(scrollContainerRef.current.scrollTop > 50);
      }
    };
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const CourseCard: React.FC<{ course: Course; onClick: () => void }> = ({ course, onClick }) => (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer active:scale-[0.98] transition-all group flex h-32" 
      onClick={onClick}
    >
      <div className="relative w-32 h-32 shrink-0 overflow-hidden">
        <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
  );

  return (
    <div ref={scrollContainerRef} className="flex flex-col h-full bg-gray-50 overflow-y-auto scrollbar-hide pb-24 font-['Noto_Sans_TC']">
      <header className={`bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'p-3 rounded-b-[20px]' : 'p-4 rounded-b-[30px]'
      }`}>
        {/* Top Section - Location & Profile (Hides on scroll) */}
        <div className={`flex justify-between items-center transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-20 opacity-100 mb-4'
        }`}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/select-venue')}>
            <MapPin size={18} className="text-white/80" />
            <div className="flex flex-col">
              <h1 className="text-[18px] font-bold leading-tight">舞動陽光</h1>
              <p className="text-[13px] opacity-80">{currentVenue.name}</p>
            </div>
            <ChevronDown size={14} className="opacity-80 ml-1" />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center active:scale-95 transition-all" onClick={() => navigate('/notifications')}>
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border border-white">5</span>
            </button>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-[14px] font-bold cursor-pointer" onClick={() => navigate('/profile')}>
              李
            </div>
          </div>
        </div>

        {/* Search Bar - Always Visible */}
        <div className="relative w-full">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input 
            type="text" 
            placeholder="搜尋課程、教練..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white/15 rounded-xl text-white placeholder-white/60 text-[14px] outline-none focus:bg-white/25 transition-all border-none shadow-inner"
          />
        </div>
      </header>

      <div className={`px-5 py-4 sticky z-40 bg-gray-50/95 backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'top-[64px]' : 'top-[128px]'}`}>
        <div className="flex overflow-x-auto space-x-3 pb-1 hide-scrollbar">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`flex-shrink-0 px-5 py-1.5 rounded-full text-[12px] font-black transition-all border ${selectedFilter === f ? 'bg-[#f97316] text-white border-[#f97316]' : 'bg-white text-gray-400 border-gray-100'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-1 space-y-6 flex-1">
        {MOCK_COURSES
          .filter(c => selectedFilter === '全部' || c.category.includes(selectedFilter))
          .map(course => (
            <CourseCard key={course.id} course={course} onClick={() => navigate(`/class/${course.id}`)} />
          ))}
      </div>
    </div>
  );
};

export default CoursesPage;

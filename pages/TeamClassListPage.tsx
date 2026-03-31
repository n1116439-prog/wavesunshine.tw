
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_LOCATIONS, MOCK_CLASSES } from '../constants';
import { CourseLocation, CourseClass } from '../types';

const TeamClassListPage: React.FC = () => {
  const navigate = useNavigate();
  const { locId } = useParams<{ locId: string }>();
  const [activeFilter, setActiveFilter] = useState('全部');
  const filters = ['全部', '初級', '中級', '高級'];

  const location = MOCK_LOCATIONS.find((l: CourseLocation) => l.id === locId);
  const classesAtLocation = MOCK_CLASSES.filter((c: CourseClass) => c.locationId === locId);
  const filteredClasses = classesAtLocation.filter((c: CourseClass) => 
    activeFilter === '全部' || c.level === activeFilter
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-10 font-['Noto_Sans_TC']">
      <header className="bg-gradient-to-br from-[#f97316] to-[#ea580c] px-5 py-6 text-white rounded-b-[35px] sticky top-0 z-[100] shadow-md">
        <div className="flex items-center space-x-4 mb-1">
          <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center active:bg-white/10 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-[20px] font-black tracking-tight leading-tight">{location?.name}</h1>
            <p className="text-orange-100 text-[11px] font-bold opacity-80 mt-0.5">目前有 {classesAtLocation.length} 個課堂開放中</p>
          </div>
        </div>
      </header>

      <div className="px-5 py-8">
        {/* Filters */}
        <div className="flex space-x-3 mb-8 overflow-x-auto scrollbar-hide pb-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-7 py-2.5 rounded-full text-[13px] font-black transition-all border whitespace-nowrap ${
                activeFilter === f 
                  ? 'bg-[#f97316] text-white border-[#f97316] shadow-md' 
                  : 'bg-white text-gray-400 border-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Class Cards */}
        <div className="space-y-6">
          {filteredClasses.map(c => (
            <div 
              key={c.id}
              onClick={() => navigate(`/class/${c.id}`)}
              className="bg-white rounded-[32px] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-transparent hover:border-orange-100 transition-all cursor-pointer active:scale-[0.98] group"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex-1 mr-4">
                  <h3 className="font-bold text-gray-900 text-[19px] leading-tight mb-2 group-hover:text-[#f97316] transition-colors">{c.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-orange-50 text-[#f97316] px-2.5 py-0.5 rounded-lg text-[11px] font-bold">
                      {c.level}
                    </span>
                    <span className="text-gray-400 text-[11px] font-medium">
                      {c.ageGroup}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap ${
                  c.status.includes('滿班') ? 'bg-red-50 text-red-500' : 
                  c.status.includes('進行中') ? 'bg-orange-50 text-orange-500' : 
                  'bg-green-50 text-green-500'
                }`}>
                  {c.status}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-[14px] text-gray-500 font-medium">
                  <svg className="w-4 h-4 mr-3 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  教練：{c.coachName}
                </div>
                <div className="flex items-center text-[14px] text-gray-500 font-medium">
                  <svg className="w-4 h-4 mr-3 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {c.time}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="w-2/3">
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-2">
                    <span>容納率: {Math.round((c.currentEnroll/c.maxCapacity)*100)}%</span>
                    <span>{c.currentEnroll}/{c.maxCapacity}人</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 rounded-full ${
                        (c.currentEnroll/c.maxCapacity) >= 1 ? 'bg-red-500' : 
                        (c.currentEnroll/c.maxCapacity) > 0.8 ? 'bg-orange-500' : 'bg-[#f97316]'
                      }`}
                      style={{ width: `${(c.currentEnroll/c.maxCapacity)*100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[22px] font-bold text-gray-900 leading-none">${c.price}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-1 uppercase tracking-wider">課程費用</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamClassListPage;


import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_CLASSES, MOCK_LOCATIONS } from '../constants';
import { CourseLocation, CourseClass } from '../types';

const CourseBookingDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const courseClass = MOCK_CLASSES.find((c: CourseClass) => c.id === classId);

  if (!courseClass) {
    return <div className="p-10 text-center font-bold">找不到課程資訊</div>;
  }

  const location = MOCK_LOCATIONS.find((l: CourseLocation) => l.id === courseClass.locationId);
  const isFull = courseClass.currentEnroll >= courseClass.maxCapacity;

  return (
    <div className="flex flex-col h-full bg-white pb-32 font-['Noto_Sans_TC']">
      <div className="relative h-64 bg-gray-100 shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          className="w-full h-full object-cover" 
          alt="Course"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/15"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-11 h-11 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white active:bg-white/40 transition-all shadow-sm z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="px-6 -mt-8 relative z-10 space-y-8 flex-1 overflow-y-auto scrollbar-hide pb-10">
        <div className="bg-white rounded-[32px] p-7 shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-gray-50">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-orange-50 text-[#f97316] px-3 py-1 rounded-xl text-[11px] font-bold">
              {courseClass.level}
            </span>
            <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">
              {courseClass.ageGroup}
            </span>
          </div>
          <h2 className="text-[24px] font-bold text-gray-900 leading-tight mb-3">{courseClass.name}</h2>
          <p className="text-gray-500 font-medium text-[14px] leading-relaxed">{courseClass.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-[24px] p-5 space-y-1.5">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">上課地點</p>
            <p className="text-gray-900 font-bold text-[15px] leading-tight truncate">{location?.name}</p>
          </div>
          <div className="bg-gray-50 rounded-[24px] p-5 space-y-1.5">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">主授教練</p>
            <p className="text-gray-900 font-bold text-[15px] leading-tight">{courseClass.coachName}</p>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-5 bg-[#f97316] rounded-full"></div>
            <h3 className="text-[18px] font-bold text-gray-900">開課資訊</h3>
          </div>
          <div className="bg-gray-50 rounded-[28px] p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="text-gray-400 font-bold text-[13px]">每週時段</span>
              <span className="text-gray-900 font-bold text-[14px]">{courseClass.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold text-[13px]">開課日期</span>
              <span className="text-gray-900 font-bold text-[14px]">{courseClass.startDate}</span>
            </div>
          </div>
        </section>

        <section className="space-y-4 pb-10">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-5 bg-orange-500 rounded-full"></div>
            <h3 className="text-[18px] font-bold text-gray-900">報名狀態</h3>
          </div>
          <div className="px-1">
            <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-2.5 uppercase tracking-wide">
              <span>容納率: {Math.round((courseClass.currentEnroll/courseClass.maxCapacity)*100)}%</span>
              <span>{isFull ? '已額滿' : `剩餘 ${courseClass.maxCapacity - courseClass.currentEnroll} 位`}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${isFull ? 'bg-red-500' : 'bg-[#f97316]'}`}
                style={{ width: `${(courseClass.currentEnroll/courseClass.maxCapacity)*100}%` }}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white border-t border-gray-50 flex gap-5 z-[110] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[35px]">
        <div className="flex flex-col justify-center">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">課程總額</span>
          <span className="text-gray-900 font-bold text-[22px] leading-none">NT$ {courseClass.price}</span>
        </div>
        <button 
          onClick={() => navigate(isFull ? `/class/${courseClass.id}/waiting-list` : `/class/${courseClass.id}/enroll`)}
          className={`flex-1 py-4.5 rounded-[22px] font-bold text-[16px] shadow-lg active:scale-95 transition-all ${
            isFull ? 'bg-gray-900 text-white shadow-gray-200' : 'bg-[#f97316] text-white shadow-orange-100'
          }`}
        >
          {isFull ? '申請候補' : '立即報名'}
        </button>
      </div>
    </div>
  );
};

export default CourseBookingDetailPage;

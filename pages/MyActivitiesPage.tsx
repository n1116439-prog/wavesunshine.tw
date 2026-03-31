
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TabType = 'courses' | 'venues' | 'completed';

const MyActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('courses');

  // 模擬數據
  const courseData = [
    { 
      id: 'c1', 
      title: '兒童籃球基礎班 (U10)', 
      coach: '王教練', 
      studentName: '小寶', 
      time: '週一、週三 19:00-20:00', 
      progress: 60, 
      current: 3, 
      total: 5, 
      nextMonth: 'JUL',
      nextDay: '17',
      nextDate: '2026-02-10' 
    },
    { 
      id: 'c2', 
      title: '成人羽球班', 
      coach: '李教練', 
      studentName: '王小明', 
      time: '週二、週四 19:30-20:30', 
      progress: 20, 
      current: 2, 
      total: 10, 
      nextMonth: 'JUL',
      nextDay: '19',
      nextDate: '2026-02-12' 
    }
  ];

  const venueData = [
    {
      id: 'v1',
      title: '大安運動中心 - 籃球場 A',
      time: '2026-02-05 14:00-16:00',
      location: '台北市大安區辛亥路三段 55 號',
      status: '已確認'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] font-['Noto_Sans_TC']">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-400 active:scale-90 transition-transform">
          <i className="fas fa-chevron-left text-lg"></i>
        </button>
        <h1 className="text-[18px] font-black text-gray-900">我的預約記錄</h1>
      </header>

      {/* Tabs */}
      <div className="bg-white px-5 border-b border-gray-100 sticky top-[61px] z-10">
        <div className="flex gap-6">
          {[
            { id: 'courses', label: '課程', badge: '2' },
            { id: 'venues', label: '場館預約', badge: null },
            { id: 'completed', label: '已完成', badge: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`py-3 text-[14px] font-black transition-all relative ${
                activeTab === tab.id ? 'text-[#F97316]' : 'text-gray-400'
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-[#F97316] text-white text-[9px] rounded-full font-black">
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F97316] rounded-t-full shadow-sm"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* List Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide pb-24">
        {activeTab === 'courses' && courseData.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 slide-up group">
            {/* 標題與標籤 */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-black text-gray-900 leading-tight truncate flex-1 mr-2">{item.title}</h3>
              <span className="bg-orange-50 text-[#f97316] text-[9px] font-black px-2 py-0.5 rounded-full uppercase shrink-0">進行中</span>
            </div>
            
            {/* 資訊區塊 - 更緊湊的排列 */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center gap-1.5">
                <i className="fas fa-user-tie text-[11px] text-orange-400"></i>
                <span className="text-gray-500 font-bold text-[12px]">{item.coach}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="fas fa-user text-[11px] text-[#f97316]"></i>
                <span className="text-[#f97316] font-bold text-[12px]">{item.studentName}</span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <i className="far fa-clock text-[11px] text-gray-300"></i>
                <span className="text-gray-400 font-bold text-[12px]">{item.time}</span>
              </div>
            </div>

            {/* 進度條區塊 - 嵌入式設計 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="bg-[#f97316] h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <span className="text-[11px] font-black text-[#f97316]">{item.current}/{item.total} 堂 ({item.progress}%)</span>
            </div>

            {/* 功能按鈕 - 較小的按鈕 */}
            <div className="flex gap-2">
              <button 
                onClick={() => navigate(`/my/course/${item.id}`)} 
                className="flex-1 py-2 bg-gray-50 text-gray-500 rounded-lg font-black text-[12px] active:scale-95 transition-all"
              >
                課程詳情
              </button>
              <button className="flex-1 py-2 bg-[#f97316] text-white rounded-lg font-black text-[12px] shadow-sm active:scale-95 transition-all">
                發表評價
              </button>
            </div>
          </div>
        ))}

        {activeTab === 'venues' && venueData.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 slide-up group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-black text-gray-900 leading-tight truncate flex-1 mr-2">{item.title}</h3>
              <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-0.5 rounded-full shrink-0">{item.status}</span>
            </div>
            <div className="space-y-1.5 mb-4 text-[12px] font-bold text-gray-500">
              <div className="flex items-center gap-2">
                <i className="far fa-clock text-[11px] text-slate-300"></i>
                <span>{item.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-[11px] text-slate-300"></i>
                <span className="truncate">{item.location}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/my/venue/${item.id}`)}
              className="w-full py-2 bg-gray-900 text-white rounded-lg font-black text-[12px] active:scale-95 transition-all"
            >
              查看憑證
            </button>
          </div>
        ))}

        {activeTab === 'completed' && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <i className="fas fa-folder-open text-5xl mb-4 opacity-20"></i>
            <p className="font-black text-[13px] uppercase tracking-widest">目前沒有已完成的紀錄</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyActivitiesPage;

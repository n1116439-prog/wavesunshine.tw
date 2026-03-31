
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_TEAMS } from '../constants';

interface TeamDetailPageProps {
  showToast: (msg: string) => void;
}

const TeamDetailPage: React.FC<TeamDetailPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const team = MOCK_TEAMS.find(t => t.id === id);
  
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsHeaderVisible(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    const timer = setInterval(() => setActiveMediaIndex(prev => (prev + 1) % 3), 4000);
    return () => { window.removeEventListener('scroll', handleScroll); clearInterval(timer); };
  }, []);

  if (!team) return <div className="p-10 text-center">找不到團隊資訊</div>;

  const mediaItems = [
    { url: team.coverImg },
    { url: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  const stats = [
    { label: '學員數', value: team.students, bg: 'bg-orange-50', color: 'text-orange-600' },
    { label: '課程數', value: team.courses, bg: 'bg-orange-100', color: 'text-[#ea580c]' },
    { label: '教學經驗', value: `${team.experience}年`, bg: 'bg-green-50', color: 'text-green-600' },
    { label: '教練數', value: team.coachesCount, bg: 'bg-amber-50', color: 'text-amber-600' }
  ];

  return (
    <div className="flex flex-col flex-1 bg-white font-['Noto_Sans_TC']">
      {/* Sticky nav */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100] px-5 py-4 flex items-center justify-between transition-all duration-300 ${isHeaderVisible ? 'bg-white shadow-sm opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 active:bg-gray-200 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[17px] font-bold text-gray-900 truncate max-w-[200px]">{team.name}</h1>
        <div className="w-10 h-10"></div>
      </div>

      {/* Media carousel */}
      <div className="relative h-[400px] bg-gray-900 overflow-hidden">
        <div className="flex transition-transform duration-700 h-full" style={{ transform: `translateX(-${activeMediaIndex * 100}%)` }}>
          {mediaItems.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-full h-full">
              <img src={item.url} className="w-full h-full object-cover" alt={`media-${i}`} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10 pointer-events-none"></div>
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 w-11 h-11 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white active:bg-white/40 transition-all z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="absolute top-6 right-6 z-10">
          <span className="bg-[#22C55E] text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-lg">認證團隊</span>
        </div>
        <div className="absolute bottom-8 left-6 right-6">
          <span className="inline-block bg-orange-50 text-[#f97316] px-3 py-1 rounded-full text-[13px] font-bold mb-3">{team.category}</span>
          <h1 className="text-[30px] font-bold text-gray-900 leading-tight mb-2">{team.name}</h1>
          <p className="text-[16px] text-gray-500 font-medium">{team.slogan}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-32 space-y-10 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 -mt-4 relative z-10">
          {stats.map((s, i) => (
            <div key={i} className={`${s.bg} ${s.color} rounded-2xl py-4 flex flex-col items-center shadow-sm`}>
              <span className="text-[18px] font-bold">{s.value}</span>
              <span className="text-[10px] font-medium opacity-60 mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-5 bg-[#f97316] rounded-full"></div>
            <h3 className="text-[19px] font-bold text-gray-900">團隊介紹</h3>
          </div>
          <p className="text-[15px] text-gray-500 font-medium leading-relaxed">{team.description}</p>
        </section>

        {/* Coaches */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-5 bg-[#f97316] rounded-full"></div>
              <h3 className="text-[19px] font-bold text-gray-900">專業師資陣容</h3>
            </div>
            <button onClick={() => navigate(`/team/${team.id}/coaches`)} className="text-[#f97316] text-[13px] font-bold active:opacity-70">查看全部</button>
          </div>
          <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-2">
            {team.coachList.map(coach => (
              <div key={coach.id} className="flex-shrink-0 w-32 bg-gray-50 rounded-3xl p-5 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full ${coach.bg} border-4 border-white shadow-sm flex items-center justify-center text-white font-bold text-xl mb-3`}>{coach.initial}</div>
                <h5 className="text-[14px] font-bold text-gray-900">{coach.name.replace('教練 ', '')}</h5>
                <p className="text-[11px] text-gray-400 font-medium mt-1">{coach.experience.split('，')[0]}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 z-[110]">
        <div className="bg-white/90 backdrop-blur-xl border border-gray-100 p-4 rounded-[32px] shadow-2xl">
          <button onClick={() => navigate(`/team/${team.id}/locations`)} className="w-full py-4 bg-[#f97316] text-white rounded-2xl font-bold text-[15px] shadow-lg shadow-orange-100 active:scale-95 transition-all">立即報名預約</button>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailPage;

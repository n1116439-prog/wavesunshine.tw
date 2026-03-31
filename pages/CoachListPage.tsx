import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_TEAMS } from '../constants';

const CoachListPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const team = MOCK_TEAMS.find(t => t.id === id);

  if (!team) return <div className="p-10 text-center">找不到團隊資訊</div>;

  return (
    <div className="flex flex-col h-full bg-gray-50 font-['Noto_Sans_TC']">
      <header className="bg-gradient-to-br from-[#f97316] to-[#ea580c] px-5 py-6 text-white rounded-b-[35px] sticky top-0 z-[100] shadow-md">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center active:bg-white/10 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[20px] font-black tracking-tight">師資團隊</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 pb-24">
        {team.coachList.map(coach => (
          <div key={coach.id} className="bg-white rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-transparent flex items-center space-x-5">
            <div className={`w-20 h-20 rounded-full ${coach.bg} border-4 border-white shadow-sm flex items-center justify-center text-white font-bold text-2xl flex-shrink-0`}>
              {coach.initial}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[18px] font-bold text-gray-900">{coach.name}</h3>
                <div className="flex items-center text-yellow-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-900 text-[13px] font-bold ml-1">{coach.rating}</span>
                </div>
              </div>
              <p className="text-[#f97316] text-[13px] font-bold mb-2">{coach.experience.split('，')[0]}</p>
              <p className="text-gray-400 text-[12px] font-medium leading-relaxed line-clamp-2">{coach.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachListPage;

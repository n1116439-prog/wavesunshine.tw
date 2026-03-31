
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ACTIVITIES, SPORT_ICONS } from '../constants';

interface ActivityDetailPageProps {
  onJoin: (id: string) => void;
}

const ActivityDetailPage: React.FC<ActivityDetailPageProps> = ({ onJoin }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [step, setStep] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const activity = MOCK_ACTIVITIES.find(a => a.id === id);

  if (!activity) {
    return <div className="p-8 text-center">找不到活動</div>;
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onJoin(activity.id);
      navigate('/my');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 頂部導航欄 */}
      <header className="bg-gradient-to-br from-[#f97316] to-[#ea580c] px-4 pt-6 pb-6 rounded-b-[1.5rem] sticky top-0 z-50 shadow-md shrink-0 transition-all">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-full active:bg-white/10 transition-all">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-white tracking-tight">活動詳細</h1>
          </div>
          <button 
            onClick={() => setIsFavorited(!isFavorited)}
            className={`w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center btn-press transition-all ${isFavorited ? 'text-yellow-400' : 'text-white'}`}
          >
            <svg className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-48">
        {/* 活動關鍵資訊區 */}
        <div className="bg-[#f97316] text-white px-6 pt-4 pb-10 rounded-b-[2rem] shadow-xl relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner backdrop-blur-md">
              {SPORT_ICONS[activity.type]}
            </div>
            <div>
              <h2 className="text-2xl font-black leading-tight tracking-tight">{activity.title}</h2>
              <p className="text-white/80 font-bold text-sm mt-1 flex items-center gap-1">
                📍 {activity.venue}
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-[2rem] p-6 backdrop-blur-md border border-white/20 shadow-inner grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1 text-[10px]">日期</p>
              <p className="font-black text-lg leading-none">{activity.date}</p>
              <p className="text-[10px] opacity-70 font-bold mt-1">{activity.time}</p>
            </div>
            <div className="text-center border-x border-white/20">
              <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1 text-[10px]">人數</p>
              <p className="font-black text-lg leading-none">{activity.currentMembers}/{activity.maxMembers}</p>
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-2 overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500" 
                  style={{ width: `${(activity.currentMembers / activity.maxMembers) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1 text-[10px]">費用</p>
              <p className="font-black text-lg leading-none">${activity.price}</p>
              <p className="text-[10px] opacity-70 font-bold mt-1">含場地費</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 -mt-4">
          {/* 隊長資訊 */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 slide-up">
            <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#f97316] rounded-full" />
              隊長資訊
            </h3>
            <div className="flex items-center gap-4 bg-gray-50/80 p-4 rounded-3xl border border-gray-50">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-3xl shadow-sm border-2 border-white">
                {activity.captain.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-gray-900 text-base">{activity.captain.name}</span>
                  <span className="bg-green-100 text-green-600 px-1.5 py-0.5 rounded text-[10px] font-bold">已驗證</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-1 font-bold">
                  <span>已辦 {activity.captain.sessionsHosted} 場</span>
                  <span className="text-yellow-500">⭐ {activity.captain.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 活動說明 */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 slide-up">
            <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#f97316] rounded-full" />
              活動說明
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed font-medium mb-4">{activity.description}</p>
            <div className="space-y-2">
               {activity.highlights.map((h, i) => (
                 <div key={i} className="flex items-center gap-2 text-[11px] text-gray-500 font-bold">
                   <span className="text-green-500">✓</span>
                   {h}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* 固定底部行動區 - 調整 bottom 以適應 BottomNav */}
      <div className="fixed bottom-[70px] left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          <button 
            onClick={() => navigate(`/chat/${activity.id}`)}
            className="flex-1 py-4 border-2 border-[#f97316] text-[#f97316] rounded-2xl font-black text-sm btn-press transition-all flex items-center justify-center gap-2"
          >
            💬 詢問隊長
          </button>
          <button 
            onClick={() => { setShowJoinModal(true); setStep(1); }}
            className="flex-1 py-4 bg-[#f97316] text-white rounded-2xl font-black text-sm shadow-xl shadow-orange-100 btn-press flex items-center justify-center gap-2"
          >
            ➕ 立即加入
          </button>
        </div>
      </div>

      {/* 報名彈窗流程 */}
      {showJoinModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowJoinModal(false)} />
          <div className="relative bg-white w-full rounded-[2.5rem] overflow-hidden shadow-2xl fade-in flex flex-col max-h-[85%]">
             <div className="p-6 border-b border-gray-50 text-center relative">
                <button onClick={() => setShowJoinModal(false)} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-xl font-black text-gray-900">
                  {step === 1 ? '填寫報名資訊' : step === 2 ? '確認繳費金額' : '報名完成'}
                </h2>
                <div className="flex justify-center gap-2 mt-3">
                   {[1, 2, 3].map(s => (
                     <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'w-8 bg-[#f97316]' : 'w-4 bg-gray-100'}`} />
                   ))}
                </div>
             </div>

            <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#f97316] rounded-full flex items-center justify-center text-white text-[10px] font-bold">4</div>
                    <p className="text-[11px] font-black text-orange-700">確認您的個人聯繫資訊</p>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">您的姓名</label>
                      <input type="text" defaultValue="運動愛好者" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">聯絡電話</label>
                      <input type="tel" defaultValue="0912-345-678" className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-bold transition-all outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 slide-up">
                  <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#f97316] rounded-full flex items-center justify-center text-white text-[10px] font-bold">5</div>
                    <p className="text-[11px] font-black text-orange-700">確認應付金額與支付方式</p>
                  </div>
                  <div className="bg-gray-50/50 rounded-[2.5rem] p-8 text-center border-2 border-dashed border-gray-200">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">本次活動應付金額</p>
                    <p className="text-5xl font-black text-[#f97316] mt-4 tracking-tighter">${activity.price}</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-10 slide-up">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                     <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">報名成功！</h3>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-50">
              <button 
                onClick={handleNextStep}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all btn-press shadow-xl ${
                  step === 3 ? 'bg-gray-900 text-white' : 'bg-[#f97316] text-white'
                }`}
              >
                {step === 1 ? '下一步' : step === 2 ? '立即預約席位' : '返回我的行程'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDetailPage;

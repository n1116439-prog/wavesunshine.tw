import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_CLASSES } from '../constants';

const WaitingListPage: React.FC<{ showToast: (msg: string) => void }> = ({ showToast }) => {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const courseClass = MOCK_CLASSES.find(c => c.id === classId);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    studentName: '',
    studentAge: '',
    note: ''
  });

  if (!courseClass) return <div className="p-10 text-center">找不到課程資訊</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('候補申請已送出！有名額時將主動聯繫您。');
    navigate('/activities');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 font-['Noto_Sans_TC']">
      <header className="bg-gradient-to-br from-[#f97316] to-[#ea580c] px-5 py-6 text-white rounded-b-[35px] sticky top-0 z-[100] shadow-md">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center active:bg-white/10 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[20px] font-black tracking-tight">申請課程候補</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-8 space-y-8 pb-32">
        <div className="bg-orange-50 rounded-[28px] p-6 border border-orange-100">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-orange-600 text-[12px] font-bold uppercase tracking-wider">目前課程已額滿</p>
          </div>
          <h3 className="text-[18px] font-bold text-gray-900 leading-tight">{courseClass.name}</h3>
          <p className="text-gray-500 text-[13px] font-medium mt-2">您可以填寫下方資料申請候補，若有名額釋出，系統將依序通知。</p>
        </div>

        <section className="space-y-5">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-5 bg-[#f97316] rounded-full"></div>
            <h3 className="text-[18px] font-bold text-gray-900">聯絡人資訊</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">聯絡姓名</label>
              <input 
                required
                type="text" 
                className="w-full bg-white border-0 rounded-2xl py-4 px-5 text-[15px] font-medium shadow-sm focus:ring-2 focus:ring-orange-500/10 outline-none transition-all" 
                placeholder="請輸入姓名"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">聯絡電話</label>
              <input 
                required
                type="tel" 
                className="w-full bg-white border-0 rounded-2xl py-4 px-5 text-[15px] font-medium shadow-sm focus:ring-2 focus:ring-orange-500/10 outline-none transition-all" 
                placeholder="請輸入手機號碼"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-5 bg-[#f97316] rounded-full"></div>
            <h3 className="text-[18px] font-bold text-gray-900">學員資訊</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">學員姓名</label>
              <input 
                required
                type="text" 
                className="w-full bg-white border-0 rounded-2xl py-4 px-5 text-[15px] font-medium shadow-sm focus:ring-2 focus:ring-orange-500/10 outline-none transition-all" 
                placeholder="若與聯絡人相同請重複輸入"
                value={formData.studentName}
                onChange={e => setFormData({...formData, studentName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">學員年齡</label>
              <input 
                required
                type="number" 
                className="w-full bg-white border-0 rounded-2xl py-4 px-5 text-[15px] font-medium shadow-sm focus:ring-2 focus:ring-orange-500/10 outline-none transition-all" 
                placeholder="請輸入學員年齡"
                value={formData.studentAge}
                onChange={e => setFormData({...formData, studentAge: e.target.value})}
              />
            </div>
          </div>
        </section>
      </form>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white border-t border-gray-50 z-[110] rounded-t-[35px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleSubmit}
          className="w-full py-4.5 bg-[#f97316] text-white rounded-[22px] font-bold text-[16px] shadow-lg active:scale-95 transition-all"
        >
          送出候補申請
        </button>
      </div>
    </div>
  );
};

export default WaitingListPage;

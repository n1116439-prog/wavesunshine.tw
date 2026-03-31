import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_CLASSES } from '../constants';

const EnrollmentPage: React.FC<{ showToast: (msg: string) => void }> = ({ showToast }) => {
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
    showToast('報名資料已送出！');
    navigate('/wallet'); // Redirect to wallet or activities
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
          <h1 className="text-[20px] font-black tracking-tight">填寫報名資料</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-8 space-y-8 pb-32">
        <div className="bg-orange-50 rounded-[28px] p-6 border border-orange-100">
          <p className="text-[#f97316] text-[12px] font-bold uppercase tracking-wider mb-1">您正在報名</p>
          <h3 className="text-[18px] font-bold text-gray-900 leading-tight">{courseClass.name}</h3>
          <div className="flex items-center mt-3 text-[#f97316] text-[13px] font-medium">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {courseClass.time}
          </div>
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
                className="w-full bg-white border-0 rounded-2xl py-4 px-5 text-[15px] font-medium shadow-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" 
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
                className="w-full bg-white border-0 rounded-2xl py-4 px-5 text-[15px] font-medium shadow-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" 
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
                className="w-full bg-white border-0 rounded-2xl py-4 px-5 text-[15px] font-medium shadow-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" 
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
                className="w-full bg-white border-0 rounded-2xl py-4 px-5 text-[15px] font-medium shadow-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" 
                placeholder="請輸入學員年齡"
                value={formData.studentAge}
                onChange={e => setFormData({...formData, studentAge: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">備註事項 (選填)</label>
              <textarea 
                className="w-full bg-white border-0 rounded-2xl py-4 px-5 text-[15px] font-medium shadow-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all h-32 resize-none" 
                placeholder="是否有特殊過敏或需教練注意之處..."
                value={formData.note}
                onChange={e => setFormData({...formData, note: e.target.value})}
              ></textarea>
            </div>
          </div>
        </section>
      </form>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white border-t border-gray-50 z-[110] rounded-t-[35px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleSubmit}
          className="w-full py-4.5 bg-[#f97316] text-white rounded-[22px] font-bold text-[16px] shadow-lg shadow-orange-200 active:scale-95 transition-all"
        >
          確認報名並送出
        </button>
      </div>
    </div>
  );
};

export default EnrollmentPage;

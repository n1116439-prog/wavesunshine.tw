
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WalletPage: React.FC = () => {
  const navigate = useNavigate();

  // 模擬交易紀錄數據
  const transactionHistory = [
    { id: 1, title: '購買課程 - 兒童籃球基礎班', date: '2026-02-05 14:20', amount: '- NT$ 2,400', type: 'expense' },
    { id: 2, title: '場地預約 - 大安運動中心', date: '2026-02-03 09:15', amount: '- NT$ 800', type: 'expense' },
    { id: 3, title: '帳戶儲值 - 線上支付', date: '2026-01-28 18:30', amount: '+ NT$ 3,000', type: 'income' },
    { id: 4, title: '購買球具 - 專業羽球拍', date: '2026-01-25 11:45', amount: '- NT$ 1,280', type: 'expense' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] font-['Noto_Sans_TC'] overflow-y-auto pb-10">
      {/* 1. 頁面標頭 - 復刻截圖：左側返回、中央標題 */}
      <header className="bg-white px-4 py-5 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-1 text-gray-400 font-bold text-[16px] active:bg-gray-50 px-3 py-2 -ml-3 rounded-full transition-all"
        >
          <i className="fas fa-chevron-left text-sm"></i>
          <span className="ml-1">返回</span>
        </button>
        <h1 className="text-[20px] font-black text-gray-800 absolute left-1/2 -translate-x-1/2">錢包</h1>
        <div className="w-16"></div>
      </header>

      <main className="p-6 space-y-10">
        {/* 4. 最近交易紀錄 - 加入左側藍色指示條 */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[19px] font-black text-gray-900 flex items-center">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full mr-2.5" />
              最近交易紀錄
            </h3>
            <button className="text-[13px] font-bold text-blue-500">查看全部</button>
          </div>
          
          <div className="bg-white rounded-[2.5rem] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-50 divide-y divide-gray-50">
            {transactionHistory.map((item) => (
              <div key={item.id} className="py-5 px-3 flex justify-between items-center first:pt-2 last:pb-2">
                <div className="space-y-1.5">
                  <p className="text-[16px] font-black text-gray-800 leading-tight">{item.title}</p>
                  <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[17px] font-black tracking-tight ${item.type === 'income' ? 'text-blue-600' : 'text-gray-900'}`}>
                    {item.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default WalletPage;

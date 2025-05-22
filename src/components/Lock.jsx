import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import testImage from '../assets/gallery/DCCDB5F2-A693-49B1-A6D3-A3512511D714.jpeg';
import toast, { Toaster } from 'react-hot-toast';

const Lock = () => {
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const correctPassword = '231267';

  const handleNumberClick = (num) => {
    if (password.length < 6) {
      const newPassword = password + num;
      setPassword(newPassword);
      
      if (newPassword.length === 6) {
        if (newPassword === correctPassword) {
          toast.success('ถูกต้อง! เก่งมากไอตูดด', {
            duration: 2000,
            position: 'top-center',
            style: {
              background: '#fffff',
              color: '#00000',
            },
          });
          setTimeout(() => {
            navigate('/menu');
          }, 2000);
        } else {
          setShake(true);
          toast.error('จำไม่ได้หรออ 💢', {
            duration: 2000,
            position: 'top-center',
            style: {
              background: '#ffffff',
              color: '#00000',
            },
          });
          setTimeout(() => {
            setPassword('');
            setShake(false);
          }, 1000);
        }
      }
    }
  };

  const handleDelete = () => {
    setPassword(prev => prev.slice(0, -1));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#fce4ec] via-[#f8a4a7] to-[#ff9a9e] flex items-center justify-center p-4">
      <Toaster />
      <div className="w-full max-w-3xl bg-[#f3f3f3] rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex flex-col md:flex-row">
          {/* ส่วนรูปภาพ */}
          <div className="w-full md:w-1/2 p-6 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff69b4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src={testImage}
              alt="couple" 
              className="w-4/5 h-4/5 object-contain drop-shadow-lg transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* ส่วนล็อค */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center bg-gradient-to-br from-[#f3f3f3] to-[#f3f3f3]">
            <div className="w-full max-w-sm">
              <h2 className="text-xl md:text-2xl font-bold text-[#ff9a9e] text-center mb-6 drop-shadow-md transform transition-transform duration-300 hover:scale-105">Anniversary's Lock</h2>
              <h5 className="text-2xl md:text-2xl font-bold text-[#000000] text-center mb-6 drop-shadow-sm transform transition-transform duration-300 hover:scale-105">วันที่คบกัน</h5>
              <div className={`flex justify-center gap-3 mb-6 ${shake ? 'animate-shake' : ''}`}>
                {Array(6).fill('*').map((_, index) => (
                  <span 
                    key={index} 
                    className={`w-6 h-6 md:w-8 md:h-8 border-2 rounded-full flex justify-center items-center transition-all duration-300
                      ${index < password.length 
                        ? 'bg-[#ff9a9e] border-[#ff9a9e] scale-110' 
                        : 'border-[#ff9a9e]'}`}
                  >
                    {index < password.length ? '' : ''}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button 
                    key={num} 
                    onClick={() => handleNumberClick(num.toString())}
                    className="p-3 md:p-4 text-lg md:text-xl bg-white text-[#ff9a9e] rounded-lg hover:bg-[#ff69b4] hover:text-white transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
                  >
                    {num}
                  </button>
                ))}
                <button 
                  onClick={handleDelete}
                  className="p-3 md:p-4 text-lg md:text-xl bg-white text-[#ff9a9e] rounded-lg hover:bg-[#ff69b4] hover:text-white transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
                >
                  ลบ
                </button>
                <button 
                  onClick={() => handleNumberClick('0')}
                  className="p-3 md:p-4 text-lg md:text-xl bg-white text-[#ff9a9e] rounded-lg hover:bg-[#ff69b4] hover:text-white transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
                >
                  0
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lock; 
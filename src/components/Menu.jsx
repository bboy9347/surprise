import React from 'react';
import { useNavigate } from 'react-router-dom';
import menu1 from '../assets/menu/1.png';
import menu2 from '../assets/menu/2.png';
import menu3 from '../assets/menu/3.png';
import menu4 from '../assets/menu/4.png';
const Menu = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Our Memories',
      description: 'every moment of us',
      image: menu1,
      path: '/Gallery'
    },
    {
      title: 'Love Calendar',
      description: 'Counting days of our love story',
      image: menu2,
      path: '/Timeline'
    },
    {
      title: 'Love Puzzle',
      description: 'Piece by piece of our love',
      image: menu3,
      path: '/puzzle'
    },
    {
      title: 'Love Note',
      description: 'Write down our love story',
      image: menu4,
      path: '/note'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#fce4ec] p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold text-[#ff9a9e] text-center mb-6 md:mb-8">Menu of Love</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-lg cursor-pointer hover:-translate-y-2 transition-transform"
            onClick={() => navigate(item.path)}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full mx-auto mb-3 md:mb-4"
            />
            <h3 className="text-lg md:text-xl font-semibold text-[#ff9a9e]">{item.title}</h3>
            <p className="text-sm md:text-base text-[#ff9a9e]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu; 
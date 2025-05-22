import { Link } from 'react-router-dom'
import CircularGallery from '../components/CircularGallery'
import styled from 'styled-components'

const BackButton = styled(Link)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 0.75rem 2rem;
  background: #ff9a9e;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-decoration: none;

  &:hover {
    background: #ff7a7e;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const ScrollHint = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  color: #ff69b4;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeInOut 3s ease-in-out infinite;
  white-space: nowrap;

  @keyframes fadeInOut {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }

  &::after {
    content: '→';
    font-size: 20px;
    animation: slideRight 1.5s ease-in-out infinite;
  }

  @keyframes slideRight {
    0% { transform: translateX(0); }
    50% { transform: translateX(10px); }
    100% { transform: translateX(0); }
  }

  @media (max-width: 768px) {
    top: 10px;
    font-size: 14px;
    padding: 8px 16px;
    
    &::after {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 12px;
    
    &::after {
      font-size: 14px;
    }
  }
`;

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ff9a9e]">Our Memories</h1>
        </div>
        
        <div className="relative" style={{ height: '600px' }}>
          <ScrollHint>เลื่อนไปด้านขวาเพื่อดูรูปภาพเพิ่มเติม</ScrollHint>
          <div className="absolute inset-0 flex items-center justify-center">
            <CircularGallery 
              bend={3} 
              textColor="#ff9a9e" 
              borderRadius={0.05}
            />
          </div>
        </div>
        <BackButton to="/menu">
          กลับหน้าหลัก
        </BackButton>
      </div>
    </div>
  )
} 
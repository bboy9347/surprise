import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/heart.png';
import Particles from '../components/Particles';
import BlurText from "../components/BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
  


const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full min-h-screen bg-pink-100 flex justify-center items-center px-4 bg-[length:80%_auto] md:bg-[length:40%_auto] bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bg})`,
        position: 'relative'
      }}
    >
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10} 
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="text-center relative z-10">
        <BlurText
  text="Happy Anniversary"
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
 className="text-white text-1xl md:text-4xl font-semibold drop-shadow-md"
/>
        <button 
          className="mt-5 px-6 md:px-10 py-3 md:py-4 text-xl md:text-2xl bg-[#faaad2] text-white rounded-3xl hover:bg-[#eb8dbf] hover:scale-110 transition-transform duration-300"
          onClick={() => navigate('/lock')}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Home; 
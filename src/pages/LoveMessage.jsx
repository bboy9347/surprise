import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styled, { keyframes } from 'styled-components'

const loveLines = [
  'ถึงไอเด็กดื้อ..',
  'วันนี้เป็นวันครบรอบแต่เค้าไม่ได้ไปหา เค้าอยากจะบอกเทอว่า...',
  'ขอบคุณนะที่อยู่กับเค้า ถึงเค้าจะนิสัยไม่ดี ขอโทษที่ทำให้เสียใจอยู่บ่อยครั้ง เค้ามีแค่เทอ จะปรับปรุงตัวเองให้ดีขึ้นคับ',
  'ทุกครั้งที่ได้เจอกันเค้ามีความสุขมากเลยนะ ถึงเราจะไม่ได้อยู่ด้วยกันตลอดเวลา แต่เราก็ยังรักกันมากๆๆ เลยย',
  'ช่วยอยู่รักเค้าไปนานๆหน่อยนะะ เค้าอยากมีอนาคตกับเทอ อยากทำอะไรหลายๆอย่าง ',
  'เค้าจะบอกว่า เค้ารักเทอนะ.. 💖'
]

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { 
    transform: translate(-50%, 20px);
    opacity: 0;
  }
  to { 
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const MessageTitle = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 20px;
  color: #ff69b4;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-out, ${slideUp} 1s ease-out;
  font-weight: bold;

  @media (max-width: 768px) {
    top: 60px;
    font-size: 18px;
    padding: 10px 20px;
  }

  @media (max-width: 480px) {
    top: 40px;
    font-size: 16px;
    padding: 8px 16px;
  }
`;

const Envelope = styled.div`
  width: 300px;
  height: 200px;
  background: #f8e3e3;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ff9a9e;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 50%);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fad0c4;
    clip-path: polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%);
    z-index: 2;
  }
`;

const Letter = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 3;
  background-image: 
    linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
    linear-gradient(#eee .1em, transparent .1em);
  background-size: 100% 1.2em;
  font-family: 'Caveat', cursive;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff9a9e;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ff7a7e;
  }
`;

const LetterContent = styled(motion.div)`
  margin-left: 20px;
  line-height: 1.8;
  color: #333;
  font-size: 1.2rem;
  flex-grow: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ff9a9e;
`;

const StyledButton = styled.button`
  padding: 0.75rem 2rem;
  background: #ff9a9e;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background: #ff7a7e;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

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
`;

const HeartDecoration = styled.div`
  position: absolute;
  font-size: 24px;
  color: #ff9a9e;
  opacity: 0.5;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background: linear-gradient(to bottom, #f0e6f3, #e6e6f0);
`;

const EnvelopeContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

export default function LoveMessage() {
  const [isOpen, setIsOpen] = useState(false)
  const [line, setLine] = useState(0)

  return (
    <Container>
      <BackButton to="/menu">
        กลับหน้าหลัก
      </BackButton>
      <MessageTitle>มีจดหมายมาส่งง !!</MessageTitle>
      <EnvelopeContainer>
        <AnimatePresence>
          {!isOpen ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setIsOpen(true)}
            >
              <Envelope />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Letter>
                <LetterContent>
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {loveLines[line]}
                  </motion.div>
                </LetterContent>
                <ButtonContainer>
                  <StyledButton
                    onClick={() => setLine(line + 1)}
                    disabled={line === loveLines.length - 1}
                  >
                    {line === loveLines.length - 1 ? 'จบข้อความ' : 'อ่านต่อ'}
                  </StyledButton>
                </ButtonContainer>
                <HeartDecoration style={{ top: '20px', right: '20px' }}>❤️</HeartDecoration>
                <HeartDecoration style={{ bottom: '20px', left: '20px' }}>❤️</HeartDecoration>
              </Letter>
            </motion.div>
          )}
        </AnimatePresence>
      </EnvelopeContainer>
    </Container>
  )
} 
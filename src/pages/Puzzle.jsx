import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import testImage from '../assets/gallery/quality_restoration_25680126192143390.png';
import toast, { Toaster } from 'react-hot-toast';

const PuzzleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%),
      radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%);
    background-size: 100px 100px;
    opacity: 0.5;
  }

  h1 {
    margin-bottom: 2rem;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PuzzleArea = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PuzzleGrid = styled.div`
  position: relative;
  width: ${props => props.$isMobile ? '300px' : '450px'};
  height: ${props => props.$isMobile ? '300px' : '450px'};
  margin: 0 auto;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
`;

const PuzzlePiece = styled.div`
  width: ${props => props.$isMobile ? '100px' : '150px'};
  height: ${props => props.$isMobile ? '100px' : '150px'};
  background: #fff;
  border: 2px solid #ddd;
  cursor: move;
  transition: ${props => props.$dragging ? 'none' : 'transform 0.2s'};
  background-image: ${props => `url(${props.image})`};
  background-size: ${props => props.$isMobile ? '300px 300px' : '450px 450px'};
  background-position: ${props => props.position};
  user-select: none;
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  z-index: ${props => props.$dragging ? 2 : 1};
  touch-action: none;
  will-change: transform;

  &:hover {
    transform: ${props => props.$dragging ? 'none' : 'scale(1.05)'};
  }
`;

const PreviewImage = styled.div`
  width: 300px;
  height: 300px;
  background-image: url(${testImage});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
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

const Puzzle = () => {
  const [pieces, setPieces] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [touchStartPos, setTouchStartPos] = useState(null);
  const [piecePositions, setPiecePositions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const puzzleRef = useRef(null);

  // ฟังก์ชันสำหรับสลับตำแหน่งแบบสุ่ม
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // ฟังก์ชันสำหรับคำนวณตำแหน่งที่ถูกต้อง
  const calculateCorrectPosition = (index, pieceSize) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return {
      x: col * pieceSize,
      y: row * pieceSize
    };
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const pieceSize = isMobile ? 100 : 150;
    const positions = [];
    const piecePos = [];
    
    // สร้างตำแหน่งเริ่มต้น
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      positions.push({
        id: i,
        position: `${-col * pieceSize}px ${-row * pieceSize}px`,
        currentPosition: i
      });
      piecePos.push(calculateCorrectPosition(i, pieceSize));
    }

    // สลับตำแหน่งแบบสุ่ม
    const shuffledPositions = shuffleArray([...piecePos]);
    const shuffledPieces = positions.map((piece, index) => ({
      ...piece,
      currentPosition: shuffledPositions.findIndex(
        pos => pos.x === piecePos[index].x && pos.y === piecePos[index].y
      )
    }));

    setPieces(shuffledPieces);
    setPiecePositions(shuffledPositions);
  }, [isMobile]);

  const swapPieces = (index1, index2) => {
    if (index1 === undefined || index2 === undefined) return;
    
    const newPieces = [...pieces];
    const piece1 = newPieces.find(p => p.currentPosition === index1);
    const piece2 = newPieces.find(p => p.currentPosition === index2);

    if (!piece1 || !piece2) return;

    // สลับตำแหน่งในอาร์เรย์
    [piece1.currentPosition, piece2.currentPosition] = 
    [piece2.currentPosition, piece1.currentPosition];

    // สลับตำแหน่ง x, y
    const newPositions = [...piecePositions];
    [newPositions[index1], newPositions[index2]] = 
    [newPositions[index2], newPositions[index1]];

    setPieces(newPieces);
    setPiecePositions(newPositions);

    // ตรวจสอบว่าต่อจิ๊กซอเสร็จหรือยัง
    const isPuzzleComplete = newPieces.every(piece => piece.id === piece.currentPosition);
    if (isPuzzleComplete && !isComplete) {
      setIsComplete(true);
      toast.success('เก่งมากกก! แฟนใครเนี่ยย', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#ffffff',
          color: '#000000',
          fontSize: '16px',
          padding: '16px',
        },
      });
    }
  };

  // Mouse Events
  const handleMouseDown = (e, index) => {
    const rect = puzzleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDraggedPiece({
      index,
      startX: x,
      startY: y,
      offsetX: x - piecePositions[index].x,
      offsetY: y - piecePositions[index].y
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!draggedPiece) return;
    e.preventDefault();

    const rect = puzzleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPositions = [...piecePositions];
    newPositions[draggedPiece.index] = {
      x: x - draggedPiece.offsetX,
      y: y - draggedPiece.offsetY
    };
    setPiecePositions(newPositions);
  };

  const handleMouseUp = (e) => {
    if (!draggedPiece) return;

    const rect = puzzleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pieceSize = isMobile ? 100 : 150;

    // หาชิ้นส่วนที่อยู่ใกล้ที่สุด
    const targetIndex = piecePositions.findIndex((pos, i) => {
      if (i === draggedPiece.index) return false;
      const dx = x - (pos.x + pieceSize/2);
      const dy = y - (pos.y + pieceSize/2);
      return Math.sqrt(dx * dx + dy * dy) < pieceSize/2;
    });

    if (targetIndex !== -1) {
      swapPieces(draggedPiece.index, targetIndex);
    } else {
      // คืนตำแหน่งชิ้นส่วนที่ลาก
      const newPositions = [...piecePositions];
      newPositions[draggedPiece.index] = calculateCorrectPosition(draggedPiece.index, pieceSize);
      setPiecePositions(newPositions);
    }

    setDraggedPiece(null);
  };

  // Touch Events
  const handleTouchStart = (e, index) => {
    const touch = e.touches[0];
    const rect = puzzleRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    setTouchStartPos({
      index,
      startX: x,
      startY: y,
      offsetX: x - piecePositions[index].x,
      offsetY: y - piecePositions[index].y
    });
  };

  const handleTouchMove = (e) => {
    if (!touchStartPos) return;
    e.preventDefault();

    const touch = e.touches[0];
    const rect = puzzleRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const newPositions = [...piecePositions];
    newPositions[touchStartPos.index] = {
      x: x - touchStartPos.offsetX,
      y: y - touchStartPos.offsetY
    };
    setPiecePositions(newPositions);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartPos) return;

    const touch = e.changedTouches[0];
    const rect = puzzleRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const pieceSize = isMobile ? 100 : 150;

    // หาชิ้นส่วนที่อยู่ใกล้ที่สุด
    const targetIndex = piecePositions.findIndex((pos, i) => {
      if (i === touchStartPos.index) return false;
      const dx = x - (pos.x + pieceSize/2);
      const dy = y - (pos.y + pieceSize/2);
      return Math.sqrt(dx * dx + dy * dy) < pieceSize/2;
    });

    if (targetIndex !== -1) {
      swapPieces(touchStartPos.index, targetIndex);
    } else {
      // คืนตำแหน่งชิ้นส่วนที่ลาก
      const newPositions = [...piecePositions];
      newPositions[touchStartPos.index] = calculateCorrectPosition(touchStartPos.index, pieceSize);
      setPiecePositions(newPositions);
    }

    setTouchStartPos(null);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [draggedPiece, touchStartPos]);

  return (
    <PuzzleContainer>
      <Toaster />
      <h1>ลองแก้สิ้ ทำได้มั้ยน้าาา</h1>
      <PuzzleArea>
        <PuzzleGrid ref={puzzleRef} $isMobile={isMobile}>
          {pieces.map((piece, index) => (
            <PuzzlePiece
              key={piece.id}
              image={testImage}
              position={piece.position}
              onMouseDown={(e) => handleMouseDown(e, index)}
              onTouchStart={(e) => handleTouchStart(e, index)}
              $dragging={draggedPiece?.index === index || touchStartPos?.index === index}
              $x={piecePositions[index]?.x || 0}
              $y={piecePositions[index]?.y || 0}
              $isMobile={isMobile}
              data-index={index}
            />
          ))}
        </PuzzleGrid>
        <PreviewImage />
      </PuzzleArea>
      <BackButton to="/menu">
        กลับหน้าหลัก
      </BackButton>
    </PuzzleContainer>
  );
};

export default Puzzle; 
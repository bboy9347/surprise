import { Link } from 'react-router-dom'
import styled from 'styled-components'

const timeline = [
  { month: 'ธันวาคม', text: 'เริ่มคุยกัน และ คบกันเทอขอเค้าเป็นแฟน' },
  { month: 'มกราคม', text: 'เจอกันครั้งแรก วันที่ 11 และเค้าก็ตามเทอกลับไปบ้านเป็นครั้งแรกที่ได้เจอครอบครัวเทอ' },
  { month: 'กุมภาพันธ์', text: 'เค้าไปหาวันวาเลนไทน์ ให้ดอกกุหลาบเป็นครั้งแรกที่เค้าทำแบบนั้น' },
  { month: 'มีนาคม', text: 'เค้าไปหาเทอในวันเกิดเค้า โดนเซอร์ไพรส์วันเกิด และก็ได้ไปทำบุญด้วยกัน' },
  { month: 'เมษายน', text: 'เค้าไปหาเทอได้กินของกินเยอะแยะเลย เค้าปิดเทอมแล้วเลยไปหาได้ไม่บ่อย' },
  { month: 'พฤษภาคม', text: 'เดือนนี้เค้าไม่ได้ไปหาเทอคิดถึงมากเลยย T-T' },
]

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

export default function Timeline() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-100 to-purple-100">
      <h1 className="text-3xl md:text-5xl font-bold text-[#ff9a9e] mb-8">Timeline</h1>
      <div className="bg-white/80 rounded-xl shadow p-6 mb-8 max-w-md w-full">
        <ul className="space-y-3">
          {timeline.map((item, idx) => (
            <li key={idx} className="flex items-center">
              <span className="w-16 text-[#ff9a9e] mr-5 font-bold">{item.month}</span>
              <span className="text-gray-700">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <BackButton to="/menu">
        กลับหน้าหลัก
      </BackButton>
    </div>
  )
} 
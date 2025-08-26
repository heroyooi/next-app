import Image from 'next/image';
import nextPng from '@/../public/covers/next.png'; // 정적 import (blurDataURL 자동)

export default function CoverImage() {
  return (
    <figure style={{ position: 'relative', width: '100%', height: 240 }}>
      <Image
        src={nextPng}
        alt="Next.js 표지"
        fill
        placeholder="blur" // 정적 import 시 blurDataURL 자동
        sizes="(max-width: 768px) 100vw, 800px" // 뷰포트에 맞게
        priority // Above the fold라면 우선 로드
      />
    </figure>
  );
}

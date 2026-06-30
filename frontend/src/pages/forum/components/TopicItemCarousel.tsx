import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TopicImage } from '../types/forum';

interface TopicItemCarouselProps {
    images: TopicImage[];
}

export default function TopicItemCarousel({ images }: TopicItemCarouselProps) {
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    const handlePrevImg = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveImgIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImg = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveImgIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (images.length === 0) return null;

    return (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center font-sans group">
            <img src={images[activeImgIndex].url} alt="Carousel" className="max-h-72 object-contain" />
            {images.length > 1 && (
                <>
                    <button onClick={handlePrevImg} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow border border-slate-200 transition-colors opacity-0 group-hover:opacity-100"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={handleNextImg} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow border border-slate-200 transition-colors opacity-0 group-hover:opacity-100"><ChevronRight className="w-4 h-4" /></button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{activeImgIndex + 1}/{images.length}</div>
                </>
            )}
        </div>
    );
}

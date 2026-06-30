import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
    {
        image: '/images/loginsetp1.png',
        title: 'Une éducation plus forte commence par des familles impliquées.'
    },
    {
        image: '/images/loginsetp2.png',
        title: "Un espace d'échange pour toute la communauté scolaire."
    },
    {
        image: '/images/loginsetp3.png',
        title: 'Suivez la scolarité de votre enfant en temps réel.'
    }
];

export default function RegisterLeftPanel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hidden lg:flex w-[42%] bg-[#080f1a] relative overflow-hidden flex-col justify-end p-12 text-white font-sans shrink-0 aspect-[9/16]">
            {/* Background Image Slideshow */}
            <div className="absolute inset-0 w-full h-full z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={index}
                        src={SLIDES[index].image}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="w-full h-full object-cover"
                        alt={`Slide Background ${index + 1}`}
                    />
                </AnimatePresence>
                {/* Dark overlay to ensure text readability without blur */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
            </div>

            {/* Text Overlay - positioned at the bottom foreground */}
            <div className="relative z-10 space-y-6 select-none pointer-events-none text-left mb-2">
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                    >
                        {SLIDES[index].title}
                    </motion.h1>
                </AnimatePresence>

                {/* Dot navigation indicators */}
                <div className="flex gap-2.5 pt-2">
                    {SLIDES.map((_, i) => (
                        <span 
                            key={i} 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-emerald-500 w-5' : 'bg-white/40'}`} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

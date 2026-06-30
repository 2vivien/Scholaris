import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function RegisterLeftPanel() {
    return (
        <div className="hidden lg:flex w-[42%] bg-[#080f1a] relative overflow-hidden flex-col justify-between p-12 text-white font-sans">
            <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[80px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[80px]" />

            <Link to="/" className="flex items-center gap-3 relative z-10 w-max group">
                <img src="/images/logoacademiatracket.png" alt="Logo" className="w-10 h-10 object-contain rounded-xl bg-white p-1 shadow-md group-hover:scale-105 transition-transform" />
                <span className="font-extrabold text-2xl tracking-tight text-white">
                    AcademiaTrack<span className="text-emerald-400">.</span>
                </span>
            </Link>

            <div className="relative z-10 my-auto py-10 space-y-6">
                <h1 className="text-3xl font-black leading-tight uppercase">
                    Pilotez votre école <br />
                    <span className="text-emerald-400">avec précision.</span>
                </h1>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
                    La suite complète pour gérer élèves, notes, finances et communications depuis une seule interface unifiée et performante.
                </p>

                <div className="flex gap-4 pt-6 justify-center h-48 items-end relative overflow-hidden">
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="w-24 h-36 rounded-xl border border-emerald-500/40 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0">
                        <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80" alt="Card 1" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="w-28 h-40 rounded-xl border border-emerald-400 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0 z-10">
                        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80" alt="Card 2" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="w-24 h-36 rounded-xl border border-emerald-500/40 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0">
                        <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=80" alt="Card 3" className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </div>

            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider relative z-10">
                © 2026 AcademiaTrack · Éducation Africaine
            </div>
        </div>
    );
}

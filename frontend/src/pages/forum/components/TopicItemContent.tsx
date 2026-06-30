import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import type { Topic } from '../types/forum';
import TopicItemCarousel from './TopicItemCarousel';

export default function TopicItemContent({ topic }: { topic: Topic }) {
    const getHost = (u: string) => {
        try { return new URL(u).hostname; } catch { return u; }
    };

    return (
        <div className="space-y-2.5 font-sans">
            <style>{`
                .post-html-content ul { list-style-type: disc !important; margin-left: 1.5rem !important; margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
                .post-html-content ol { list-style-type: decimal !important; margin-left: 1.5rem !important; margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
                .post-html-content blockquote { border-left: 4px solid #cbd5e1 !important; padding-left: 1rem !important; color: #475569 !important; font-style: italic !important; margin: 0.5rem 0 !important; }
            `}</style>
            <Link to={`topics/${topic.id}`} className="block space-y-1.5 group">
                {topic.thematique && <span className="inline-block text-[10px] font-extrabold text-emerald-600 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded">{topic.thematique}</span>}
                <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors text-base font-outfit">{topic.titre}</h4>
                {topic.corps && (
                    <div 
                        dangerouslySetInnerHTML={{ __html: topic.corps }} 
                        className="text-sm text-slate-600 line-clamp-3 leading-relaxed post-html-content" 
                    />
                )}
            </Link>

            {topic.type === 'lien' && topic.lien_url && (
                <a href={topic.lien_url} target="_blank" rel="noopener noreferrer" className="block border border-slate-200 hover:border-slate-350 hover:shadow-sm rounded-xl overflow-hidden transition-all bg-slate-50/20 text-left">
                    {topic.lien_preview_image && (
                        <div className="h-40 w-full bg-slate-100 overflow-hidden relative border-b border-slate-200">
                            <img src={topic.lien_preview_image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="p-3.5 space-y-1">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Globe className="w-3 h-3 text-slate-400" />
                            <span>{getHost(topic.lien_url)}</span>
                        </div>
                        <h5 className="font-bold text-slate-800 text-xs line-clamp-1 leading-snug">{topic.lien_preview_title || topic.titre}</h5>
                        {topic.lien_preview_desc && <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">{topic.lien_preview_desc}</p>}
                    </div>
                </a>
            )}

            {topic.images && topic.images.length > 0 && <TopicItemCarousel images={topic.images} />}

            {topic.tags && topic.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                    {topic.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
}

import { Globe } from 'lucide-react';
import type { Topic } from '../types/forum';

interface TopicAttachmentsProps {
    topic: Topic;
}

export default function TopicAttachments({ topic }: TopicAttachmentsProps) {
    const getHost = (u: string) => {
        try { return new URL(u).hostname; } catch { return u; }
    };

    if (topic.type === 'lien' && topic.lien_url) {
        return (
            <a href={topic.lien_url} target="_blank" rel="noopener noreferrer" className="block border border-slate-200 hover:border-slate-350 hover:shadow-sm rounded-xl overflow-hidden transition-all bg-slate-50/20 text-left font-sans">
                {topic.lien_preview_image && (
                    <div className="h-48 w-full bg-slate-100 overflow-hidden relative border-b border-slate-200">
                        <img src={topic.lien_preview_image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="p-4 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span>{getHost(topic.lien_url)}</span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm leading-snug">{topic.lien_preview_title || topic.titre}</h5>
                    {topic.lien_preview_desc && <p className="text-xs text-slate-500 font-medium leading-relaxed">{topic.lien_preview_desc}</p>}
                </div>
            </a>
        );
    }
    if (topic.type === 'image' && topic.images?.[0]) {
        return (
            <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-white">
                <img src={topic.images[0].url} alt="Attachment" className="w-full h-auto max-h-[500px] object-contain mx-auto" />
            </div>
        );
    }
    return null;
}

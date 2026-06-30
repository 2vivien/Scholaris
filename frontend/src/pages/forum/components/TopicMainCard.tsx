import type { Topic } from '../types/forum';
import TopicAttachments from './TopicAttachments';
import TopicMainCardHeader from './TopicMainCardHeader';
import TopicMainCardFooter from './TopicMainCardFooter';

interface TopicMainCardProps {
    topic: Topic;
}

export default function TopicMainCard({ topic }: TopicMainCardProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col space-y-4 font-sans">
            <style>{`
                .post-html-content ul { list-style-type: disc !important; margin-left: 1.5rem !important; margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
                .post-html-content ol { list-style-type: decimal !important; margin-left: 1.5rem !important; margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
                .post-html-content blockquote { border-left: 4px solid #cbd5e1 !important; padding-left: 1rem !important; color: #475569 !important; font-style: italic !important; margin: 0.5rem 0 !important; }
            `}</style>
            <TopicMainCardHeader topic={topic} />

            <div className="space-y-3">
                {topic.thematique && (
                    <span className="inline-block text-[10px] font-extrabold text-emerald-600 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded">
                        {topic.thematique}
                    </span>
                )}
                <h2 className="text-xl font-bold text-slate-900 font-outfit leading-snug">{topic.titre}</h2>
                {topic.corps && (
                    <div 
                        dangerouslySetInnerHTML={{ __html: topic.corps }} 
                        className="text-sm text-slate-700 leading-relaxed space-y-2 prose max-w-none post-html-content" 
                    />
                )}
            </div>

            <TopicAttachments topic={topic} />

            {topic.tags && topic.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                    {topic.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold bg-white border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full font-sans">#{tag}</span>
                    ))}
                </div>
            )}

            <TopicMainCardFooter topic={topic} />
        </div>
    );
}

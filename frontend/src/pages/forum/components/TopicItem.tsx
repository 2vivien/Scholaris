import { useState } from 'react';
import type { Topic } from '../types/forum';
import TopicItemHeader from './TopicItemHeader';
import TopicItemContent from './TopicItemContent';
import TopicItemFooter from './TopicItemFooter';

interface TopicItemProps {
    topic: Topic;
    onLike: (id: string) => void;
    hasLiked: boolean;
}

export default function TopicItem({ topic, onLike, hasLiked }: TopicItemProps) {
    const [isDismissed, setIsDismissed] = useState(false);

    if (isDismissed) return null;

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all shadow-sm flex flex-col space-y-3 relative group font-sans">
            <TopicItemHeader topic={topic} onDismiss={() => setIsDismissed(true)} />
            <TopicItemContent topic={topic} />
            <TopicItemFooter topic={topic} onLike={onLike} hasLiked={hasLiked} />
        </div>
    );
}

import { Loader2 } from 'lucide-react';
import { useTopicDetailController } from './hooks/useTopicDetailController';
import TopicDetailHeader from './components/TopicDetailHeader';
import TopicMainCard from './components/TopicMainCard';
import TopicCommentSection from './components/TopicCommentSection';

export default function TopicDetailPage() {
    const { topic, reponses, loading, sending, postReply, goBack } = useTopicDetailController();

    if (loading) {
        return (
            <div className="flex justify-center p-20">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }
    if (!topic) {
        return (
            <div className="text-center p-20 text-slate-500 bg-white border rounded-2xl font-sans">
                Publication introuvable.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white -m-6 p-6 font-sans">
            <TopicDetailHeader onBack={goBack} />
            <main className="max-w-3xl mx-auto space-y-4">
                <TopicMainCard topic={topic} />
                <TopicCommentSection 
                    topic={topic} 
                    reponses={reponses} 
                    sending={sending} 
                    onPostReply={postReply} 
                />
            </main>
        </div>
    );
}

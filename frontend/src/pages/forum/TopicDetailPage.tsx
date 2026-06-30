import { Loader2 } from 'lucide-react';
import { useTopicDetailController } from './hooks/useTopicDetailController';
import TopicDetailHeader from './components/TopicDetailHeader';
import TopicMainCard from './components/TopicMainCard';
import TopicCommentSection from './components/TopicCommentSection';
import ForumSidebar from './components/ForumSidebar';

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
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-4">
                <div className="lg:col-span-2 space-y-4">
                    <TopicMainCard topic={topic} />
                    <TopicCommentSection 
                        topic={topic} 
                        reponses={reponses} 
                        sending={sending} 
                        onPostReply={postReply} 
                    />
                </div>
                
                {/* Affichage à droite pour ordinateur */}
                <div className="hidden lg:block">
                    <ForumSidebar />
                </div>
            </div>
        </div>
    );
}

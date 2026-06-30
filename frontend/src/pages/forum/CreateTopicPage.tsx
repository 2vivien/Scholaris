import { useCreateTopicController } from './hooks/useCreateTopicController';
import CreateTopicHeader from './components/CreateTopicHeader';
import CreateTopicTabs from './components/CreateTopicTabs';
import CreateTopicForm from './components/CreateTopicForm';

export default function CreateTopicPage() {
    const state = useCreateTopicController();

    return (
        <div className="min-h-screen bg-[#dae0e6] -m-6 p-6 font-sans">
            <CreateTopicHeader onBack={state.goBack} />
            <main className="max-w-3xl mx-auto">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <CreateTopicTabs active={state.postType} onChange={state.setPostType} />
                    <CreateTopicForm state={state} />
                </div>
            </main>
        </div>
    );
}

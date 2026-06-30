import { useParams, useNavigate } from 'react-router-dom';
import { useTopicDetail } from './useTopicDetail';

export function useTopicDetailController() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { topic, reponses, loading, sending, postReply } = useTopicDetail(id || '');

    return {
        topic,
        reponses,
        loading,
        sending,
        postReply,
        goBack: () => navigate(-1)
    };
}

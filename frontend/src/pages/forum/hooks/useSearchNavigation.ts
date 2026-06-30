import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { getFeedPath } from '../services/forumService';

export function useSearchNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';

    const handleSearch = (query: string) => {
        const isFeed = location.pathname.includes('/feed');
        if (!isFeed) {
            const feedPath = getFeedPath(location.pathname);
            navigate(`${feedPath}?q=${encodeURIComponent(query)}`);
        } else {
            setSearchParams(prev => {
                if (query) prev.set('q', query);
                else prev.delete('q');
                return prev;
            });
        }
    };

    return { searchQuery, handleSearch };
}

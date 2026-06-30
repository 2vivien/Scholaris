import type { Auteur } from '../types/forum';
import { getAuthorDetails } from '../utils/authorHelper';

interface ReplyAvatarProps {
    author: Auteur;
}

export default function ReplyAvatar({ author }: ReplyAvatarProps) {
    const { avatar } = getAuthorDetails(author);

    return (
        <div className="flex flex-col items-center font-sans">
            <img src={avatar} alt="Avatar" className="w-7 h-7 rounded-full border border-slate-200 object-cover shrink-0" />
            <div className="w-0.5 flex-1 bg-slate-100 my-1 rounded-full" />
        </div>
    );
}

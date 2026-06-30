import ParentProfileCard from './ParentProfileCard';

interface ParentSettingsProps {
    profile: any;
    onRefresh: () => void;
}

export default function ParentSettings({ profile, onRefresh }: ParentSettingsProps) {
    return (
        <div className="max-w-2xl mx-auto font-sans text-left">
            <ParentProfileCard profile={profile} onRefresh={onRefresh} />
        </div>
    );
}

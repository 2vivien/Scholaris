import ParentProfileCard from './ParentProfileCard';
import ParentSchoolUpgrade from './ParentSchoolUpgrade';

interface ParentSettingsProps {
    profile: any;
    onRefresh: () => void;
}

export default function ParentSettings({ profile, onRefresh }: ParentSettingsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            <ParentProfileCard profile={profile} onRefresh={onRefresh} />
            <ParentSchoolUpgrade userEmail={profile?.email || ''} />
        </div>
    );
}

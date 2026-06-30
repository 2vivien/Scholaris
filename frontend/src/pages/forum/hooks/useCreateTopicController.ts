import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { forumService } from '../services/forumService';
import { uploadImageFile } from '../../../lib/uploadImage';

export function useCreateTopicController() {
    const navigate = useNavigate();
    const [postType, setPostType] = useState<'text' | 'image' | 'lien'>('text');
    const [titre, setTitre] = useState('');
    const [corps, setCorps] = useState('');
    const [lienUrl, setLienUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [tagsInput, setTagsInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedThematique, setSelectedThematique] = useState('');
    const [thematiques, setThematiques] = useState<{ id: number; nom: string }[]>([]);

    useEffect(() => {
        let active = true;
        forumService.getThematiques().then(res => {
            if (active) setThematiques(res);
        });
        return () => { active = false; };
    }, []);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadImageFile(file, 'forum');
            setImageUrl(url);
        } catch (err) {
            alert("Erreur lors du téléchargement de l'image");
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setImageUrl('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!titre.trim() || !selectedThematique) return;
        setLoading(true);

        const tags = tagsInput
            .split(',')
            .map(t => t.trim().toLowerCase())
            .filter(t => t.length > 0);

        try {
            await forumService.addTopic(
                titre,
                corps,
                postType,
                lienUrl || undefined,
                imageUrl ? [imageUrl] : undefined,
                tags,
                selectedThematique
            );
            navigate(-1);
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création de la publication");
        } finally {
            setLoading(false);
        }
    };

    const isSubmitDisabled = !titre.trim() || !selectedThematique || loading || uploading || (postType === 'lien' && !lienUrl.trim()) || (postType === 'image' && !imageUrl);

    return {
        postType,
        setPostType,
        titre,
        setTitre,
        corps,
        setCorps,
        lienUrl,
        setLienUrl,
        imageUrl,
        setImageUrl,
        uploading,
        fileInputRef,
        tagsInput,
        setTagsInput,
        loading,
        handleImageChange,
        handleRemoveImage,
        handleSubmit,
        isSubmitDisabled,
        selectedThematique,
        setSelectedThematique,
        thematiques,
        goBack: () => navigate(-1)
    };
}
export type CreateTopicController = ReturnType<typeof useCreateTopicController>;

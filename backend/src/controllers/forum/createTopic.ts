import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import axios from 'axios';

async function getOGInfo(url: string) {
    try {
        const { data: html } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 3000 });
        const title = (html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i) || [])[1] || '';
        const image = (html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i) || [])[1] || '';
        const desc = (html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i) || [])[1] || '';
        return { title, image, desc };
    } catch { return { title: '', image: '', desc: '' }; }
}

export const createTopic = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const auteur_id = req.user!.id;
    const { titre, corps, tags, type, lien_url, images, thematique } = req.body;
    if (!titre) return res.status(400).json({ error: 'Titre requis.' });

    let og = { title: '', image: '', desc: '' };
    if (type === 'lien' && lien_url) og = await getOGInfo(lien_url);

    try {
        const topic = await prisma.forum_topics.create({
            data: {
                tenant_id, auteur_id, titre,
                corps: corps || null, tags: tags || [],
                type: type || 'text', lien_url: lien_url || null,
                lien_preview_title: og.title || null,
                lien_preview_image: og.image || null,
                lien_preview_desc: og.desc || null,
                thematique: thematique || null,
                images: type === 'image' && Array.isArray(images) && images.length > 0 ? {
                    create: images.map((url: string) => ({ url }))
                } : undefined
            },
            include: { images: true }
        });
        res.status(201).json(topic);
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

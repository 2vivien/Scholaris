import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const generateTeacherAvatar = (matricule: string): string => {
    const avatar = createAvatar(pixelArt, { seed: matricule });
    const svg = avatar.toString();
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const filename = `avatar_${matricule}_${crypto.randomBytes(2).toString('hex')}.svg`;
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), svg);
    return `/uploads/${filename}`;
};

export const generateParentUsername = (): string => {
    const noms = ['chat', 'chien', 'lion', 'tigre', 'ours', 'loup', 'renard', 'aigle', 'hibou', 'faucon'];
    const adjs = ['rapide', 'joyeux', 'fier', 'fort', 'calme', 'agile', 'habile', 'malin', 'bleu', 'vert'];
    const r = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    return `par/${r(noms)}${r(adjs)}${Math.floor(10 + Math.random() * 90)}`;
};

export const generateParentAvatar = (username: string): string => {
    const avatar = createAvatar(pixelArt, { seed: username });
    const svg = avatar.toString();
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const filename = `avatar_parent_${crypto.randomBytes(4).toString('hex')}.svg`;
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), svg);
    return `/uploads/${filename}`;
};

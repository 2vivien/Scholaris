import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const generateTeacherAvatar = (matricule: string): string => {
    const avatar = createAvatar(pixelArt, { seed: matricule });
    const svg = avatar.toString();
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    const filename = `avatar_${matricule}_${crypto.randomBytes(2).toString('hex')}.svg`;
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), svg);
    return `/uploads/${filename}`;
};

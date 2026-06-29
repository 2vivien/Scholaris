import { prisma } from '../lib/prisma';

export const getEcoleId = async (tenant_id: string): Promise<string | null> => {
    const ecole = await prisma.ecoles.findFirst({
        where: { tenant_id },
        select: { id: true },
    });
    return ecole?.id ?? null;
};

export const genMatriculeEleve = async (ecole_id: string): Promise<string> => {
    const ecole = await prisma.ecoles.findUnique({ where: { id: ecole_id }, select: { code: true } });
    const prefix = (ecole?.code ?? 'ELV').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3);
    const yy     = new Date().getFullYear().toString().slice(-2);
    const last   = await prisma.profils_eleves.findFirst({
        where:   { ecole_id, matricule: { startsWith: `${prefix}${yy}` } },
        orderBy: { matricule: 'desc' },
        select:  { matricule: true },
    });
    const seq = last?.matricule ? (parseInt(last.matricule.slice(-4), 10) || 0) + 1 : 1;
    return `${prefix}${yy}${seq.toString().padStart(4, '0')}`;
};

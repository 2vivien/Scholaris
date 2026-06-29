import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: `"AcademiaTrack" <${process.env.SMTP_FROM || 'no-reply@academiatrack.com'}>`,
            to, subject, html,
        });
        console.log(`[Email] Envoyé avec succès à ${to}`);
    } catch (error) {
        console.error(`[Email] Erreur d'envoi à ${to}:`, error);
    }
};

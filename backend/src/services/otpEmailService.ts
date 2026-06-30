import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendRegistrationOTP = async (to: string, otpCode: string) => {
    // Toujours afficher l'OTP dans la console pour faciliter le développement/tests
    console.log("\n==================================================");
    console.log(`🔑 [OTP CODE] Inscription de : ${to}`);
    console.log(`👉 CODE DE VÉRIFICATION : ${otpCode}`);
    console.log("==================================================\n");

    const mailOptions = {
        from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
        replyTo: process.env.EMAIL_REPLY_TO,
        to,
        subject: `Activez votre compte - ${process.env.COMPANY_NAME}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #10B981;">Bienvenue sur ${process.env.COMPANY_NAME}</h2>
        <p>Bonjour,</p>
        <p>Merci de vous être inscrit sur notre plateforme. Pour finaliser la création de votre compte, veuillez utiliser le code de vérification suivant :</p>
        
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px; margin: 25px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #10B981;">${otpCode}</span>
        </div>
        
        <p>Ce code est valable pendant 10 minutes.</p>
        <p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet e-mail.</p>
        <br />
        <p>Cordialement,<br />L'équipe ${process.env.COMPANY_NAME}</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Erreur d'envoi de l'email OTP :", error);
        return false;
    }
};

import cron from 'node-cron';
import nodemailer from 'nodemailer';
import connection from '../db/db.conn';
import dotenv from 'dotenv';

dotenv.config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send reminder emails
const sendReminderEmails = async () => {
    try {
        // Fetch all email addresses from the database
        const [emails]: any[] = await connection.promise().query('SELECT email FROM usuario');

        // Loop through each email and send a reminder
        for (const { email } of emails) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Recordatorio: ¡Haz tus predicciones!',
                text: '¡Hola! Este es un recordatorio para que hagas tus predicciones del día de hoy. ¡No te lo pierdas!',
            });
        }

        console.log('Reminder emails sent successfully');
    } catch (error) {
        console.error('Error sending reminder emails:', error);
    }
};

// Schedule the cron job to run every day at 12:00 PM
cron.schedule('0 12 * * *', () => {
    sendReminderEmails();
    console.log('Cron job executed: Sent reminder emails');
});

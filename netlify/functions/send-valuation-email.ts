import { Handler } from '@netlify/functions';
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { fullName, email, phone, propertyType, location, cadastralReference } = JSON.parse(event.body || '{}');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'gesttiona.mcb@gmail.com',
      subject: 'Nueva solicitud de valoración de inmueble',
      html: `
        <h2>Nueva Solicitud de Valoración</h2>
        <p><strong>Nombre:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Tipo de Inmueble:</strong> ${propertyType}</p>
        <p><strong>Ubicación:</strong> ${location}</p>
        <p><strong>Referencia Catastral:</strong> ${cadastralReference}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
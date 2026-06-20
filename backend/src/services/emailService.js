import nodemailer from 'nodemailer';

function getEmailProvider() {
  return (process.env.EMAIL_PROVIDER || (process.env.RESEND_API_KEY ? 'resend' : 'smtp')).toLowerCase();
}

function getEmailFrom() {
  return process.env.EMAIL_FROM || 'Suporte BPA <onboarding@resend.dev>';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function createTransporter() {
  const port = Number(process.env.EMAIL_PORT || 587);

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port,
    secure: process.env.EMAIL_SECURE === 'true' || port === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendWithResend({ to, subject, html }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY nao configurada.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getEmailFrom(),
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Falha ao enviar e-mail pelo Resend: ${body}`);
  }
}

async function sendWithSmtp({ to, subject, html }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Credenciais SMTP nao configuradas.');
  }

  const transporter = createTransporter();

  await transporter.sendMail({
    from: getEmailFrom(),
    to,
    subject,
    html,
  });
}

export async function sendPasswordResetEmail({ to, nome, resetLink }) {
  const subject = 'Recuperacao de senha - Sistema BPA';
  const nomeSeguro = escapeHtml(nome);
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
      <h2>Ola, ${nomeSeguro}!</h2>
      <p>Recebemos uma solicitacao para redefinir a senha da sua conta no Sistema BPA.</p>
      <p>Use o botao abaixo para cadastrar uma nova senha. O link expira em 1 hora.</p>
      <p>
        <a href="${resetLink}" style="background-color: #2563eb; color: #ffffff; padding: 12px 18px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Redefinir senha
        </a>
      </p>
      <p>Se o botao nao funcionar, copie e cole este link no navegador:</p>
      <p style="word-break: break-all; color: #374151;">${resetLink}</p>
      <p style="font-size: 13px; color: #6b7280;">Caso nao encontre este e-mail na caixa de entrada, verifique tambem a pasta de spam ou lixo eletronico.</p>
      <p style="font-size: 13px; color: #6b7280;">Se voce nao solicitou essa alteracao, ignore este e-mail.</p>
    </div>
  `;

  const provider = getEmailProvider();

  if (provider === 'resend') {
    await sendWithResend({ to, subject, html });
    return { provider };
  }

  await sendWithSmtp({ to, subject, html });
  return { provider: 'smtp' };
}

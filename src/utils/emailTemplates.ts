export interface EmailTemplate {
  subject: string;
  text: string;
  html: string;
}

export interface EmailTemplates {
  [locale: string]: EmailTemplate;
}

export function generateEmailTemplate(email: string, locale: string = 'pt'): EmailTemplate {
  const templates: EmailTemplates = {
    pt: {
      subject: "Obrigado pelo interesse na JM Renovações!",
      text: `Olá!

Obrigado pelo interesse na JM Renovações! 

Recebemos sua solicitação através do nosso site e entraremos em contato em breve com mais informações sobre nossos serviços de renovação.

Seus dados:
- Email: ${email}

Aguarde nosso contato!

Atenciosamente,
Equipa JM Renovações
📧 jonas@jmrenovacoes.com
📱 +351 966 467 368`,
      html: `
        <!DOCTYPE html>
        <html lang="pt">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>JM Renovações - Confirmação</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 0; 
              background-color: #f4f4f4;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #f97316, #ea580c); 
              color: white; 
              padding: 30px 20px; 
              text-align: center; 
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 28px;
            }
            .header p {
              margin: 0;
              opacity: 0.9;
              font-size: 16px;
            }
            .content { 
              padding: 30px 20px; 
              background: white; 
            }
            .content h2 {
              color: #f97316;
              margin-top: 0;
            }
            .footer { 
              text-align: center; 
              padding: 20px; 
              color: #666; 
              font-size: 14px; 
              background: #f9f9f9;
              border-top: 1px solid #eee;
            }
            .highlight { 
              background: #fff3cd; 
              padding: 20px; 
              border-left: 4px solid #f97316; 
              margin: 20px 0; 
              border-radius: 4px;
            }
            .highlight strong {
              color: #f97316;
            }
            ul {
              padding-left: 20px;
            }
            li {
              margin-bottom: 8px;
            }
            .contact-info {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 4px;
              margin-top: 20px;
            }
            .contact-info p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>JM Renovações</h1>
              <p>Transformando casas em lares dos sonhos desde 2015</p>
            </div>
            
            <div class="content">
              <h2>Obrigado pelo seu interesse!</h2>
              
              <p>Recebemos sua solicitação através do nosso site e estamos muito felizes com seu interesse em nossos serviços de renovação.</p>
              
              <div class="highlight">
                <strong>Seus dados:</strong><br>
                📧 Email: ${email}
              </div>
              
              <p>Nossa equipa especializada entrará em contato em breve para:</p>
              <ul>
                <li>Discutir suas necessidades específicas</li>
                <li>Agendar uma consulta gratuita</li>
                <li>Apresentar um orçamento personalizado</li>
              </ul>
              
              <p>Enquanto isso, você pode conhecer mais sobre nossos serviços visitando <a href="https://jmrenovacoes.com" target="_blank" rel="noopener noreferrer">nosso site</a>.</p>
              
              <div class="contact-info">
                <p><strong>Nossos Serviços:</strong></p>
                <p>• Renovação de Casas e Apartamentos</p>
                <p>• Remodelação de Cozinhas e Casas de Banho</p>
                <p>• Limpeza de Telhado</p>
                <p>• Instalações Elétricas e de Água</p>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>JM Renovações</strong></p>
              <p>📧 jonas@jmrenovacoes.com | 📱 +351 966 467 368</p>
              <p>Mais de 200 projetos concluídos com sucesso</p>
              <p style="margin-top: 15px; font-size: 12px; color: #999;">
                Este email foi enviado automaticamente. Por favor, não responda a este email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    }
  };
  
  return templates[locale] || templates.pt;
} 
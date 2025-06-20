
export const EMAIL_CONFIG = {
  RATE_LIMIT: {
    MAX_REQUESTS: 5, // Maximum requests per window
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    BLOCK_DURATION_MS: 60 * 60 * 1000, // 1 hour block if exceeded
  },
  
  SECURITY: {
    // Allowed domains for CSRF validation (update with your actual domains)
    ALLOWED_DOMAINS: [
      'localhost',
      'localhost:4321',
      'jmrenovacoes.netlify.app',
      'jmrenovacoes.com',
    ],
    
    // Disposable email domains to block
    DISPOSABLE_DOMAINS: [
      '10minutemail.com',
      'tempmail.org',
      'guerrillamail.com',
      'mailinator.com',
      'yopmail.com',
      'temp-mail.org',
      'sharklasers.com',
      'guerrillamailblock.com',
      'pokemail.net',
      'spam4.me',
      'bccto.me',
      'chacuo.net',
      'dispostable.com',
      'fakeinbox.com',
      'getairmail.com',
      'mailnesia.com',
      'maildrop.cc',
      'mailinator.net',
      'mailmetrash.com',
      'mailnull.com',
      'mintemail.com',
      'mytrashmail.com',
      'nwldx.com',
      'sharklasers.com',
      'spamspot.com',
      'tempr.email',
      'throwaway.email',
      'trashmail.com',
      'trashmail.net',
      'wegwerfemail.de',
    ],
  },
  
  EMAIL: {
    DEFAULT_LOCALE: 'pt',
    
    SUPPORTED_LOCALES: ['pt', 'en', 'fr'],
    
    HEADERS: {
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal',
      'Importance': 'normal',
      'X-Mailer': 'JM Renovações Website',
    },
  },
  
  SMTP: {
    REQUIRED_VARS: ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'],
    
    PORTS: {
      SMTP: 587,
      SMTPS: 465,
      SUBMISSION: 587,
    },
  },
};

export function validateSMTPConfig(env: Record<string, any>): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  for (const varName of EMAIL_CONFIG.SMTP.REQUIRED_VARS) {
    if (!env[varName]) {
      missing.push(varName);
    }
  }
  
  return {
    valid: missing.length === 0,
    missing,
  };
}

export function isDomainAllowed(domain: string): boolean {
  return EMAIL_CONFIG.SECURITY.ALLOWED_DOMAINS.some(allowed => 
    domain.includes(allowed)
  );
}

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  
  return EMAIL_CONFIG.SECURITY.DISPOSABLE_DOMAINS.includes(domain);
}

export function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         request.headers.get('cf-connecting-ip') ||
         request.headers.get('x-client-ip') || 
         'unknown';
} 
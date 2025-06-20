import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { generateEmailTemplate } from "@utils/emailTemplates";
import { 
  EMAIL_CONFIG, 
  validateSMTPConfig, 
  isDomainAllowed, 
  isDisposableEmail, 
  getClientIP 
} from "@utils/emailConfig";


const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function validateCSRFToken(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // In production, you should validate against a proper CSRF token
  // For now, we'll do basic origin/referer validation
  if (!origin && !referer) {
    return false; // No origin/referer, likely a direct API call
  }
  
  // Check against allowed domains
  if (origin && isDomainAllowed(origin)) {
    return true;
  }
  
  if (referer && isDomainAllowed(referer)) {
    return true;
  }
  
  return false;
}

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record) {
    rateLimitStore.set(identifier, { 
      count: 1, 
      resetTime: now + EMAIL_CONFIG.RATE_LIMIT.WINDOW_MS 
    });
    return { 
      allowed: true, 
      remaining: EMAIL_CONFIG.RATE_LIMIT.MAX_REQUESTS - 1, 
      resetTime: now + EMAIL_CONFIG.RATE_LIMIT.WINDOW_MS 
    };
  }
  
  if (now > record.resetTime) {
    // Reset window
    rateLimitStore.set(identifier, { 
      count: 1, 
      resetTime: now + EMAIL_CONFIG.RATE_LIMIT.WINDOW_MS 
    });
    return { 
      allowed: true, 
      remaining: EMAIL_CONFIG.RATE_LIMIT.MAX_REQUESTS - 1, 
      resetTime: now + EMAIL_CONFIG.RATE_LIMIT.WINDOW_MS 
    };
  }
  
  if (record.count >= EMAIL_CONFIG.RATE_LIMIT.MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }
  
  record.count++;
  return { 
    allowed: true, 
    remaining: EMAIL_CONFIG.RATE_LIMIT.MAX_REQUESTS - record.count, 
    resetTime: record.resetTime 
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!validateCSRFToken(request)) {
      console.warn("CSRF validation failed");
      return new Response("Forbidden", { status: 403 });
    }

    const clientIP = getClientIP(request);
    
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response("Too many requests. Please try again later.", { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
        }
      });
    }

    const contentType = request.headers.get("content-type");
    
    let email: string | undefined;
    let locale: string = EMAIL_CONFIG.EMAIL.DEFAULT_LOCALE;
    
    if (contentType?.includes("application/x-www-form-urlencoded")) {
      const formData = await request.text();
      const params = new URLSearchParams(formData);
      email = params.get("email") || undefined;
      locale = params.get("locale") || EMAIL_CONFIG.EMAIL.DEFAULT_LOCALE;
    } else if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      email = formData.get("email")?.toString();
      locale = formData.get("locale")?.toString() || EMAIL_CONFIG.EMAIL.DEFAULT_LOCALE;
    } else {
      return new Response("Unsupported content type", { status: 400 });
    }

    if (!email) {
      return new Response("Missing email", { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response("Invalid email format", { status: 400 });
    }

    if (isDisposableEmail(email)) {
      return new Response("Disposable email addresses are not allowed", { status: 400 });
    }

    if (!EMAIL_CONFIG.EMAIL.SUPPORTED_LOCALES.includes(locale)) {
      locale = EMAIL_CONFIG.EMAIL.DEFAULT_LOCALE;
    }

    const env = import.meta.env;
    
    const smtpValidation = validateSMTPConfig(env);
    if (!smtpValidation.valid) {
      console.error("Missing SMTP configuration:", smtpValidation.missing);
      return new Response("Server configuration error", { status: 500 });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
    } = env;

    const transporter: Transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === EMAIL_CONFIG.SMTP.PORTS.SMTPS, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: true, // Reject unauthorized certificates
      },
    });

    const template = generateEmailTemplate(email, locale);

    await transporter.sendMail({
      from: `"JM Renovações" <${SMTP_FROM}>`,
      to: email,
      subject: template.subject,
      text: template.text,
      html: template.html,
      headers: EMAIL_CONFIG.EMAIL.HEADERS
    });

    console.log(`Email sent successfully to: ${email.slice(0, 3).split('@')[0]}@***`);

    return new Response("Email sent successfully!", { 
      status: 200,
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
      }
    });

  } catch (err) {
    console.error("Error sending email:", err);
    
    return new Response("Email service temporarily unavailable", { status: 500 });
  }
};

# Email System Documentation

This document describes the email system implementation for the JM Renovações website.

## Overview

The email system consists of:
- **API Endpoint**: `/api/sendEmail` - Handles email submissions
- **Form Component**: `EmailFooterInput.astro` - User interface for email collection
- **Email Templates**: `src/utils/emailTemplates.ts` - HTML and text email templates
- **Configuration**: `src/utils/emailConfig.ts` - System configuration and security settings

## Features

### ✅ Implemented Features

1. **Rate Limiting**
   - 5 requests per 15-minute window per IP address
   - Automatic blocking for 1 hour if limit exceeded
   - Rate limit headers in responses

2. **CSRF Protection**
   - Origin/referer validation
   - Configurable allowed domains
   - Protection against cross-site request forgery

3. **Email Validation**
   - Basic email format validation
   - Disposable email domain blocking
   - Comprehensive list of known disposable domains

4. **Multi-language Support**
   - Portuguese (pt) and French (fr) templates
   - Automatic locale detection
   - Localized error messages

5. **Professional Email Templates**
   - Responsive HTML emails
   - Plain text fallbacks
   - Branded design with company colors
   - Easy to customize and maintain

6. **Security Features**
   - TLS certificate validation
   - Secure SMTP configuration
   - Error message sanitization
   - IP-based rate limiting

7. **User Experience**
   - Client-side validation
   - Loading states
   - Success/error feedback
   - No page redirects

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

### Gmail Setup

For Gmail, you'll need to:

1. Enable 2-factor authentication
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Use the generated password in `SMTP_PASS`

### Domain Configuration

Update `src/utils/emailConfig.ts` with your actual domains:

```typescript
ALLOWED_DOMAINS: [
  'localhost',
  'localhost:4321',
  'your-actual-domain.com', // Replace this
  'jmrenovacoes.pt',
],
```

## File Structure

```
src/
├── pages/api/
│   └── sendEmail.ts              # Main API endpoint
├── components/ui/forms/input/
│   └── EmailFooterInput.astro    # Form component
├── utils/
│   ├── emailTemplates.ts         # Email templates
│   └── emailConfig.ts           # Configuration
└── ...
```

## Customization

### Email Templates

Edit `src/utils/emailTemplates.ts` to customize:

- **Subject lines**: Change the subject for each language
- **Content**: Modify the email body text and HTML
- **Styling**: Update CSS in the HTML templates
- **Branding**: Change colors, logos, and company information

### Rate Limiting

Adjust in `src/utils/emailConfig.ts`:

```typescript
RATE_LIMIT: {
  MAX_REQUESTS: 5,        // Requests per window
  WINDOW_MS: 15 * 60 * 1000, // Window duration (15 minutes)
  BLOCK_DURATION_MS: 60 * 60 * 1000, // Block duration (1 hour)
},
```

### Security Settings

Modify security settings in `src/utils/emailConfig.ts`:

- **Allowed domains**: Add your production domains
- **Disposable email domains**: Add/remove blocked domains
- **SMTP ports**: Configure for your email provider

## API Endpoint

### POST `/api/sendEmail`

**Request:**
```typescript
Content-Type: application/x-www-form-urlencoded

email=user@example.com&locale=pt
```

**Response:**
```typescript
// Success (200)
{
  status: 200,
  body: "Email sent successfully!",
  headers: {
    'X-RateLimit-Remaining': '4',
    'X-RateLimit-Reset': '2024-01-01T12:00:00.000Z'
  }
}

// Rate Limited (429)
{
  status: 429,
  body: "Too many requests. Please try again later.",
  headers: {
    'X-RateLimit-Remaining': '0',
    'X-RateLimit-Reset': '2024-01-01T12:00:00.000Z',
    'Retry-After': '900'
  }
}

// CSRF Protection (403)
{
  status: 403,
  body: "Forbidden"
}
```

## Error Handling

The system handles various error scenarios:

- **Invalid email format**: Returns 400 with validation message
- **Disposable email**: Returns 400 with blocking message
- **Rate limit exceeded**: Returns 429 with retry information
- **CSRF violation**: Returns 403
- **SMTP errors**: Returns 500 with generic message
- **Missing configuration**: Returns 500 with server error

## Production Considerations

### Rate Limiting
For production, consider using Redis instead of in-memory storage:

```typescript
// Replace the Map-based store with Redis
const rateLimitStore = new Redis(); // Requires redis package
```

### CSRF Protection
For stronger CSRF protection, implement token-based validation:

```typescript
// Generate CSRF tokens and validate them
const csrfToken = generateToken();
// Validate token in request
```

### Email Service
Consider using a dedicated email service for better deliverability:

- **SendGrid**: High deliverability, good for transactional emails
- **Mailgun**: Developer-friendly, good API
- **Amazon SES**: Cost-effective for high volume

### Monitoring
Add monitoring for:

- Email send success/failure rates
- Rate limit violations
- CSRF protection triggers
- SMTP connection issues

## Testing

### Local Testing
1. Set up environment variables
2. Start development server: `npm run dev`
3. Test form submission
4. Check server logs for errors

### Email Testing
- Use services like Mailtrap for testing
- Verify email templates render correctly
- Test with different email clients

## Troubleshooting

### Common Issues

1. **"Server configuration error"**
   - Check all SMTP environment variables are set
   - Verify SMTP credentials are correct

2. **"Forbidden" error**
   - Update `ALLOWED_DOMAINS` in config
   - Check origin/referer headers

3. **"Too many requests"**
   - Wait for rate limit window to reset
   - Check rate limit configuration

4. **Email not sending**
   - Verify SMTP settings
   - Check email provider's sending limits
   - Review server logs for SMTP errors

### Debug Mode
Enable detailed logging by adding to the API endpoint:

```typescript
console.log('Request headers:', Object.fromEntries(request.headers));
console.log('SMTP config:', { host: SMTP_HOST, port: SMTP_PORT, user: SMTP_USER });
```

## Security Best Practices

1. **Never expose SMTP credentials** in client-side code
2. **Use environment variables** for all sensitive configuration
3. **Implement proper CSRF protection** in production
4. **Monitor rate limiting** to prevent abuse
5. **Regularly update** disposable email domain lists
6. **Use HTTPS** in production
7. **Validate all inputs** server-side
8. **Log security events** for monitoring

## Future Enhancements

- [ ] Email verification/confirmation flow
- [ ] Advanced spam detection
- [ ] Email analytics and tracking
- [ ] Template management system
- [ ] A/B testing for email content
- [ ] Integration with CRM systems
- [ ] Automated follow-up emails
- [ ] Email preference management 
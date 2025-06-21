# EmailContact Component

A reusable Astro component that creates a button to open the user's native email client with a pre-filled subject line.

## Features

- **Native Email Integration**: Uses `mailto:` links to open the user's default email client
- **Pre-filled Subject**: Automatically fills the email subject line for better user experience
- **Multiple Variants**: Two styling options (primary and secondary) to match your design
- **Accessibility**: Includes proper ARIA labels and semantic HTML
- **Responsive Design**: Works well on all screen sizes
- **Dark Mode Support**: Automatically adapts to light/dark themes
- **Icon Integration**: Includes an envelope icon for visual clarity

## Usage

### Basic Usage

```astro
---
import EmailContact from "@components/sections/navbar&footer/EmailContact.astro";
---

<EmailContact 
  title="Contact Us" 
  subject="Hello from JM Renovações website!"
  variant="primary"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Contact Us"` | The text displayed on the button |
| `subject` | `string` | `"Hello from JM Renovações website!"` | The pre-filled email subject line |
| `variant` | `"primary" \| "secondary"` | `"primary"` | The styling variant to use |

### Variants

#### Primary Variant
- Orange background (`bg-orange-400`)
- White text
- Hover effects with darker orange

#### Secondary Variant
- Neutral background (`bg-neutral-300`)
- Dark text
- Subtle hover effects
- Dark mode support

### Examples

#### Contact Button
```astro
<EmailContact 
  title="Contact Us" 
  subject="General inquiry about JM Renovações"
  variant="primary"
/>
```

#### Quote Request
```astro
<EmailContact 
  title="Get Quote" 
  subject="I'm interested in getting a quote for my renovation project"
  variant="primary"
/>
```

#### Secondary Style
```astro
<EmailContact 
  title="Send Email" 
  subject="I have a question about your services"
  variant="secondary"
/>
```

## Technical Details

### Email Address
The component is configured to send emails to `jonas@jmrenovacoes.com`. This is hardcoded in the component for consistency.

### Mailto Link Format
The component generates a mailto link in this format:
```
mailto:jonas@jmrenovacoes.com?subject=Your%20Subject%20Here
```

### Styling
The component uses Tailwind CSS classes and follows the existing design system patterns from the project. It includes:
- Responsive padding and text sizes
- Focus states for accessibility
- Hover animations
- Dark mode variants

### Accessibility
- Proper `aria-label` attributes
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

## Demo

Visit `/email-demo` to see the component in action with various configurations and examples.

## Integration

The component is already integrated into the contact page (`/contact`) and can be easily added to any other page or component in the project. 
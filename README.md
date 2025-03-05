# Apex Studio Website

![Apex Studio Logo](assets/images/logo.svg)

## Overview

Apex Studio is a professional drone business offering photography, videography, web development, and app development services. This repository contains the complete website codebase featuring a modern, responsive design with a focus on showcasing services and previous work.

## Features

- **Modern Design**: Clean, professional aesthetic with a black background and sky blue accents
- **Responsive Layout**: Fully responsive design that works seamlessly across all devices
- **Portfolio Showcase**: Interactive portfolio with filtering and lightbox functionality
- **Quote Request System**: Custom form for collecting client project details
- **Animated Elements**: Smooth animations and transitions for enhanced user experience
- **Optimized Performance**: Fast loading times with efficient code structure
- **Cross-Browser Compatible**: Tested and works on all modern browsers

## Technologies Used

- HTML5
- CSS3 (with CSS variables and modular architecture)
- JavaScript (ES6+)
- Intersection Observer API for scroll animations
- CSS Grid and Flexbox for layouts

## File Structure

```
apex_studios/
├── index.html             # Home page
├── services.html          # Services page
├── portfolio.html         # Portfolio page
├── quote.html             # Quote request page
├── contact.html           # Contact information page
├── assets/
│   ├── images/
│   │   ├── logo.svg       # Logo
│   │   ├── background.jpg # Background image
│   │   ├── portfolio/     # Portfolio project images
│   │   ├── team/          # Team photos
│   │   └── icons/         # Social media and UI icons
│   ├── js/
│   │   ├── main.js        # Main JavaScript functionality
│   │   └── animation.js   # Animation specific JavaScript
│   └── css/
│       ├── style.css      # Main CSS file
│       ├── variables.css  # CSS variables for consistent design
│       └── responsive.css # Media queries for responsiveness
├── favicon.ico            # Site favicon
├── LICENSE.txt            # License information
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript for customization

### Installation

1. Clone this repository or download it as a ZIP file
2. Extract the files to your web server directory or local development environment
3. Open `index.html` in a web browser to view the website

### Customization

#### Changing Colors

The color scheme is defined in `assets/css/variables.css`. Modify the CSS variables to change the color palette:

```css
:root {
  --primary-dark: #121212;     /* Change for main dark color */
  --primary-light: #f0f8ff;    /* Change for main light color */
  --accent-color: #33CBE9;     /* Change for accent color */
  /* Other color variables... */
}
```

#### Adding Portfolio Items

To add new portfolio items, edit the `portfolio-grid` section in `portfolio.html`:

1. Add a new portfolio item following the existing format
2. Include relevant images in the `assets/images/portfolio/` directory
3. Update the modal content with project details

#### Configuring Contact Information

Update your contact information in `contact.html`:

```html
<div class="contact-item">
    <div class="contact-icon"><!-- SVG icon --></div>
    <div>
        <p class="contact-label">Email</p>
        <a href="mailto:your-email@example.com" class="contact-value">your-email@example.com</a>
    </div>
</div>
```

#### Form Handling

The forms currently use JavaScript for validation and simulated submission. To make them functional:

1. Choose a form processing service (e.g., Formspree, Netlify Forms) or a server-side solution
2. Update the form action and method attributes
3. Modify the form submission handling in `main.js`

## Browser Support

The website is compatible with all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Performance Optimization

For optimal performance:

1. Compress all images using tools like TinyPNG or ImageOptim
2. Minify CSS and JavaScript files for production
3. Consider using a content delivery network (CDN) for assets
4. Implement lazy loading for images (already configured in the code)

## SEO Considerations

The website includes:

- Semantic HTML structure
- Appropriate meta tags for SEO
- Alt attributes for images
- Schema markup for better search engine visibility

## License

This project is licensed under the [MIT License](LICENSE.txt).

## Contact

Travis Rodriguez - contact@apexstudio.com

Project Website: [apexstudio.com](https://apexstudio.com)

## Acknowledgments

- Icons provided by various SVG icon sets
- Fonts from Google Fonts (Poppins and Inter)
- Inspiration from modern design trends in 2025
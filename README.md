# SAGOD Official Website

A modern, responsive website for the artist SAGOD featuring streaming platform links and an e-commerce shop for merchandise.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Streaming Platforms**: Direct links to all major music streaming services
- **E-commerce Shop**: Sell clothing, tickets, and vinyl records
- **Shopping Cart**: Full-featured cart with add/remove functionality
- **Modern UI**: Gradient effects, smooth animations, and professional styling
- **Mobile Navigation**: Hamburger menu for mobile devices

## Website Structure

### Sections
- **Hero**: Eye-catching landing section with call-to-action buttons
- **Streaming**: Grid of music platform links (Spotify, Apple Music, SoundCloud, YouTube, Amazon Music, Tidal)
- **Shop**: Categorized merchandise store with filtering
  - Clothing (T-shirts, Hoodies, Hats)
  - Tickets (General Admission, VIP)
  - Vinyl Records (Standard, Limited Edition)
- **About**: Artist information
- **Contact**: Booking info and social media links

### Technical Features
- HTML5 semantic structure
- CSS3 with modern features (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (no dependencies required)
- Smooth scrolling navigation
- Cart persistence during session
- Form validation ready
- Lazy loading optimization
- Accessibility considerations

## Getting Started

1. **Download the files** to your local machine
2. **Open `index.html`** in your web browser
3. **Customize** the content as needed

## Customization

### Updating Streaming Links
Edit the streaming platform links in `index.html`:
```html
<a href="YOUR_SPOTIFY_URL" target="_blank" class="streaming-card">
```

### Adding Products
Add new products in the shop section:
```html
<div class="product-card" data-category="clothing">
    <div class="product-image">
        <img src="path/to/image.jpg" alt="Product Name">
    </div>
    <div class="product-info">
        <h3>Product Name</h3>
        <p class="price">$29.99</p>
        <button class="btn add-to-cart" data-product="Product Name" data-price="29.99">Add to Cart</button>
    </div>
</div>
```

### Changing Colors
Update the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --background-dark: #000;
    --background-light: #111;
}
```

### Updating Contact Information
Edit the contact section in `index.html`:
```html
<div class="contact-info">
    <h3>Bookings & Inquiries</h3>
    <p>Email: your-email@sagod.com</p>
    <p>Management: management@sagod.com</p>
</div>
```

## File Structure

```
sagod-website/
├── index.html      # Main HTML file
├── styles.css      # Complete styling
├── script.js       # Interactive functionality
└── README.md       # This documentation
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment

This website can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- Any web server

## Performance

- Optimized images with lazy loading
- Minimal JavaScript (no heavy frameworks)
- CSS animations using transforms
- Efficient event handling

## Future Enhancements

- Payment gateway integration
- Product image galleries
- Music player integration
- Newsletter signup
- Event calendar
- Fan testimonials
- Blog/news section

## Support

For questions or customizations, refer to the code comments or contact your web developer.

---

**© 2024 SAGOD. All rights reserved.**

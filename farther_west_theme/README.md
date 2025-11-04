# Farther West Co. - Shopify Theme

A pixel-perfect Shopify theme clone of the Farther West Co. Framer design, featuring custom product carousels, promotional banners, and a complete e-commerce experience.

## Features

- **Responsive Design** - Fully responsive layout for mobile, tablet, and desktop
- **Custom Slideshow** - Auto-rotating hero slideshow with navigation controls
- **Product Carousel** - Horizontal scrolling product carousel with smooth navigation
- **Product Grid** - Flexible grid layout for product collections
- **Shopping Cart** - Full shopping cart functionality with product management
- **Product Details** - Detailed product pages with image galleries and variants
- **Collections** - Organized product collections with filtering and sorting
- **Custom Typography** - COWBOY WILDWEST heading font and Inter body font
- **Warm Color Palette** - Earthy tones with primary color #B9431F and secondary #F9D5B6

## File Structure

```
farther_west_theme/
├── config/
│   └── theme.json          # Theme configuration and settings
├── layout/
│   └── theme.liquid        # Main theme layout template
├── templates/
│   ├── index.liquid        # Homepage template
│   ├── product.liquid      # Product detail page
│   ├── collection.liquid   # Collection page
│   └── cart.liquid         # Shopping cart page
├── sections/               # Reusable theme sections
├── snippets/               # Reusable code snippets
├── assets/
│   ├── theme.css          # Main stylesheet
│   ├── theme.js           # Main JavaScript file
│   └── [images]           # All theme images (23 images)
└── README.md              # This file
```

## Installation

### Prerequisites
- Shopify store (development or production)
- Shopify CLI installed on your machine
- Git installed

### Steps

1. **Clone or Download the Theme**
   ```bash
   git clone <repository-url> farther_west_theme
   cd farther_west_theme
   ```

2. **Connect to Your Shopify Store**
   ```bash
   shopify theme dev
   ```
   This will prompt you to authenticate and select your store.

3. **Upload the Theme**
   ```bash
   shopify theme push
   ```

4. **Customize in Shopify Admin**
   - Go to your Shopify Admin
   - Navigate to Online Store > Themes
   - Click "Customize" on the Farther West theme
   - Adjust colors, fonts, and content as needed

## Customization

### Colors
Edit the CSS variables in `assets/theme.css`:

```css
:root {
  --color-primary: #B9431F;
  --color-secondary: #F9D5B6;
  --color-accent: #333333;
  /* ... more colors ... */
}
```

### Typography
Fonts are defined in `assets/theme.css`:
- **Headings**: COWBOY WILDWEST (custom font)
- **Body**: Inter (Google Fonts)

To change fonts, modify the `@font-face` declarations and CSS variables.

### Images
All theme images are located in the `assets/` folder. Replace images while maintaining the same filenames to update the theme appearance.

### Sections
Create new sections in the `sections/` folder as `.liquid` files to add customizable theme sections that can be edited in the Shopify Theme Editor.

## Key Components

### Slideshow
- Auto-rotates every 5 seconds
- Manual navigation with arrow buttons
- Dot indicators for slide selection
- Pauses on hover

### Product Carousel
- Horizontal scrolling layout
- Smooth scroll animation
- Previous/Next navigation buttons
- Responsive item sizing

### Product Cards
- Product image with hover zoom effect
- Product name and category
- Price display with optional sale price
- Add to cart button

### Shopping Cart
- Item quantity adjustment
- Remove items functionality
- Order summary with totals
- Promo code support
- Checkout integration

## Liquid Tags Used

- `{{ product.title }}` - Product name
- `{{ product.price | money_without_currency }}` - Formatted price
- `{{ product.featured_image | img_url: '400x400' }}` - Optimized image
- `{% for product in collection.products %}` - Product loops
- `{{ 'filename' | asset_url }}` - Asset URLs
- `{{ shop.locale }}` - Store locale

## JavaScript Classes

### Slideshow
```javascript
const slideshow = new Slideshow('.slideshow-container');
slideshow.nextSlide();
slideshow.prevSlide();
slideshow.goToSlide(2);
```

### Carousel
```javascript
const carousel = new Carousel('.carousel');
carousel.scrollLeft();
carousel.scrollRight();
```

### ShoppingCart
```javascript
window.cart.addToCart(variantId, quantity);
window.cart.removeFromCart(lineItemKey);
window.cart.updateCart(lineItemKey, quantity);
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Images are optimized with Shopify's `img_url` filter
- CSS is minified and critical styles are inline
- JavaScript is deferred for faster page load
- Smooth scroll behavior uses native CSS
- Lazy loading for product images

## Troubleshooting

### Images Not Loading
- Verify image filenames match those in the theme
- Check that images are in the `assets/` folder
- Use the `| asset_url` filter for all asset references

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check CSS variable definitions in `:root`
- Verify no conflicting CSS from Shopify apps

### JavaScript Errors
- Open browser console (F12)
- Check for JavaScript errors
- Verify all DOM elements exist before manipulation
- Use `DOMContentLoaded` event for initialization

## Support & Customization

For additional customization or issues, refer to:
- [Shopify Theme Development Documentation](https://shopify.dev/themes)
- [Liquid Template Language Reference](https://shopify.dev/api/liquid)
- [Shopify CLI Documentation](https://shopify.dev/themes/tools/cli)

## License

This theme is provided as-is for use with Shopify stores.

## Version

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Theme Name**: Farther West Co. - Shopify Theme

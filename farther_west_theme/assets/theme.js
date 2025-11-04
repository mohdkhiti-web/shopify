/**
 * Farther West Co. - Shopify Theme
 * Main JavaScript file for interactive functionality
 */

// ============================================
// Slideshow Functionality
// ============================================

class Slideshow {
  constructor(containerSelector = '.slideshow-container') {
    this.container = document.querySelector(containerSelector);
    this.slides = this.container?.querySelectorAll('.slide') || [];
    this.dots = this.container?.querySelectorAll('.slide-dot') || [];
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    
    if (this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    this.showSlide(0);
    this.startAutoPlay();
    
    // Pause on hover
    this.container?.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container?.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  showSlide(index) {
    if (index >= this.slides.length) {
      this.currentIndex = 0;
    } else if (index < 0) {
      this.currentIndex = this.slides.length - 1;
    } else {
      this.currentIndex = index;
    }

    this.slides.forEach(slide => slide.classList.remove('active'));
    this.dots.forEach(dot => dot.classList.remove('active'));

    this.slides[this.currentIndex].classList.add('active');
    if (this.dots[this.currentIndex]) {
      this.dots[this.currentIndex].classList.add('active');
    }
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }

  goToSlide(index) {
    this.showSlide(index - 1);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }
}

// ============================================
// Carousel Functionality
// ============================================

class Carousel {
  constructor(carouselSelector) {
    this.carousel = document.querySelector(carouselSelector);
    if (!this.carousel) return;
    
    this.itemWidth = 320; // width + gap
    this.init();
  }

  init() {
    // Add smooth scrolling behavior
    this.carousel.style.scrollBehavior = 'smooth';
  }

  scroll(direction) {
    const scrollAmount = direction * this.itemWidth;
    this.carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollLeft() {
    this.scroll(-1);
  }

  scrollRight() {
    this.scroll(1);
  }
}

// ============================================
// Cart Functionality
// ============================================

class ShoppingCart {
  constructor() {
    this.cart = this.getCart();
  }

  getCart() {
    // Fetch cart data from Shopify
    return fetch('/cart.json')
      .then(response => response.json())
      .catch(error => console.error('Error fetching cart:', error));
  }

  addToCart(variantId, quantity = 1) {
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: variantId,
        quantity: quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      this.showNotification('Product added to cart!', 'success');
      return data;
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
      this.showNotification('Error adding product to cart', 'error');
    });
  }

  removeFromCart(lineItemKey) {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        line: lineItemKey,
        quantity: 0
      })
    })
    .then(response => response.json())
    .catch(error => console.error('Error removing from cart:', error));
  }

  updateCart(lineItemKey, quantity) {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        line: lineItemKey,
        quantity: quantity
      })
    })
    .then(response => response.json())
    .catch(error => console.error('Error updating cart:', error));
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background-color: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// ============================================
// Product Image Gallery
// ============================================

class ProductGallery {
  constructor(containerSelector = '.product-gallery') {
    this.container = document.querySelector(containerSelector);
    this.mainImage = this.container?.querySelector('.main-image');
    this.thumbnails = this.container?.querySelectorAll('.thumbnail');
    
    if (this.thumbnails && this.thumbnails.length > 0) {
      this.init();
    }
  }

  init() {
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => this.selectImage(index));
    });
  }

  selectImage(index) {
    const thumbnail = this.thumbnails[index];
    const imageSrc = thumbnail.getAttribute('data-src') || thumbnail.src;
    
    if (this.mainImage) {
      this.mainImage.src = imageSrc;
    }

    this.thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
  }
}

// ============================================
// Variant Selector
// ============================================

class VariantSelector {
  constructor(formSelector = 'form[action*="/cart/add"]') {
    this.form = document.querySelector(formSelector);
    this.variantSelect = this.form?.querySelector('select[name="id"]') || this.form?.querySelector('#variant-select');
    this.priceDisplay = this.form?.querySelector('.price');
    this.addButton = this.form?.querySelector('button[type="submit"]');
    
    if (this.variantSelect) {
      this.init();
    }
  }

  init() {
    this.variantSelect.addEventListener('change', () => this.updateVariant());
  }

  updateVariant() {
    const selectedOption = this.variantSelect.options[this.variantSelect.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    const available = selectedOption.getAttribute('data-available') !== 'false';

    if (this.priceDisplay && price) {
      this.priceDisplay.textContent = `$${price}`;
    }

    if (this.addButton) {
      this.addButton.disabled = !available;
      this.addButton.textContent = available ? 'ADD TO CART' : 'SOLD OUT';
    }
  }
}

// ============================================
// Smooth Scroll
// ============================================

function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// ============================================
// Mobile Menu
// ============================================

class MobileMenu {
  constructor() {
    this.menuButton = document.querySelector('.menu-button');
    this.menu = document.querySelector('nav');
    
    if (this.menuButton && this.menu) {
      this.init();
    }
  }

  init() {
    this.menuButton.addEventListener('click', () => this.toggle());
    
    // Close menu when clicking on a link
    const links = this.menu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => this.close());
    });
  }

  toggle() {
    this.menu.classList.toggle('active');
  }

  close() {
    this.menu.classList.remove('active');
  }
}

// ============================================
// Initialize on DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize slideshow
  new Slideshow('.slideshow-container');

  // Initialize carousels
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    new Carousel('.' + carousel.className.split(' ')[0]);
  });

  // Initialize shopping cart
  window.cart = new ShoppingCart();

  // Initialize product gallery
  new ProductGallery('.product-gallery');

  // Initialize variant selector
  new VariantSelector();

  // Initialize mobile menu
  new MobileMenu();

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }

    .notification {
      animation: slideIn 0.3s ease-out;
    }
  `;
  document.head.appendChild(style);
});

// ============================================
// Utility Functions
// ============================================

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price / 100);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export for use in other scripts
window.Slideshow = Slideshow;
window.Carousel = Carousel;
window.ShoppingCart = ShoppingCart;
window.ProductGallery = ProductGallery;
window.VariantSelector = VariantSelector;
window.smoothScroll = smoothScroll;
window.formatPrice = formatPrice;
window.debounce = debounce;

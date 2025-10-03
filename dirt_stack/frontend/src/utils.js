// Utility function to create page URLs
export const createPageUrl = (pageName) => {
  const pageRoutes = {
    'Home': '/',
    'About': '/about',
    'Services': '/services',
    'Contact': '/contact',
    'Blog': '/blog',
    'Portfolio': '/portfolio',
    'Team': '/team',
    'Pricing': '/pricing',
    'Products': '/products',
    'Cart': '/cart',
    'Admin': '/admin'
  };
  
  return pageRoutes[pageName] || '/';
};

// Utility function to format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Utility function to format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

// Utility function to generate unique IDs
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
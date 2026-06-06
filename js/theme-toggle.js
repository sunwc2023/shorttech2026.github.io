// Theme Toggle System
// Handles light/dark mode switching

class ThemeManager {
  constructor() {
    this.THEME_KEY = 'site-theme';
    this.LIGHT_THEME = 'light';
    this.DARK_THEME = 'dark';
    this.init();
  }

  init() {
    // Ensure icon element exists
    this.ensureIconElement();
    
    // Get saved theme from localStorage or system preference
    const savedTheme = this.getSavedTheme();
    const preferredTheme = savedTheme || this.getSystemPreference();
    this.setTheme(preferredTheme);
    this.attachEventListeners();
  }

  ensureIconElement() {
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (toggleBtn && !toggleBtn.querySelector('i')) {
      const icon = document.createElement('i');
      icon.className = 'ti-moon';
      toggleBtn.appendChild(icon);
    }
  }

  getSavedTheme() {
    return localStorage.getItem(this.THEME_KEY);
  }

  getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return this.DARK_THEME;
    }
    return this.LIGHT_THEME;
  }

  setTheme(theme) {
    const html = document.documentElement;
    
    if (theme === this.DARK_THEME) {
      html.setAttribute('data-theme', this.DARK_THEME);
    } else {
      html.removeAttribute('data-theme');
    }
    
    localStorage.setItem(this.THEME_KEY, theme);
    this.updateToggleButton(theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;
    this.setTheme(newTheme);
  }

  updateToggleButton(theme) {
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (toggleBtn) {
      let icon = toggleBtn.querySelector('i');
      
      // Create icon if it doesn't exist
      if (!icon) {
        icon = document.createElement('i');
        toggleBtn.appendChild(icon);
      }
      
      // Remove both classes first, then add the appropriate one
      icon.classList.remove('ti-sun', 'ti-moon');
      
      if (theme === this.DARK_THEME) {
        toggleBtn.setAttribute('aria-label', 'Switch to light mode');
        icon.classList.add('ti-sun');
      } else {
        toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        icon.classList.add('ti-moon');
      }
    }
  }

  attachEventListeners() {
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!this.getSavedTheme()) {
          const newTheme = e.matches ? this.DARK_THEME : this.LIGHT_THEME;
          this.setTheme(newTheme);
        }
      });
    }
  }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
  });
} else {
  new ThemeManager();
}

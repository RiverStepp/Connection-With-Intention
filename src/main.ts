import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import styles
import '@/styles/base.css'
import '@/styles/utilities.css'

// Create Vue app
const app = createApp(App)

// Configure router
app.use(router)

// Global error handler
app.config.errorHandler = (error, _instance, info) => {
  console.error('Global error:', error, info)
  
  // TODO: Send to error monitoring service
  // Example: Sentry.captureException(error, { extra: { info, instance } })
}

// Global warning handler for development
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, _instance, trace) => {
    console.warn('Vue warning:', msg, trace)
  }
}

// Performance monitoring
if (import.meta.env.PROD) {
  // TODO: Initialize performance monitoring
  // Example: Initialize Web Vitals tracking
}

// Mount the app
app.mount('#app')

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

// Performance measurement
if (import.meta.env.DEV) {
  // Measure initial load time
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (perfData) {
      console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms')
      console.log('DOM ready time:', perfData.domContentLoadedEventEnd - perfData.fetchStart, 'ms')
    }
  })
}

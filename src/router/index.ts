import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Lazy load all page components for better performance
const Home = () => import('@/pages/Home.vue')
const About = () => import('@/pages/About.vue')
const Services = () => import('@/pages/Services.vue')
const Contact = () => import('@/pages/Contact.vue')
const Resources = () => import('@/pages/Resources.vue')
const Faq = () => import('@/pages/Faq.vue')
const Testimonials = () => import('@/pages/Testimonials.vue')
const Policies = () => import('@/pages/Policies.vue')
const Legal = () => import('@/pages/Legal.vue')
const NotFound = () => import('@/pages/NotFound.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Early Childhood Mental Health Services',
      description: 'Professional mental health services specializing in early childhood development. Compassionate, evidence-based therapy for children and families.',
      keywords: 'early childhood mental health, child therapy, family therapy, child psychologist, developmental therapy'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About Our Practice',
      description: 'Learn about our approach to early childhood mental health, credentials, and commitment to supporting children and families.',
      keywords: 'child therapist, credentials, experience, early childhood development, family-centered care'
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: {
      title: 'Mental Health Services',
      description: 'Comprehensive early childhood mental health services including assessments, individual therapy, parent coaching, and family support.',
      keywords: 'child assessment, individual therapy, parent coaching, family therapy, behavioral support, autism support'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact Us',
      description: 'Get in touch to schedule a consultation or learn more about our early childhood mental health services.',
      keywords: 'contact, appointment, consultation, schedule, phone, email'
    }
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources,
    meta: {
      title: 'Mental Health Resources',
      description: 'Helpful resources for parents and families including crisis support, parenting guides, and educational materials.',
      keywords: 'parenting resources, crisis support, mental health resources, family guides, child development'
    }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: Faq,
    meta: {
      title: 'Frequently Asked Questions',
      description: 'Common questions about our services, insurance, appointments, and what to expect during therapy.',
      keywords: 'FAQ, questions, insurance, appointments, therapy process, what to expect'
    }
  },
  {
    path: '/testimonials',
    name: 'Testimonials',
    component: Testimonials,
    meta: {
      title: 'Client Testimonials',
      description: 'Read testimonials from families who have received care from our early childhood mental health practice.',
      keywords: 'testimonials, reviews, client experiences, success stories, family feedback'
    }
  },
  {
    path: '/policies',
    name: 'Policies',
    component: Policies,
    meta: {
      title: 'Practice Policies',
      description: 'Important information about our practice policies, cancellation procedures, and guidelines.',
      keywords: 'practice policies, cancellation policy, guidelines, procedures'
    }
  },
  {
    path: '/legal',
    name: 'Legal',
    component: Legal,
    meta: {
      title: 'Legal Information',
      description: 'Privacy policy, terms of use, accessibility statement, and other legal information.',
      keywords: 'privacy policy, terms of use, legal, accessibility, HIPAA'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Page Not Found',
      description: 'The page you are looking for could not be found.',
      robots: 'noindex, nofollow'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // Handle scroll behavior for better UX
    if (savedPosition) {
      // Return to saved position (browser back/forward)
      return savedPosition
    } else if (to.hash) {
      // Scroll to anchor link with offset for fixed header
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Offset for fixed header
      }
    } else {
      // Scroll to top for new pages
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Global navigation guards
router.beforeEach((_to, _from, next) => {
  // Set loading state if needed
  // Could dispatch to a global store here
  
  // Validate route params if needed
  
  next()
})

router.afterEach((to) => {
  // Update page title from route meta
  if (to.meta.title) {
    const siteName = 'Sprout & Star Mental Health'
    document.title = to.name === 'Home' 
      ? `${siteName} - ${to.meta.title as string}`
      : `${to.meta.title as string} | ${siteName}`
  }
  
  // Analytics tracking would go here
  // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: to.path })
  
  // Remove loading state if needed
})

// Error handling
router.onError((error) => {
  console.error('Router error:', error)
  
  // Could send to error reporting service
  // Example: Sentry.captureException(error)
})

export default router

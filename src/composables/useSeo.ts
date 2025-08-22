import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { siteData } from '@/data/site'

export interface SeoMeta {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  ogUrl?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  robots?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

export interface BreadcrumbItem {
  name: string
  item: string
}

export function useSeo(meta: SeoMeta = {}) {
  const route = useRoute()
  const metaTags: Ref<HTMLMetaElement[]> = ref([])
  const linkTags: Ref<HTMLLinkElement[]> = ref([])

  const defaultMeta: SeoMeta = {
    title: siteData.name,
    description: siteData.description,
    ogType: 'website',
    ogImage: `${siteData.url}/og-image.png`,
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
    author: siteData.name
  }

  function createMetaTag(name: string, content: string, property = false): HTMLMetaElement {
    const tag = document.createElement('meta')
    if (property) {
      tag.setAttribute('property', name)
    } else {
      tag.setAttribute('name', name)
    }
    tag.setAttribute('content', content)
    return tag
  }

  function createLinkTag(rel: string, href: string): HTMLLinkElement {
    const tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    tag.setAttribute('href', href)
    return tag
  }

  function updateTitle(title: string) {
    const fullTitle = title === siteData.name ? title : `${title} | ${siteData.name}`
    document.title = fullTitle
  }

  function updateMeta(seoMeta: SeoMeta) {
    // Remove existing meta tags
    metaTags.value.forEach(tag => tag.remove())
    linkTags.value.forEach(tag => tag.remove())
    metaTags.value = []
    linkTags.value = []

    const mergedMeta = { ...defaultMeta, ...seoMeta }
    const head = document.head

    // Update title
    if (mergedMeta.title) {
      updateTitle(mergedMeta.title)
    }

    // Description
    if (mergedMeta.description) {
      const tag = createMetaTag('description', mergedMeta.description)
      metaTags.value.push(tag)
      head.appendChild(tag)
    }

    // Keywords
    if (mergedMeta.keywords) {
      const tag = createMetaTag('keywords', mergedMeta.keywords)
      metaTags.value.push(tag)
      head.appendChild(tag)
    }

    // Robots
    if (mergedMeta.robots) {
      const tag = createMetaTag('robots', mergedMeta.robots)
      metaTags.value.push(tag)
      head.appendChild(tag)
    }

    // Author
    if (mergedMeta.author) {
      const tag = createMetaTag('author', mergedMeta.author)
      metaTags.value.push(tag)
      head.appendChild(tag)
    }

    // Canonical URL
    const canonicalUrl = mergedMeta.canonical || `${siteData.url}${route.path}`
    const canonicalTag = createLinkTag('canonical', canonicalUrl)
    linkTags.value.push(canonicalTag)
    head.appendChild(canonicalTag)

    // Open Graph tags
    const ogTitle = mergedMeta.ogTitle || mergedMeta.title || siteData.name
    const ogDescription = mergedMeta.ogDescription || mergedMeta.description || siteData.description
    const ogUrl = mergedMeta.ogUrl || canonicalUrl
    const ogImage = mergedMeta.ogImage || `${siteData.url}/og-image.png`

    const ogTags = [
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: ogDescription },
      { property: 'og:type', content: mergedMeta.ogType || 'website' },
      { property: 'og:url', content: ogUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: siteData.name },
      { property: 'og:locale', content: 'en_US' }
    ]

    ogTags.forEach(({ property, content }) => {
      if (content) {
        const tag = createMetaTag(property, content, true)
        metaTags.value.push(tag)
        head.appendChild(tag)
      }
    })

    // Twitter Card tags
    const twitterTitle = mergedMeta.twitterTitle || ogTitle
    const twitterDescription = mergedMeta.twitterDescription || ogDescription
    const twitterImage = mergedMeta.twitterImage || ogImage

    const twitterTags = [
      { name: 'twitter:card', content: mergedMeta.twitterCard || 'summary_large_image' },
      { name: 'twitter:title', content: twitterTitle },
      { name: 'twitter:description', content: twitterDescription },
      { name: 'twitter:image', content: twitterImage }
    ]

    twitterTags.forEach(({ name, content }) => {
      if (content) {
        const tag = createMetaTag(name, content)
        metaTags.value.push(tag)
        head.appendChild(tag)
      }
    })

    // Published/Modified time for articles
    if (mergedMeta.publishedTime) {
      const tag = createMetaTag('article:published_time', mergedMeta.publishedTime, true)
      metaTags.value.push(tag)
      head.appendChild(tag)
    }

    if (mergedMeta.modifiedTime) {
      const tag = createMetaTag('article:modified_time', mergedMeta.modifiedTime, true)
      metaTags.value.push(tag)
      head.appendChild(tag)
    }
  }

  // Watch for route changes and update meta accordingly
  watch(() => route.path, () => {
    updateMeta(meta)
  }, { immediate: false })

  onMounted(() => {
    updateMeta(meta)
  })

  onUnmounted(() => {
    // Clean up meta tags when component is unmounted
    metaTags.value.forEach(tag => tag.remove())
    linkTags.value.forEach(tag => tag.remove())
  })

  return {
    updateMeta,
    updateTitle
  }
}

// Helper function to generate page-specific SEO meta
export function generatePageMeta(
  title: string,
  description: string,
  path: string,
  options: Partial<SeoMeta> = {}
): SeoMeta {
  return {
    title,
    description,
    canonical: `${siteData.url}${path}`,
    ogTitle: title,
    ogDescription: description,
    ogUrl: `${siteData.url}${path}`,
    twitterTitle: title,
    twitterDescription: description,
    ...options
  }
}

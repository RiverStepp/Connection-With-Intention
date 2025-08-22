import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { siteData, navigationLinks } from '@/data/site'

export interface SchemaOrgData {
  '@context': string
  '@type': string
  [key: string]: any
}

export function useSchemaOrg() {
  const route = useRoute()
  const schemaScripts: Ref<HTMLScriptElement[]> = ref([])

  function createSchemaScript(data: SchemaOrgData): HTMLScriptElement {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data, null, 2)
    return script
  }

  function addSchema(data: SchemaOrgData) {
    const script = createSchemaScript(data)
    schemaScripts.value.push(script)
    document.head.appendChild(script)
  }

  function removeAllSchemas() {
    schemaScripts.value.forEach(script => script.remove())
    schemaScripts.value = []
  }

  function generateLocalBusinessSchema(): SchemaOrgData {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${siteData.url}#business`,
      name: siteData.name,
      description: siteData.description,
      url: siteData.url,
      telephone: siteData.phone,
      email: siteData.email,
      priceRange: '$$',
      image: `${siteData.url}/og-image.png`,
      logo: `${siteData.url}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteData.address.street,
        addressLocality: siteData.address.city,
        addressRegion: siteData.address.state,
        postalCode: siteData.address.zip,
        addressCountry: siteData.address.country
      },
      geo: {
        '@type': 'GeoCoordinates',
        // TODO: Add actual coordinates when address is finalized
        latitude: '37.7749',
        longitude: '-122.4194'
      },
      openingHoursSpecification: Object.entries(siteData.hours).map(([day, hours]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day,
        opens: hours.includes('Closed') ? undefined : hours.split(' - ')[0],
        closes: hours.includes('Closed') ? undefined : hours.split(' - ')[1]?.split(' ')[0]
      })).filter(spec => spec.opens && spec.closes),
      areaServed: {
        '@type': 'State',
        name: siteData.address.state
      },
      serviceType: 'Mental Health Services',
      medicalSpecialty: 'Child Psychology',
      availableService: siteData.specialties.map(specialty => ({
        '@type': 'MedicalTherapy',
        name: specialty
      })),
      sameAs: Object.values(siteData.social).filter(Boolean)
    }
  }

  function generateOrganizationSchema(): SchemaOrgData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${siteData.url}#organization`,
      name: siteData.name,
      description: siteData.description,
      url: siteData.url,
      telephone: siteData.phone,
      email: siteData.email,
      logo: `${siteData.url}/logo.png`,
      image: `${siteData.url}/og-image.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteData.address.street,
        addressLocality: siteData.address.city,
        addressRegion: siteData.address.state,
        postalCode: siteData.address.zip,
        addressCountry: siteData.address.country
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteData.phone,
        email: siteData.email,
        contactType: 'customer service',
        availableLanguage: siteData.services.languages,
        areaServed: siteData.address.state
      },
      sameAs: Object.values(siteData.social).filter(Boolean)
    }
  }

  function generateWebsiteSchema(): SchemaOrgData {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteData.url}#website`,
      name: siteData.name,
      description: siteData.description,
      url: siteData.url,
      publisher: {
        '@id': `${siteData.url}#organization`
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteData.url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }
  }

  function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): SchemaOrgData {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    }
  }

  function generateServiceSchema(): SchemaOrgData {
    return {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      '@id': `${siteData.url}#service`,
      name: siteData.name,
      description: siteData.description,
      provider: {
        '@id': `${siteData.url}#organization`
      },
      serviceType: 'Mental Health Services',
      medicalSpecialty: [
        'Child Psychology',
        'Family Therapy',
        'Developmental Psychology'
      ],
      availableService: siteData.specialties.map(specialty => ({
        '@type': 'MedicalTherapy',
        name: specialty,
        description: `Professional ${specialty.toLowerCase()} services`
      })),
      areaServed: {
        '@type': 'State',
        name: siteData.address.state
      }
    }
  }

  function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): SchemaOrgData {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }
  }

  function generateContactPageSchema(): SchemaOrgData {
    return {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Us',
      description: `Contact ${siteData.name} for mental health services`,
      url: `${siteData.url}/contact`,
      mainEntity: {
        '@id': `${siteData.url}#organization`
      }
    }
  }

  function generateAboutPageSchema(): SchemaOrgData {
    return {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Us',
      description: `Learn about ${siteData.name} and our approach to early childhood mental health`,
      url: `${siteData.url}/about`,
      mainEntity: {
        '@id': `${siteData.url}#organization`
      }
    }
  }

  function initializeDefaultSchemas() {
    // Add base schemas that appear on all pages
    addSchema(generateOrganizationSchema())
    addSchema(generateWebsiteSchema())
    addSchema(generateLocalBusinessSchema())

    // Add page-specific schemas based on route
    const path = route.path
    
    // Generate breadcrumbs
    const breadcrumbs = [
      { name: 'Home', url: siteData.url }
    ]
    
    if (path !== '/') {
      const currentPage = navigationLinks.find(link => link.path === path)
      if (currentPage) {
        breadcrumbs.push({
          name: currentPage.name,
          url: `${siteData.url}${path}`
        })
      }
    }
    
    if (breadcrumbs.length > 1) {
      addSchema(generateBreadcrumbSchema(breadcrumbs))
    }

    // Page-specific schemas
    switch (path) {
      case '/services':
        addSchema(generateServiceSchema())
        break
      case '/contact':
        addSchema(generateContactPageSchema())
        break
      case '/about':
        addSchema(generateAboutPageSchema())
        break
    }
  }

  onMounted(() => {
    initializeDefaultSchemas()
  })

  onUnmounted(() => {
    removeAllSchemas()
  })

  return {
    addSchema,
    removeAllSchemas,
    generateLocalBusinessSchema,
    generateOrganizationSchema,
    generateWebsiteSchema,
    generateBreadcrumbSchema,
    generateServiceSchema,
    generateFAQSchema,
    generateContactPageSchema,
    generateAboutPageSchema
  }
}

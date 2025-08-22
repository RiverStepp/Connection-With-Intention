import { siteData } from '@/data/site'

export interface EmailData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  preferredContact?: '' | 'email' | 'phone'
  bestTime?: string
}

export function generateMailtoLink(data: EmailData): string {
  const subject = encodeURIComponent(`${data.subject} - Contact from ${data.name}`)
  
  const body = encodeURIComponent(`
Hello ${siteData.name},

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Preferred Contact Method: ${data.preferredContact || 'Not specified'}
Best Time to Contact: ${data.bestTime || 'Not specified'}

Subject: ${data.subject}

Message:
${data.message}

---
This message was sent from the ${siteData.name} website contact form.
Please note: This email should not contain any Protected Health Information (PHI).
  `.trim())
  
  return `mailto:${siteData.email}?subject=${subject}&body=${body}`
}

export function generateEmailText(data: EmailData): string {
  return `
To: ${siteData.email}
Subject: ${data.subject} - Contact from ${data.name}

Hello ${siteData.name},

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Preferred Contact Method: ${data.preferredContact || 'Not specified'}
Best Time to Contact: ${data.bestTime || 'Not specified'}

Subject: ${data.subject}

Message:
${data.message}

---
This message was prepared from the ${siteData.name} website contact form.
Please note: This email should not contain any Protected Health Information (PHI).
  `.trim()
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers or non-HTTPS
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const success = document.execCommand('copy')
      document.body.removeChild(textArea)
      return success
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Basic phone validation - accepts various formats
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  return phoneRegex.test(cleaned) && cleaned.length >= 10
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone // Return original if doesn't match expected format
}

export function createPhoneLink(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  return `tel:+1${cleaned}`
}

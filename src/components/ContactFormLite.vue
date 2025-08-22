<template>
  <form @submit.prevent="handleSubmit" class="contact-form space-y-6">
    <!-- Form Fields -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Name Field -->
      <div class="form-group">
        <label for="contact-name" class="form-label">
          Full Name <span class="text-mh-error">*</span>
        </label>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          class="form-input"
          :class="{ 'border-mh-error': errors.name }"
          placeholder="Your full name"
          required
          :aria-invalid="!!errors.name"
          :aria-describedby="errors.name ? 'name-error' : undefined"
        />
        <div v-if="errors.name" id="name-error" class="form-error">
          {{ errors.name }}
        </div>
      </div>

      <!-- Email Field -->
      <div class="form-group">
        <label for="contact-email" class="form-label">
          Email Address <span class="text-mh-error">*</span>
        </label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          class="form-input"
          :class="{ 'border-mh-error': errors.email }"
          placeholder="your.email@example.com"
          required
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? 'email-error' : undefined"
        />
        <div v-if="errors.email" id="email-error" class="form-error">
          {{ errors.email }}
        </div>
      </div>
    </div>

    <!-- Phone Field -->
    <div class="form-group">
      <label for="contact-phone" class="form-label">
        Phone Number
      </label>
      <input
        id="contact-phone"
        v-model="form.phone"
        type="tel"
        class="form-input"
        :class="{ 'border-mh-error': errors.phone }"
        placeholder="(555) 123-4567"
        :aria-invalid="!!errors.phone"
        :aria-describedby="errors.phone ? 'phone-error' : undefined"
      />
      <div v-if="errors.phone" id="phone-error" class="form-error">
        {{ errors.phone }}
      </div>
    </div>

    <!-- Contact Preferences -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Preferred Contact Method -->
      <div class="form-group">
        <label for="contact-method" class="form-label">
          Preferred Contact Method
        </label>
        <select
          id="contact-method"
          v-model="form.preferredContact"
          class="form-input"
        >
          <option value="">Select preferred method</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <!-- Best Time to Contact -->
      <div class="form-group">
        <label for="best-time" class="form-label">
          Best Time to Contact
        </label>
        <input
          id="best-time"
          v-model="form.bestTime"
          type="text"
          class="form-input"
          placeholder="e.g., Weekdays 9am-5pm"
        />
      </div>
    </div>

    <!-- Subject Field -->
    <div class="form-group">
      <label for="contact-subject" class="form-label">
        Subject <span class="text-mh-error">*</span>
      </label>
      <select
        id="contact-subject"
        v-model="form.subject"
        class="form-input"
        :class="{ 'border-mh-error': errors.subject }"
        required
        :aria-invalid="!!errors.subject"
        :aria-describedby="errors.subject ? 'subject-error' : undefined"
      >
        <option value="">Select a subject</option>
        <option value="Initial Consultation">Initial Consultation</option>
        <option value="Services Inquiry">Services Inquiry</option>
        <option value="Insurance Questions">Insurance Questions</option>
        <option value="Scheduling">Scheduling</option>
        <option value="General Question">General Question</option>
        <option value="Other">Other</option>
      </select>
      <div v-if="errors.subject" id="subject-error" class="form-error">
        {{ errors.subject }}
      </div>
    </div>

    <!-- Message Field -->
    <div class="form-group">
      <label for="contact-message" class="form-label">
        Message <span class="text-mh-error">*</span>
      </label>
      <textarea
        id="contact-message"
        v-model="form.message"
        class="form-textarea"
        :class="{ 'border-mh-error': errors.message }"
        placeholder="Please describe how we can help you..."
        rows="5"
        required
        :aria-invalid="!!errors.message"
        :aria-describedby="errors.message ? 'message-error' : 'message-help'"
      ></textarea>
      <div v-if="errors.message" id="message-error" class="form-error">
        {{ errors.message }}
      </div>
      <div v-else id="message-help" class="text-sm text-mh-muted mt-1">
        Please do not include any Protected Health Information (PHI) in your message.
      </div>
    </div>

    <!-- Privacy Notice -->
    <div class="bg-mh-bg border border-mh-border rounded-lg p-4">
      <div class="flex items-start gap-3">
        <Icon
          icon="lucide:shield-check"
          class="w-5 h-5 text-mh-primary flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div class="text-sm text-mh-muted">
          <p class="font-medium text-mh-ink mb-1">Privacy & Security Notice</p>
          <p>
            This form is for general inquiries only. Please do not include any Protected Health 
            Information (PHI) or sensitive medical details. For emergencies, call 911 or 988.
          </p>
        </div>
      </div>
    </div>

    <!-- Submit Options -->
    <div class="space-y-4">
      <div class="flex flex-col sm:flex-row gap-3">
        <CTAButton
          type="submit"
          variant="primary"
          size="lg"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          icon-left="lucide:mail"
          class="flex-1"
        >
          {{ isSubmitting ? 'Preparing...' : 'Send via Email' }}
        </CTAButton>
        
        <CTAButton
          type="button"
          variant="secondary"
          size="lg"
          :disabled="isSubmitting"
          icon-left="lucide:copy"
          class="flex-1"
          @click="copyToClipboard"
        >
          Copy Message
        </CTAButton>
      </div>

      <!-- Alternative Contact Methods -->
      <div class="text-center pt-4 border-t border-mh-border">
        <p class="text-sm text-mh-muted mb-3">Prefer to contact us directly?</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <CTAButton
            :href="`tel:${siteData.phone}`"
            variant="outline"
            size="sm"
            icon-left="lucide:phone"
          >
            Call {{ siteData.phone }}
          </CTAButton>
          
          <CTAButton
            :href="`mailto:${siteData.email}`"
            variant="outline"
            size="sm"
            icon-left="lucide:mail"
          >
            Email Directly
          </CTAButton>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div
      v-if="submitMessage"
      :class="submitMessageClass"
      class="p-4 rounded-lg flex items-start gap-3"
      role="alert"
    >
      <Icon
        :icon="submitSuccess ? 'lucide:check-circle' : 'lucide:alert-circle'"
        class="w-5 h-5 flex-shrink-0 mt-0.5"
        :class="submitSuccess ? 'text-mh-success' : 'text-mh-error'"
        aria-hidden="true"
      />
      <div class="text-sm">
        {{ submitMessage }}
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { z } from 'zod'
import Icon from './Icon.vue'
import CTAButton from './CTAButton.vue'
import { siteData } from '@/data/site'
import { generateMailtoLink, generateEmailText, copyToClipboard as copyText, validatePhone } from '@/utils/email'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  preferredContact: '' as '' | 'email' | 'phone',
  bestTime: ''
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().refine(
    (phone) => !phone || validatePhone(phone),
    'Please enter a valid phone number'
  ),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContact: z.string().optional(),
  bestTime: z.string().optional()
})

const submitMessageClass = computed(() => [
  submitSuccess.value 
    ? 'bg-mh-success-100 border border-mh-success-200 text-mh-success'
    : 'bg-mh-error-100 border border-mh-error-200 text-mh-error'
])

function validateForm(): boolean {
  // Clear previous errors
  Object.keys(errors).forEach(key => {
    delete errors[key]
  })

  try {
    contactSchema.parse(form)
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message
        }
      })
    }
    return false
  }
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitMessage.value = ''

  try {
    // Generate mailto link and open it
    const mailtoLink = generateMailtoLink(form)
    window.location.href = mailtoLink

    // Show success message
    submitSuccess.value = true
    submitMessage.value = 'Your email client has been opened with your message. Please send the email to complete your inquiry.'
    
    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
    }, 3000)

  } catch (error) {
    console.error('Error sending message:', error)
    submitSuccess.value = false
    submitMessage.value = 'There was an error opening your email client. Please try copying the message instead or contact us directly.'
  } finally {
    isSubmitting.value = false
  }
}

async function copyToClipboard() {
  if (!validateForm()) {
    return
  }

  try {
    const emailText = generateEmailText(form)
    const success = await copyText(emailText)
    
    if (success) {
      submitSuccess.value = true
      submitMessage.value = 'Message copied to clipboard! You can now paste it into your email client.'
    } else {
      throw new Error('Clipboard API not available')
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    submitSuccess.value = false
    submitMessage.value = 'Unable to copy to clipboard. Please try the email option instead.'
  }
}

function resetForm() {
  Object.keys(form).forEach(key => {
    form[key as keyof typeof form] = ''
  })
  Object.keys(errors).forEach(key => {
    delete errors[key]
  })
  submitMessage.value = ''
}</script>

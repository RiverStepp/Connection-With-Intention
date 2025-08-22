<template>
  <div class="testimonials-page">
    <!-- Hero Section -->
    <Hero
      title="What Families Say"
      subtitle="Client Testimonials"
      description="Read about the experiences of families we've had the privilege to support on their journey."
      size="md"
    />

    <!-- Testimonials Grid -->
    <Section size="lg">
      <div class="max-w-6xl mx-auto">
        <!-- Privacy Notice -->
        <div class="bg-mh-bg border border-mh-border rounded-lg p-4 mb-8 text-center">
          <Icon
            icon="lucide:shield-check"
            class="w-6 h-6 text-mh-primary mx-auto mb-2"
            aria-hidden="true"
          />
          <p class="text-sm text-mh-muted">
            All testimonials are shared with written consent from families. 
            <button
              type="button"
              class="text-mh-primary underline ml-1"
              @click="toggleNameDisplay"
            >
              {{ showFullNames ? 'Show initials only' : 'Show full names' }}
            </button>
          </p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            variant="elevated"
            class="h-full"
          >
            <!-- Quote -->
            <div class="mb-6">
              <Icon
                icon="lucide:quote"
                class="w-8 h-8 text-mh-accent-500 mb-4"
                aria-hidden="true"
              />
              <blockquote class="text-mh-ink font-serif italic leading-relaxed">
                "{{ testimonial.content }}"
              </blockquote>
            </div>

            <!-- Attribution -->
            <footer class="mt-auto">
              <div class="flex items-center gap-3 pt-4 border-t border-mh-border">
                <div class="w-10 h-10 bg-mh-primary-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-semibold text-mh-primary">
                    {{ getInitials(testimonial.name) }}
                  </span>
                </div>
                <div>
                  <div class="font-semibold text-mh-ink">
                    {{ showFullNames ? testimonial.name : getInitials(testimonial.name) }}
                  </div>
                  <div v-if="testimonial.relationship" class="text-sm text-mh-muted">
                    {{ testimonial.relationship }}
                  </div>
                  <div v-if="testimonial.location" class="text-xs text-mh-muted">
                    {{ testimonial.location }}
                  </div>
                </div>
              </div>
            </footer>
          </Card>
        </div>
      </div>
    </Section>

    <!-- Statistics -->
    <Section
      title="Our Impact"
      subtitle="By the Numbers"
      background="muted"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="text-center">
          <div class="text-4xl font-bold text-mh-primary mb-2">95%</div>
          <div class="text-mh-muted">Families report improvement</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-mh-primary mb-2">8+</div>
          <div class="text-mh-muted">Years of experience</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-mh-primary mb-2">200+</div>
          <div class="text-mh-muted">Families served</div>
        </div>
      </div>
      
      <div class="text-center mt-8">
        <p class="text-xs text-mh-muted">
          <strong>TODO:</strong> Replace with actual statistics and outcomes data
        </p>
      </div>
    </Section>

    <!-- Consent Information -->
    <Section title="Sharing Your Experience">
      <div class="max-w-4xl mx-auto">
        <Card variant="elevated">
          <div class="text-center">
            <Icon
              icon="lucide:heart"
              class="w-12 h-12 text-mh-primary mx-auto mb-4"
              aria-hidden="true"
            />
            <h3 class="font-serif font-semibold text-xl text-mh-ink mb-4">
              Would you like to share your story?
            </h3>
            <p class="text-mh-muted mb-6 leading-relaxed">
              If our services have made a positive impact on your family, we would be honored 
              if you would consider sharing your experience to help other families know what 
              to expect. All testimonials are completely voluntary and shared only with your 
              explicit written consent.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <CTAButton
                to="/contact"
                variant="primary"
                icon-left="lucide:pen"
              >
                Share Your Story
              </CTAButton>
              
              <CTAButton
                :href="`mailto:${siteData.email}?subject=Testimonial Inquiry`"
                variant="outline"
                icon-left="lucide:mail"
              >
                Email Us
              </CTAButton>
            </div>
          </div>
        </Card>
      </div>
    </Section>

    <!-- Call to Action -->
    <Section
      title="Ready to Start Your Journey?"
      description="Join the families who have found support, growth, and healing through our services."
      background="primary"
    >
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <CTAButton
          to="/contact"
          variant="secondary"
          size="lg"
          icon-left="lucide:calendar"
        >
          Schedule Consultation
        </CTAButton>
        
        <CTAButton
          :href="`tel:${siteData.phone}`"
          variant="accent"
          size="lg"
          icon-left="lucide:phone"
        >
          Call {{ siteData.phone }}
        </CTAButton>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Hero from '@/components/Hero.vue'
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'
import CTAButton from '@/components/CTAButton.vue'
import Icon from '@/components/Icon.vue'
import { useSeo, generatePageMeta } from '@/composables/useSeo'
import { siteData } from '@/data/site'
import { getInitials } from '@/utils/formatters'

// SEO Setup
const seoMeta = generatePageMeta(
  'Client Testimonials',
  'Read testimonials from families who have received care from our early childhood mental health practice.',
  '/testimonials',
  {
    keywords: 'testimonials, reviews, client experiences, success stories, family feedback'
  }
)

useSeo(seoMeta)

const showFullNames = ref(false)

function toggleNameDisplay() {
  showFullNames.value = !showFullNames.value
}

// Testimonials data - TODO: Replace with actual client testimonials
const testimonials = [
  {
    id: '1',
    content: 'The support we received helped our family through a very difficult time. Our therapist understood our child\'s needs and gave us practical tools that really worked. We saw positive changes within just a few weeks.',
    name: 'Sarah Martinez',
    relationship: 'Parent of 4-year-old',
    location: 'Local Family'
  },
  {
    id: '2',
    content: 'I was worried about finding someone who would understand our family\'s cultural background. The care we received was respectful and tailored to our values. Our daughter is now more confident and happy.',
    name: 'Maria Gonzalez',
    relationship: 'Parent of 6-year-old',
    location: 'Local Family'
  },
  {
    id: '3',
    content: 'The play therapy sessions helped our daughter express her feelings in ways she couldn\'t with words. The whole family learned better communication skills. We\'re so grateful for this support.',
    name: 'Jennifer Lee',
    relationship: 'Parent of 3-year-old',
    location: 'Local Family'
  },
  {
    id: '4',
    content: 'As a single parent, I felt overwhelmed by my son\'s behavioral challenges. The parent coaching gave me confidence and practical strategies. Our relationship is stronger than ever.',
    name: 'Michael Johnson',
    relationship: 'Single father of 5-year-old',
    location: 'Local Family'
  },
  {
    id: '5',
    content: 'The assessment helped us understand our child\'s needs better than any previous evaluation. The recommendations were clear, practical, and made a real difference in our daily life.',
    name: 'Rachel & David Kim',
    relationship: 'Parents of 4-year-old',
    location: 'Local Family'
  },
  {
    id: '6',
    content: 'Our family went through a difficult divorce, and our children were struggling. The family therapy sessions helped us all communicate better and put the kids\' needs first.',
    name: 'Lisa Thompson',
    relationship: 'Co-parent of 6 & 8-year-olds',
    location: 'Local Family'
  },
  {
    id: '7',
    content: 'When our daughter was diagnosed with autism, we felt lost. The support and guidance we received helped us advocate for her and celebrate her unique strengths.',
    name: 'Amanda Rodriguez',
    relationship: 'Parent of 5-year-old',
    location: 'Local Family'
  },
  {
    id: '8',
    content: 'The social skills group was perfect for our shy son. He made friends and gained confidence in a safe, supportive environment. He looks forward to going each week.',
    name: 'Kevin Chen',
    relationship: 'Parent of 7-year-old',
    location: 'Local Family'
  },
  {
    id: '9',
    content: 'Sleep issues were affecting our whole family. The strategies we learned helped our daughter develop healthy sleep habits. We\'re all sleeping better now!',
    name: 'Nicole Wilson',
    relationship: 'Parent of 3-year-old',
    location: 'Local Family'
  }
]</script>

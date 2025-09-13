// Set your desired date here
const targetDate = new Date(2025, 10, 9, 18, 0) // Year, Month (0-11), Day, Hour, Minute
// Or use: const targetDate = new Date('2025-08-10');

const calendarOptions = [
  {
    name: 'Google Calendar',
    icon: 'assets/google-calendar.svg',
    handler: 'addToGoogleCalendar',
  },
  {
    name: 'Outlook',
    icon: 'assets/outlook.svg',
    handler: 'addToOutlook',
  },
  {
    name: 'Apple Calendar',
    icon: 'assets/apple_calendar_(iOS).png',
    handler: 'addToAppleCalendar',
  },
]

function toggleCalendarDropdown() {
  const button = document.getElementById('calendarButton')
  const isExpanded = button.getAttribute('aria-expanded') === 'true'

  if (isExpanded) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

function openDropdown() {
  const button = document.getElementById('calendarButton')
  const menu = document.getElementById('calendarMenu')
  const menuItems = menu.querySelectorAll('[role="menuitem"]')

  button.setAttribute('aria-expanded', 'true')
  menu.setAttribute('aria-hidden', 'false')

  // Focus first menu item
  if (menuItems.length > 0) {
    menuItems[0].focus()
  }
}

function closeDropdown() {
  const button = document.getElementById('calendarButton')
  const menu = document.getElementById('calendarMenu')

  button.setAttribute('aria-expanded', 'false')
  menu.setAttribute('aria-hidden', 'true')
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
  const dropdown = document.querySelector('.calendar-dropdown')
  if (!dropdown.contains(event.target)) {
    closeDropdown()
  }
})

function formatDateForGoogle(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function formatDateForOutlook(date) {
  return date.toISOString()
}

function formatDateForICS(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function addToGoogleCalendar(event) {
  event.preventDefault()
  const startTime = formatDateForGoogle(eventDetails.start)
  const endTime = formatDateForGoogle(
    new Date(eventDetails.start.getTime() + 3600000)
  ) // Add 1 hour

  const url =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(eventDetails.title)}` +
    `&dates=${startTime}/${endTime}` +
    `&details=${encodeURIComponent(eventDetails.description)}` +
    `&location=${encodeURIComponent(eventDetails.location)}`

  window.open(url, '_blank')
  closeDropdown()
}

function addToOutlook(event) {
  event.preventDefault()
  const startTime = formatDateForOutlook(eventDetails.start)
  const endTime = formatDateForOutlook(
    new Date(eventDetails.start.getTime() + 3600000)
  )

  const url =
    `https://outlook.live.com/calendar/0/deeplink/compose?` +
    `subject=${encodeURIComponent(eventDetails.title)}` +
    `&startdt=${startTime}` +
    `&enddt=${endTime}` +
    `&body=${encodeURIComponent(eventDetails.description)}` +
    `&location=${encodeURIComponent(eventDetails.location)}`

  window.open(url, '_blank')
  closeDropdown()
}

function addToAppleCalendar(event) {
  event.preventDefault()
  const startTime = formatDateForICS(eventDetails.start)
  const endTime = formatDateForICS(
    new Date(eventDetails.start.getTime() + 3600000)
  )

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Your Company//Your App//EN',
    'BEGIN:VEVENT',
    `DTSTART:${startTime}`,
    `DTEND:${endTime}`,
    `SUMMARY:${eventDetails.title}`,
    `DESCRIPTION:${eventDetails.description}`,
    `LOCATION:${eventDetails.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'event.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  closeDropdown()
}

const weddingEvents = [
  { time: '6:00 PM', title: 'Đón khách' },
  { time: '7:00 PM', title: 'Lễ' },
  { time: '7:30 PM', title: 'Nhập tiệc' },
  { time: '8:15 PM', title: 'Mini game và giao lưu' },
]

function createTimeline() {
  // const container = document.getElementsByClassName('timeline-events')[0]
  // weddingEvents.forEach((event) => {
  //   const timelineItem = document.createElement('li')
  //   timelineItem.className = 'timeline-item'
  //   timelineItem.innerHTML = `
  //                 <div class="event-circle"></div>
  //                 <div class="event-box">
  //                     <div class="event-time">${event.time}</div>
  //                     <div class="event-title">${event.title}</div>
  //                 </div>
  //               `
  //   container.appendChild(timelineItem)
  // })
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in')
    }
  })
})

observer.observe(document.querySelector('.divider'))

function envelop() {
  const envelopeOverlay = document.getElementById('envelopeOverlay')
  if (!envelopeOverlay) return
  const envelopeContainer = document.getElementById('envelopeContainer')

  function createSparkles(x, y) {
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('div')
      sparkle.className = 'sparkle'
      sparkle.style.left = x - 3 + 'px'
      sparkle.style.top = y - 3 + 'px'
      sparkle.style.animationDelay = i * 0.15 + 's'
      sparkle.style.animation = 'sparkleFloat 2s ease-out forwards'

      // Random direction
      const angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
      const distance = 40 + Math.random() * 40
      const dx = Math.cos(angle) * distance
      const dy = Math.sin(angle) * distance

      sparkle.style.transform += ` translate(${dx}px, ${dy}px)`

      document.body.appendChild(sparkle)

      setTimeout(() => {
        sparkle.remove()
      }, 2000)
    }
  }

  envelopeContainer.addEventListener('click', function (e) {
    // Prevent multiple clicks during animation
    if (envelopeContainer.classList.contains('opening')) return

    // Add opening class for envelope animation
    envelopeContainer.classList.add('opening')

    // Create sparkle effect at envelope center
    const rect = envelopeContainer.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2 - 20
    createSparkles(x, y)

    // Wait for envelope opening animation, then reveal website
    setTimeout(() => {
      envelopeOverlay.classList.add('revealed')
    }, 1500)

    // Remove overlay from DOM after full animation
    setTimeout(() => {
      envelopeOverlay.remove()
    }, 2500)
  })
}

document
  .getElementById('attendance-options')
  .addEventListener('change', (e) => {
    if (!e.target.name || e.target.name !== 'attendance') return
    const isAttending = e.target.value === 'yes'

    document
      .querySelectorAll('.attending-dependent, .submit-button')
      .forEach((el) => el.classList.toggle('hidden', !isAttending))

    document
      .querySelectorAll('.not-attending-dependent')
      .forEach((el) => el.classList.toggle('hidden', isAttending))
  })

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxFtrHSyY4WYMN4EceFpdRdSq2vBoldJJGwpmdM1DAd7CJl18w2WaZ8aUJptiqjwjXQ/exec'

document
  .getElementById('contactForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault()

    const responseDiv = document.getElementById('responseMessage')
    const submitButton = e.target.querySelector('button[type="submit"]')

    // Show loading state
    submitButton.disabled = true
    submitButton.textContent = 'Sending...'
    responseDiv.innerHTML =
      '<div class="message loading">Sending your message...</div>'

    try {
      // Collect form data
      const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone-number').value,
        message: document.getElementById('message').value,
      }

      // Send to Google Apps Script
      const response = await fetch(SCRIPT_URL, {
        redirect: 'follow',
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        responseDiv.innerHTML =
          '<div class="message success">Message sent successfully!</div>'
        document.getElementById('contactForm').reset()
      } else {
        throw new Error(result.error || 'Unknown error occurred')
      }
    } catch (error) {
      console.error('Error:', error)
      responseDiv.innerHTML =
        '<div class="message error">Error sending message. Please try again.</div>'
    } finally {
      // Reset button
      submitButton.disabled = false
      submitButton.textContent = 'Send Message'
    }
  })

// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  envelop()
  // Repeat the animation every 2.5 seconds
  createTimeline()
})

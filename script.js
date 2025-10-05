// Validate that at least one location checkbox is selected
function validateLocationCheckboxes() {
  const checkboxes = document.querySelectorAll(
    'input[name="attending-location"]'
  )
  const isAnyChecked = Array.from(checkboxes).some((cb) => cb.checked)

  checkboxes.forEach((cb) => {
    if (!isAnyChecked) {
      cb.setCustomValidity('Vui lòng chọn ít nhất một địa điểm')
    } else {
      cb.setCustomValidity('')
    }
  })

  // If at least one is checked, make sure to report validity to clear any previous error messages
  if (isAnyChecked) {
    checkboxes[0].reportValidity()
  }
}

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

function hamburgerMenuToggle() {
  const hamburger = document.getElementById('hamburger')
  const navPanel = document.getElementById('nav-panel')

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open')
    navPanel.classList.toggle('nav-active')
  })
}

function updateEventDisplay(location) {
  const details = eventDetails[location]
  const dateString = details.start.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const timeString = details.start.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })

  // Update displayed date and time
  // document.querySelector('.date').textContent = dateString
  document.querySelector('.paper-bg p:nth-child(2)').textContent = dateString
  document.querySelector('#event-time').textContent = `Vào lúc ${timeString}`
  document.querySelector(
    '#event-location'
  ).textContent = `Tại ${details.locationShortName}`

  // Update address link
  const addressLink = document.querySelector('.address')
  const mapLink = document.getElementById('mapLink')
  if (addressLink) {
    addressLink.textContent = `${details.location}`
    if (location === 'hcm') {
      addressLink.href = 'https://maps.app.goo.gl/cREXUgRRRUrEYaaL6'
      mapLink.href = 'https://maps.app.goo.gl/cREXUgRRRUrEYaaL6'
    } else {
      addressLink.href = 'https://maps.app.goo.gl/qP3PhwiSR5HT2sYw6'
      mapLink.href = 'https://maps.app.goo.gl/qP3PhwiSR5HT2sYw6'
    }
  }

  // update image
  const eventImage = document.getElementById('locationImage')
  if (eventImage) {
    eventImage.src = details.img
    eventImage.alt = `Image for ${
      location === 'hcm' ? 'Hồ Chí Minh' : 'Chợ Mới'
    } location`
  }
}

const eventDetails = {
  title: 'Tiệc cưới Huy & Hà',
  hcm: {
    start: new Date(2025, 10, 9, 18, 0),
    location:
      'Riverside Palace, sảnh Thames, 360D Bến Vân Đồn, phường Vĩnh Hội, Tp. Hồ Chí Minh',
    locationShortName: 'Riverside Palace, sảnh Thames',
    img: 'assets/riverside2.png',
  },
  cm: {
    start: new Date(2025, 10, 15, 11, 0),
    location: 'Nhà hàng Tuấn Công, DT942, khóm Long Hoà, xã Chợ Mới, An Giang',
    locationShortName: 'Nhà hàng Tuấn Công, Chợ Mới',
    img: 'assets/tuancong.png',
  },
}
function createCalendarDropdown() {
  const menu = document.getElementById('calendarMenu')

  calendarOptions.forEach((option) => {
    const li = document.createElement('li')
    li.className = 'calendar-option'
    li.setAttribute('role', 'none')

    const link = document.createElement('a')
    link.href = '#'
    link.className = 'calendar-link'
    link.setAttribute('role', 'menuitem')
    link.setAttribute('tabindex', '-1')
    link.onclick = function (event) {
      window[option.handler](event)
    }

    const icon = document.createElement('span')
    icon.className = 'calendar-icon'
    icon.setAttribute('aria-hidden', 'true')
    const img = document.createElement('img')
    img.src = option.icon
    img.alt = option.name + ' icon'
    img.style.width = '20px'
    img.style.height = '20px'
    img.style.verticalAlign = 'middle'
    icon.appendChild(img)

    link.appendChild(icon)
    link.appendChild(document.createTextNode(option.name))
    li.appendChild(link)
    menu.appendChild(li)
  })
}

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
  const selectedLocation = document.querySelector(
    'input[name="location"]:checked'
  ).value
  const details = eventDetails[selectedLocation]

  const startTime = formatDateForGoogle(details.start)
  const endTime = formatDateForGoogle(
    new Date(details.start.getTime() + 3600000)
  ) // Add 1 hour

  const url =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(eventDetails.title)}` +
    `&dates=${startTime}/${endTime}` +
    `&location=${encodeURIComponent(details.location)}`

  window.open(url, '_blank')
  closeDropdown()
}

function addToOutlook(event) {
  event.preventDefault()
  const selectedLocation = document.querySelector(
    'input[name="location"]:checked'
  ).value
  const details = eventDetails[selectedLocation]

  const startTime = formatDateForOutlook(details.start)
  const endTime = formatDateForOutlook(
    new Date(details.start.getTime() + 3600000)
  )

  const url =
    `https://outlook.live.com/calendar/0/deeplink/compose?` +
    `subject=${encodeURIComponent(eventDetails.title)}` +
    `&startdt=${startTime}` +
    `&enddt=${endTime}` +
    `&body=${encodeURIComponent(eventDetails.description || '')}` +
    `&location=${encodeURIComponent(details.location)}`

  window.open(url, '_blank')
  closeDropdown()
}

function addToAppleCalendar(event) {
  event.preventDefault()
  const selectedLocation = document.querySelector(
    'input[name="location"]:checked'
  ).value
  const details = eventDetails[selectedLocation]

  const startTime = formatDateForICS(details.start)
  const endTime = formatDateForICS(new Date(details.start.getTime() + 3600000))

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Your Company//Your App//EN',
    'BEGIN:VEVENT',
    `DTSTART:${startTime}`,
    `DTEND:${endTime}`,
    `SUMMARY:${eventDetails.title}`,
    `DESCRIPTION:${eventDetails.description || ''}`,
    `LOCATION:${details.location}`,
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in')
    }
  })
})

observer.observe(document.querySelector('.divider'))

function envelop() {
  const alreadyOpened = localStorage.getItem('envelopeOpened')
  if (alreadyOpened === 'true') {
    const envelopeOverlay = document.getElementById('envelopeOverlay')
    if (envelopeOverlay) {
      envelopeOverlay.remove()
    }
    return
  }
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
    localStorage.setItem('envelopeOpened', 'true')

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

function removeRequiredOfChildren(container) {
  container.querySelectorAll('input, select, textarea').forEach((input) => {
    input.removeAttribute('required')
  })
}

function randomRotatePaper() {
  const papers = document.querySelectorAll('.random-rotate')
  const usedValues = new Set()
  papers.forEach((paper) => {
    let randomValue
    let lastValue = [...usedValues].pop() || 0
    do {
      randomValue = Math.random() * 4 * (lastValue >= 0 ? -1 : 1)
    } while (usedValues.has(randomValue) && randomValue !== 0)
    usedValues.add(randomValue)
    paper.style.transform = `rotate(${randomValue}deg)`
  })
}

function autoFillNameFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const nameParam = urlParams.get('name')
  if (nameParam) {
    const nameInput = document.getElementById('name')
    const name = decodeURIComponent(nameParam.replace(/\+/g, ' '))
    nameInput.value = name
    const receiverName = document.querySelector('.click-instruction')
    receiverName.textContent = `Thân mời ${nameInput.value}`
    const guessNamePlaceHolder = document.querySelector(
      '.guess-name-placeholder'
    )
    guessNamePlaceHolder.textContent = nameInput.value
  }
}

function createBankAccountDetails() {
  const detail = {
    'Tài khoản': 'Le Truong Ngoc Ha',
    'Số tài khoản': '1052576182',
    'Ngân hàng': 'Vietcombank',
  }
  const list = document.querySelector('.bank-details')
  Object.entries(detail).forEach(([key, value]) => {
    const li = document.createElement('li')
    li.className = 'margin-x-auto bank-detail-item'
    const strong = document.createElement('strong')
    strong.textContent = key + ': ' + value
    li.appendChild(strong)

    const copyBtn = document.createElement('button')
    copyBtn.className = 'material-symbols-outlined copy-button'
    copyBtn.textContent = 'content_copy'
    copyBtn.addEventListener('click', () => copyToClipboard(copyBtn, value))
    li.appendChild(copyBtn)

    list.appendChild(li)
  })
}

function copyToClipboard(btn, text) {
  navigator.clipboard.writeText(text).then(
    () => {
      showCopiedNotification(btn)
    },
    (err) => {
      console.error('Could not copy text: ', err)
    }
  )
}

function showCopiedNotification(button) {
  // Remove any existing notification
  const existingNotification = document.querySelectorAll('.notification')
  existingNotification.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement('div')
  notification.className = 'notification'
  notification.textContent = 'Copied!'

  // Position the notification above the button
  notification.style.bottom = '40%'
  notification.style.left = '50%'
  notification.style.transform = 'translateX(-50%) translateY(-10px)'
  notification.style.marginBottom = '10px'

  // Add notification to button (relative positioning)
  button.appendChild(notification)

  // Show notification with animation
  setTimeout(() => {
    notification.classList.add('show')
  }, 10)

  // Hide and remove notification after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300) // Wait for fade out animation
  }, 1500)
}

document
  .getElementById('attendance-options')
  .addEventListener('change', (e) => {
    if (!e.target.name || e.target.name !== 'attendance') return
    const isAttending = e.target.value === 'yes'

    document
      .querySelectorAll('.submit-button')
      .forEach((el) => el.classList.toggle('hidden', false))

    document.querySelectorAll('.attending-dependent').forEach((el) => {
      el.classList.toggle('hidden', !isAttending)
      if (!isAttending) {
        removeRequiredOfChildren(el)
      } else {
        // If attending, make sure at least one location is required
        const checkboxes = el.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach((cb) => {
          cb.addEventListener('change', validateLocationCheckboxes)
        })
      }
    })

    document.querySelectorAll('.not-attending-dependent').forEach((el) => {
      el.classList.toggle('hidden', isAttending)
      if (isAttending) {
        removeRequiredOfChildren(el)
      }
    })
  })

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxuF6PhXVOHjtZOkkn2pccVAzao1TXtsFIicR_ACzGdyJdDUSdwijOzddoMuiXUHoZO/exec'

document
  .getElementById('contactForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault()

    // Check if user is attending and validate location selection
    const isAttending =
      document.querySelector('input[name="attendance"]:checked')?.value ===
      'yes'
    if (isAttending) {
      const checkboxes = document.querySelectorAll(
        'input[name="attending-location"]'
      )
      const isAnyChecked = Array.from(checkboxes).some((cb) => cb.checked)
      if (!isAnyChecked) {
        checkboxes[0].setCustomValidity('Vui lòng chọn ít nhất một địa điểm')
        checkboxes[0].reportValidity()
        return
      }
    }

    const responseDiv = document.getElementById('responseMessage')
    const submitButton = e.target.querySelector('button[type="submit"]')

    // Show loading state
    submitButton.disabled = true
    submitButton.textContent = 'Đang gửi lời nhắn..'

    try {
      // Collect form data
      const locations = Array.from(
        document.querySelectorAll('input[name="attending-location"]:checked')
      )
        .map((cb) => cb.value)
        .join(', ')

      const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone-number').value,
        attendance:
          document.querySelector('input[name="attendance"]:checked')?.value ||
          '',
        attendingLocations: locations,
        message: document.getElementById('message')?.value || '',
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
        submitButton.textContent = 'Gửi lời nhắn thành công! Cảm ơn bạn'
      } else {
        submitButton.disabled = false
        submitButton.textContent = 'Lỗi gửi lời nhắn, thử lại?'
        throw new Error(result.error || 'Unknown error occurred')
      }
    } catch (error) {
      console.error('Error:', error)
      // responseDiv.innerHTML =
      //   '<div class="message error">Error sending message. Please try again.</div>'
      submitButton.disabled = false
      submitButton.textContent = 'Lỗi gửi lời nhắn, thử lại?'
    } finally {
      return false
    }
  })
// Location selection handler
document.getElementById('location-options')?.addEventListener('change', (e) => {
  if (!e.target.name || e.target.name !== 'location') return
  updateEventDisplay(e.target.value)
})

// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  autoFillNameFromUrl()
  envelop()
  createCalendarDropdown()
  randomRotatePaper()
  hamburgerMenuToggle()
  updateEventDisplay('hcm')
  createBankAccountDetails()
})

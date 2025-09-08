// Set your desired date here
const targetDate = new Date(2025, 10, 9, 18, 0) // Year, Month (0-11), Day, Hour, Minute
// Or use: const targetDate = new Date('2025-08-10');

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function displayCalendar(date) {
  const calendarGridEl = document.getElementById('calendarGrid')

  // Clear calendar grid
  calendarGridEl.innerHTML = ''

  // Add day headers
  dayNames.forEach((day) => {
    const header = document.createElement('div')
    header.className = 'day-header'
    header.textContent = day
    calendarGridEl.appendChild(header)
  })

  // Get first day of month and calculate starting date
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  // Generate calendar days
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)

    const dayCell = document.createElement('div')
    dayCell.className = 'day-cell'

    // Only show dates for current month
    if (currentDate.getMonth() === date.getMonth()) {
      dayCell.textContent = currentDate.getDate()

      // Mark selected date
      if (currentDate.toDateString() === targetDate.toDateString()) {
        dayCell.classList.add('selected-date')
      }
    }

    calendarGridEl.appendChild(dayCell)
  }
}

const heartPath = `M1907.077,623.957c-7.101-50.137-23.803-99.099-48.806-143.131c-69.212-122.899-202.469-205.261-342.732-215.692
c-171.634-13.137-353.376,80.583-421.922,240.928c-0.811,1.953-1.594,3.922-2.363,5.897
c-16.566-49.396-39.517-96.63-71.107-139.012c-68.567-93.198-180.972-156.408-298.389-155.517
c-71.343-0.13-141.959,20.619-203.416,56.365c-94.805,54.402-160.846,142.236-195.136,245.098
c-52.665,165.96-42.61,345.635,14.526,508.365c56.27,158.434,161.254,297.184,289.169,404.657
c71.421,60.754,152.256,114.557,245.384,133.342c17.029,3.009,28.09-17.229,17.02-29.863c-5.776-6.665-12.016-13.091-18.165-19.229
c-56.013-56.551-119.935-104.78-177.527-158.861C506.717,1181.782,400.501,938.069,431.95,680.964
c10.058-86.793,35.089-171.062,94.389-235.475c52.092-55.504,127.221-91.948,203.356-92.293
c79.492,0.553,168.944,34.491,228.991,85.745c36.003,30.673,91.267,101.9,115.442,152.345c7.838,16.356,25.872,12.91,34.839,0.012
c7.528-10.812,19.471-28.839,26.643-37.866c90.292-112.164,242.564-172.678,383.661-149.864
c76.393,13.61,147.442,57.757,191.767,121.65c34.469,49.06,50.334,108.641,46.841,168.362
c-12.014,278.608-281.102,522.53-466.215,713.44c-149.127,154.103-349.689,332.482-378.879,556.053
c-1.11,20.284,23.159,25.675,32.427,11.774c61.106-88.489,133.257-165.095,208.583-241.54
c113.7-117.972,237.446-226.411,355.996-340.573c144.998-141.378,288.238-294.534,360.88-488.172
C1903.085,815.791,1919.477,718.441,1907.077,623.957z`

// Function to inject animated heart SVG into .selected-date
function injectHeartAnimation() {
  document.querySelectorAll('.selected-date').forEach((el) => {
    // Remove old SVG if exists (to restart animation)
    const old = el.querySelector('.heart-anim')
    if (old) old.remove()

    // Create SVG element
    const svgNS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('class', 'heart-anim')
    svg.setAttribute('viewBox', '0 0 2200 2200')
    svg.setAttribute('width', '4em')
    svg.setAttribute('height', '4em')
    svg.style.position = 'absolute'
    svg.style.left = '50%'
    svg.style.top = '50%'
    svg.style.transform = 'translate(-50%, -50%)'
    svg.style.pointerEvents = 'none'
    svg.style.zIndex = '-1'

    // Create path
    const path = document.createElementNS(svgNS, 'path')
    path.setAttribute('d', heartPath)
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke', '#690f0f')
    path.setAttribute('stroke-width', '80')
    path.setAttribute('stroke-linecap', 'round')
    path.setAttribute('stroke-linejoin', 'round')

    // Animation: set dasharray and dashoffset
    path.setAttribute('stroke-dasharray', '8000')
    path.setAttribute('stroke-dashoffset', '8000')
    path.style.animation = 'heart-draw 3s cubic-bezier(0.77,0,0.175,1) forwards'

    // Append path to SVG, SVG to element
    svg.appendChild(path)
    el.style.position = 'relative'
    el.appendChild(svg)
  })
}

const calendarOptions = [
  {
    name: 'Google Calendar',
    icon: '🗓️',
    handler: 'addToGoogleCalendar',
  },
  {
    name: 'Outlook',
    icon: '📧',
    handler: 'addToOutlook',
  },
  {
    name: 'Apple Calendar',
    icon: '🍎',
    handler: 'addToAppleCalendar',
  },
]

// Event details - customize these for your event
const eventDetails = {
  title: 'Dam cuoi Huy va Ha',
  start: targetDate, // December 15, 2024, 2:00 PM UTC
  description:
    'Monthly team meeting to discuss project updates and next steps.',
  location: '360D Bến Vân Đồn, phường Vĩnh Hội, Tp. Hồ Chí Minh, sảnh Thames',
}

// Generate calendar options on page load
document.addEventListener('DOMContentLoaded', function () {
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
    icon.textContent = option.icon

    link.appendChild(icon)
    link.appendChild(document.createTextNode(option.name))
    li.appendChild(link)
    menu.appendChild(li)
  })
})

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
  button.focus()
}

// Keyboard navigation
document.addEventListener('keydown', function (e) {
  const menu = document.getElementById('calendarMenu')
  const isOpen = menu.getAttribute('aria-hidden') === 'false'

  if (!isOpen) return

  const menuItems = Array.from(menu.querySelectorAll('[role="menuitem"]'))
  const currentIndex = menuItems.indexOf(document.activeElement)

  switch (e.key) {
    case 'Escape':
      e.preventDefault()
      closeDropdown()
      break
    case 'ArrowDown':
      e.preventDefault()
      const nextIndex =
        currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0
      menuItems[nextIndex].focus()
      break
    case 'ArrowUp':
      e.preventDefault()
      const prevIndex =
        currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1
      menuItems[prevIndex].focus()
      break
    case 'Home':
      e.preventDefault()
      menuItems[0].focus()
      break
    case 'End':
      e.preventDefault()
      menuItems[menuItems.length - 1].focus()
      break
  }
})

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

function animateDrawing(svgPath) {
  const pathLength = svgPath.getTotalLength()

  svgPath.style.strokeDasharray = pathLength
  svgPath.style.strokeDashoffset = pathLength
  svgPath.style.animation = `drawPath 2s ease-out forwards`

  // Add the keyframe if not already defined
  if (!document.querySelector('#draw-keyframes')) {
    const style = document.createElement('style')
    style.id = 'draw-keyframes'
    style.textContent = `
      @keyframes drawPath {
        to { stroke-dashoffset: 0; }
      }
    `
    document.head.appendChild(style)
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in')
    }
  })
})

observer.observe(document.querySelector('.divider'))


// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  injectHeartAnimation()
  // Repeat the animation every 2.5 seconds
  setInterval(injectHeartAnimation, 2500)
  createTimeline()
  displayCalendar(targetDate)
  const path = document.querySelector('.draw-path')
  animateDrawing(path)
})

// Display the calendar for the specified date

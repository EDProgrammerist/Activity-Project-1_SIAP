document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const header = document.querySelector(".header")
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        header.classList.toggle("mobile-menu-open")
      })
    }
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          // Close mobile menu if open
          header.classList.remove("mobile-menu-open")
  
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Animate elements on scroll
    const animateItems = document.querySelectorAll(".animate-item")
  
    function checkScroll() {
      animateItems.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (itemTop < windowHeight * 0.85) {
          item.classList.add("active")
        }
      })
    }
  
    // Initial check
    checkScroll()
  
    // Check on scroll
    window.addEventListener("scroll", checkScroll)
  
    // Animate skill progress circles
    const skillCircles = document.querySelectorAll(".skill-circle-progress")
  
    function animateSkills() {
      skillCircles.forEach((circle) => {
        const progress = circle.parentElement.dataset.progress
        circle.style.setProperty("--progress", progress)
      })
    }
  
    // Testimonial slider
    const testimonialsTrack = document.querySelector(".testimonials-track")
    const testimonialCards = document.querySelectorAll(".testimonial-card")
    const prevBtn = document.querySelector(".testimonial-prev")
    const nextBtn = document.querySelector(".testimonial-next")
    const dots = document.querySelectorAll(".testimonial-dot")
  
    if (testimonialsTrack && testimonialCards.length > 0) {
      let currentIndex = 0
      const cardWidth =
        testimonialCards[0].offsetWidth + Number.parseInt(getComputedStyle(testimonialCards[0]).marginLeft) * 2
  
      function updateSlider() {
        testimonialsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`
  
        // Update dots
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentIndex)
        })
      }
  
      // Next button
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % testimonialCards.length
          updateSlider()
        })
      }
  
      // Previous button
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length
          updateSlider()
        })
      }
  
      // Dot navigation
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          currentIndex = index
          updateSlider()
        })
      })
  
      // Auto slide
      setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCards.length
        updateSlider()
      }, 5000)
    }
  
    // Contact form submission
    const contactForm = document.getElementById("contact-form")
    const formSuccess = document.getElementById("form-success")
    const sendAnother = document.getElementById("send-another")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simulate form submission
        setTimeout(() => {
          formSuccess.classList.add("active")
        }, 1000)
      })
    }
  
    if (sendAnother) {
      sendAnother.addEventListener("click", () => {
        formSuccess.classList.remove("active")
        contactForm.reset()
      })
    }
  
    // Dark mode toggle
    const body = document.body
  
    // Create dark mode toggle button
    const themeToggle = document.createElement("div")
    themeToggle.className = "theme-toggle"
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    document.body.appendChild(themeToggle)
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      body.classList.add("dark")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  
    // Toggle theme
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark")
  
      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
      } else {
        localStorage.setItem("theme", "light")
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
      }
    })
  
    // Initialize animations
    animateSkills()
  })
  
  
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("background-canvas")
    const ctx = canvas.getContext("2d")
  
    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
  
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = getComputedStyle(document.documentElement).getPropertyValue("--primary")
      }
  
      update() {
        this.x += this.speedX
        this.y += this.speedY
  
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
  
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }
  
      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  
    // Create particles
    const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 10000))
    const particles = []
  
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  
    // Connect particles with lines
    function connectParticles() {
      const maxDistance = 150
  
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
  
          if (distance < maxDistance) {
            // Set opacity based on distance
            const opacity = 1 - distance / maxDistance
  
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }
  
    // Mouse interaction
    const mouse = {
      x: null,
      y: null,
      radius: 150,
    }
  
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y
    })
  
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
  
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x
          const dy = particles[i].y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)
  
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouse.radius - distance) / mouse.radius
  
            particles[i].x += forceDirectionX * force * 5
            particles[i].y += forceDirectionY * force * 5
          }
        }
      }
  
      connectParticles()
      requestAnimationFrame(animate)
    }
  
    // Check if dark mode is active and update particle colors
    function updateColors() {
      const isDark = document.body.classList.contains("dark")
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()
  
      particles.forEach((particle) => {
        particle.color = primaryColor
      })
    }
  
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateColors()
        }
      })
    })
  
    observer.observe(document.body, { attributes: true })
  
    // Start animation
    animate()
  
    // Update colors initially
    updateColors()
  })
  
  
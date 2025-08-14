document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.6,
            ease: "power2.out"
        });
    });
    
    // Magnetic Buttons
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const position = button.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
            
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)"
            });
            
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });
    
    // Floating Particles
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Room Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            
            roomCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-type') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Restaurant Tabs
    const restaurantTabs = document.querySelectorAll('.restaurant-tab');
    const restaurantContents = document.querySelectorAll('.restaurant-content');
    
    restaurantTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const restaurant = tab.getAttribute('data-restaurant');
            
            restaurantTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            restaurantContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${restaurant}-restaurant`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 7000);
    
    // Booking Form - Save to localStorage
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        // Load saved form data
        const savedFormData = JSON.parse(localStorage.getItem('bookingFormData')) || {};
        
        Object.keys(savedFormData).forEach(key => {
            const input = bookingForm.querySelector(`#${key}`);
            if (input) input.value = savedFormData[key];
        });
        
        // Save form data on input change
        bookingForm.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
                const formData = {
                    name: bookingForm.querySelector('#name').value,
                    email: bookingForm.querySelector('#email').value,
                    phone: bookingForm.querySelector('#phone').value,
                    subject: bookingForm.querySelector('#subject').value,
                    message: bookingForm.querySelector('#message').value
                };
                localStorage.setItem('bookingFormData', JSON.stringify(formData));
            }
        });
        
        // Form submission
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this demo, we'll just show an alert and clear the form
            alert('Thank you for your message! We will contact you soon.');
            bookingForm.reset();
            localStorage.removeItem('bookingFormData');
        });
    }
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize date inputs with tomorrow's date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        checkInInput.value = formatDate(tomorrow);
        checkOutInput.value = formatDate(new Date(tomorrow.setDate(tomorrow.getDate() + 1)));
        
        checkInInput.min = formatDate(today);
        checkOutInput.min = formatDate(new Date(tomorrow.setDate(tomorrow.getDate() + 1)));
    }
    
    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initialize on load
    
    // Parallax effect for images
    function initParallax() {
        const parallaxImages = document.querySelectorAll('.parallax-image');
        
        parallaxImages.forEach(image => {
            image.parentElement.addEventListener('mousemove', (e) => {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                image.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
            });
            
            image.parentElement.addEventListener('mouseleave', () => {
                image.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    initParallax();
    
    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate hero elements
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
    });
    
    gsap.from('.hero-content p', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.booking-widget', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.1,
        ease: "power3.out"
    });
    
    // Animate floating elements
    gsap.to('.floating-element.el-1', {
        y: -50,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    gsap.to('.floating-element.el-2', {
        y: 50,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    gsap.to('.floating-element.el-3', {
        y: -30,
        x: 30,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Section animations with ScrollTrigger
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });
    });
    
    // Room card animations
    gsap.utils.toArray('.room-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out"
        });
    });
    
    // Amenity card animations
    gsap.utils.toArray('.amenity-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out"
        });
    });
    
    // Package card animations
    gsap.utils.toArray('.package-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out"
        });
    });
});
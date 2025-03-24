// Wait for everything to load
window.addEventListener('load', () => {
  // Hide loader
  document.querySelector('.loader-wrapper').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.loader-wrapper').style.display = 'none';
  }, 800);
  
  let scroll = new LocomotiveScroll({
    el: document.querySelector('#scroll-container'),
    smooth: true,
    multiplier: .8,
    smartphone: {
      smooth: true
    },
    tablet: {
      smooth: true
    }
  });

  const handleResize = () => {
    const desiredType = 'vertical' // 'horizontal' or 'vertical'
    if (scroll.direction !== desiredType) {
      scroll.destroy()
      let scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: .8,
        smartphone: {
          smooth: true
        },
        tablet: {
          smooth: true
        }
      });
    }
  }

  scroll.on('scroll', () => {
    // Triggering a manual update for the sticky element to sync with Locomotive scroll
    const navbar = document.querySelector('.navbar');
    navbar.style.position = 'sticky'; // Ensuring sticky positioning
  });

  const anchorLinks = document.querySelectorAll('.fixed-nav .location');

  anchorLinks.forEach((anchorLink) => {
    let hashval = anchorLink.getAttribute('href');
    let target = document.querySelector(hashval);

    anchorLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      locomotiveScroll.scrollTo(target);
    });
  });
  
  // Show content after loader is hidden
  document.querySelector('.smooth-scroll').classList.add('visible');
  
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('toggle-animate');
    mobileMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('toggle-animate');
      mobileMenu.classList.remove('active');
    });
  });
  
  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved user preference or use system preference
  if (localStorage.getItem('darkMode') === 'enabled' || 
      (prefersDarkScheme.matches && !localStorage.getItem('darkMode'))) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
  
  // Read more functionality for project cards
  document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      const fullDescription = card.querySelector('.full-description');
      const description = card.querySelector('.project-description');
      
      if (fullDescription.style.display === 'none' || !fullDescription.style.display) {
        fullDescription.style.display = 'block';
        description.style.display = 'none';
        e.target.textContent = 'Show Less';
      } else {
        fullDescription.style.display = 'none';
        description.style.display = 'block';
        e.target.textContent = 'Details';
      }
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      document.querySelector('.navbar').classList.add('scrolled');
    } else {
      document.querySelector('.navbar').classList.remove('scrolled');
    }
  });
  
  

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate in
  document.querySelectorAll('.project-card, .about-text').forEach(el => {
    observer.observe(el);
  });
});
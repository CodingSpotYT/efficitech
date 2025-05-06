// Wait for everything to load
window.addEventListener('load', () => {
  // Hide loader
  document.querySelector('.loader-wrapper').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.loader-wrapper').style.display = 'none';
  }, 800);
  
  let scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: .5,
    smartphone: {
      smooth: true
    },
    tablet: {
      smooth: true
    }
  });

  scroll.update()

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

  const anchorLinks = document.querySelectorAll(
    'a[href^=\\#]:not([href$=\\#])'
  );

  anchorLinks.forEach((anchorLink) => {
    let hashval = anchorLink.getAttribute('href');
    let target = document.querySelector(hashval);

    anchorLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      anchorLinks.forEach((anchorLink) => {
        anchorLink.classList.remove('active');
      });

      e.target.classList.add('active');

      scroll.scrollTo(target);
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
  
  // Disclaimer modal functionality
  const disclaimerBtn = document.getElementById('disclaimerBtn');
  const disclaimerModal = document.getElementById('disclaimerModal');
  const closeModal = document.getElementById('closeModal');
  
  disclaimerBtn.addEventListener('click', () => {
    disclaimerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  closeModal.addEventListener('click', () => {
    disclaimerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside
  disclaimerModal.addEventListener('click', (e) => {
    if (e.target === disclaimerModal) {
      disclaimerModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
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
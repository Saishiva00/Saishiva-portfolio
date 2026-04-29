/**
 * ==============================================================================
 * Sai Shiva Portfolio - Core JavaScript Functionality 
 * ==============================================================================
 * This script handles all interactive logic across the portfolio, written with 
 * clean architecture and modern JavaScript features (ES6+).
 * Beginner note: Methods are grouped into highly legible functions.
 */
document.addEventListener('DOMContentLoaded', () => {
  /** 
   * 1. Loader Overlay Handler 
   * Gracefully removes the loading screen after the initial HTML/CSS is parsed.
   */
  const loaderEl = document.getElementById('loader');
  if (loaderEl) {
    // We add a slight artificial delay (600ms) to ensure animations load smoothly
    setTimeout(() => {
      loaderEl.classList.add('hidden');
    }, 600);
  }
  /** 
   * 2. Theme Toggle (Dark / Light Mode)
   * Toggles the data-theme attribute on the root HTML element.
   */
  const themeToggleBtn = document.getElementById('theme-btn');
  const rootHtml = document.documentElement;
  let isDarkMode = true;
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      
      // Update HTML attribute
      rootHtml.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      
      // Update icon visual
      themeToggleBtn.innerHTML = isDarkMode 
        ? '<i class="fas fa-moon" aria-hidden="true"></i>' 
        : '<i class="fas fa-sun" aria-hidden="true"></i>';
      
      // Update accessibility label
      themeToggleBtn.setAttribute('aria-label', 
        isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'
      );
    });
  }
  /** 
   * 3. Navigation Controls (Hamburger Menu & Sticky Scroll)
   */
  const navBar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const backToTopBtn = document.getElementById('back-to-top');
  // Handle Scroll Events for Navbar styling and Back-to-Top visibility
  window.addEventListener('scroll', () => {
    // Add box shadow to nav when scrolled past 50px
    if (window.scrollY > 50) {
      navBar.classList.add('scrolled');
    } else {
      navBar.classList.remove('scrolled');
    }
    // Show Back-to-Top button when far down the page (400px+)
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });
  // Handle Back-to-Top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  // Handle Mobile Menu Toggle
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', !isOpen);
    });
    // Close menu when a link inside it is clicked
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  /** 
   * 4. Reveal Animations via Intersection Observer
   * Allows elements (like text and cards) to fade up when scrolled into view.
   */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserverOptions = { threshold: 0.15 }; // Trigger when 15% visible
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation slightly for multiple elements
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 70);
        
        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);
  revealElements.forEach(el => revealObserver.observe(el));
  /** 
   * 5. Skill Bar Animations
   * Animates the percentage bars when the user scrolls to the "Skills" section.
   */
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserverOptions = { threshold: 0.3 };
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find the inner bar element
        const progressBar = entry.target.querySelector('.skill-progress-fill');
        const targetPercentage = parseInt(entry.target.dataset.competency, 10);
        
        if (progressBar && targetPercentage) {
          // Create percentage display dynamically
          let percentageSpan = entry.target.querySelector('.skill-percentage');
          if (!percentageSpan) {
            percentageSpan = document.createElement('span');
            percentageSpan.className = 'skill-percentage';
            entry.target.appendChild(percentageSpan);
          }
          // Slight delay to sync with CSS fade-in
          setTimeout(() => {
            progressBar.style.width = targetPercentage + '%';
            
            // Animate percentage text from 0 to target
            let currentPercent = 0;
            const duration = 1500; // Matches CSS transition 1.5s
            const intervalTime = 20;
            const step = targetPercentage / (duration / intervalTime);
            
            const counter = setInterval(() => {
              currentPercent += step;
              if (currentPercent >= targetPercentage) {
                currentPercent = targetPercentage;
                clearInterval(counter);
              }
              percentageSpan.innerText = Math.round(currentPercent) + '%';
            }, intervalTime);
          }, 150);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, skillObserverOptions);
  skillCards.forEach(card => skillObserver.observe(card));
  /** 
   * 6. Hero Section Typing Effect
   * Simulates typing in the Hero banner. Expanded to cover new roles.
   */
  const typeContainer = document.getElementById('typed-container');
  if (typeContainer) {
    const rolePhrases = [
      'Architecting Scalable Software.',
      'Mining Data for Intelligence.',
      'Hardening Critical Security.',
      'Deploying Low-Code Solutions.',
      'Solving Enterprise Problems.'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    function executeTyping() {
      const currentPhrase = rolePhrases[currentPhraseIndex];
      
      if (!isDeleting) {
        // Typing letters forward
        typeContainer.textContent = currentPhrase.slice(0, ++currentCharIndex);
        
        // If finished typing phrase, wait then delete
        if (currentCharIndex === currentPhrase.length) {
          setTimeout(() => {
            isDeleting = true;
            executeTyping();
          }, 2500); // 2.5 second pause at the end of word
          return;
        }
      } else {
        // Deleting letters backward
        typeContainer.textContent = currentPhrase.slice(0, --currentCharIndex);
        
        // If finished deleting, move to next phrase
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % rolePhrases.length;
        }
      }
      
      // Control typing speed vs deleting speed
      const typingSpeed = isDeleting ? 40 : 80;
      setTimeout(executeTyping, typingSpeed);
    }
    
    // Start typing after initial loader finishes
    setTimeout(executeTyping, 1500);
  }
  /** 
   * 7. Mock Form Submission (Contact Section)
   * Replaces default form reload with a visual success indicator and resets.
   */
  const contactFormBtn = document.getElementById('contact-submit-btn');
  if (contactFormBtn) {
    contactFormBtn.addEventListener('click', function(e) {
      const form = this.closest('form');
      const inputs = form.querySelectorAll('input, textarea');
      let isValid = true;
      
      // Basic HTML5 validation check
      inputs.forEach(input => {
        if(!input.checkValidity()) isValid = false;
      });
      if (isValid) {
        e.preventDefault(); // Prevent page refresh only if valid
        
        // Show success state
        this.innerHTML = '<i class="fas fa-check-circle"></i> Securely Dispatched!';
        this.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        this.style.boxShadow = '0 8px 36px rgba(46, 204, 113, 0.4)';
        
        // Reset after 4 seconds
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-paper-plane"></i> Dispatch Message';
          this.style.background = '';
          this.style.boxShadow = '';
          form.reset(); // clear fields
        }, 4000);
      }
    });
  }
  /** 
   * 8. Active Navigation Highlighting 
   * Highlights the current section link in the top Navbar as the user scrolls.
   */
  const pageSections = document.querySelectorAll('section[id]');
  const highlightObserverOptions = { threshold: 0.45 }; // Section is 45% in view
  
  const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Clear all active states (Desktop + Mobile)
        document.querySelectorAll('.nav-links a, .mobile-link').forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active state to corresponding nav link elements
        const activeLinks = document.querySelectorAll(`.nav-links a[href="#${entry.target.id}"], .mobile-link[href="#${entry.target.id}"]`);
        activeLinks.forEach(link => link.classList.add('active'));
      }
    });
  }, highlightObserverOptions);
  pageSections.forEach(section => highlightObserver.observe(section));

  /** 
 * 9. AI Chatbot (FAQ Assistant)
 * Handles chatbot UI toggle + API communication
 */
const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

let isOpen = false;

chatToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent outside click trigger

  isOpen = !isOpen;

  if (isOpen) {
    chatWindow.classList.remove("hidden");
  } else {
    chatWindow.classList.add("hidden");
  }
});

document.addEventListener("click", (e) => {
  if (!chatWindow.contains(e.target) && !chatToggle.contains(e.target)) {
    chatWindow.classList.add("hidden");
    isOpen = false;
  }
});

chatWindow.addEventListener("click", (e) => {
  e.stopPropagation();
});

if (chatToggle && chatWindow && chatInput && chatMessages) {


  // Initial welcome message
  chatMessages.innerHTML = `
    <div class="chat-bot">Hi 👋 I'm Sai Shiva's AI assistant. Ask me anything!</div>
  `;

  // Handle user input
  chatInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const message = chatInput.value.trim();
      if (!message) return;

      // Show user message
      chatMessages.innerHTML += `
        <div class="chat-user">You: ${message}</div>
      `;

      chatInput.value = "";

      // Show typing indicator
      chatMessages.innerHTML += `
        <div class="chat-bot" id="typing">Typing...</div>
      `;

      chatMessages.scrollTop = chatMessages.scrollHeight;

      try {
        // API call
        const res = await fetch("https://ai-chatbot-backend-xqvm.onrender.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: message })
        });

        const data = await res.json();

        // Remove typing
        const typingEl = document.getElementById("typing");
        if (typingEl) typingEl.remove();

        // Show bot response
        chatMessages.innerHTML += `
          <div class="chat-bot">${data.response}</div>
        `;

      } catch (error) {
        // Handle API failure
        const typingEl = document.getElementById("typing");
        if (typingEl) typingEl.remove();

        chatMessages.innerHTML += `
          <div class="chat-bot">⚠️ Server not responding. Please try later.</div>
        `;
      }

      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
}
});

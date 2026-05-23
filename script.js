document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Preloader and Main Content Animation ---
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    const hidePreloader = () => {
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                if (mainContent) {
                    mainContent.style.opacity = '1';
                    mainContent.style.transition = 'opacity 1s ease-in';
                }
                document.body.style.overflow = ''; 
            }, 500); 
        } else {
            document.body.style.overflow = '';
        }
    };

    document.body.style.overflow = 'hidden'; 

    window.addEventListener('load', () => {
        setTimeout(hidePreloader, 800); 
    });

    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            hidePreloader();
        }
    }, 3000); 


    // --- 2. Background Music Toggle (Optimized) ---
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    
    if (musicToggle && music) {
        const musicIcon = musicToggle.querySelector('i');
        const savedMusicState = localStorage.getItem('musicEnabled');
        
        if (savedMusicState === 'true') {
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
            music.muted = true; 
            music.play().catch(e => console.log('Music autoplay blocked.'));
        } else {
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
            music.muted = true;
            music.pause();
        }

        musicToggle.addEventListener('click', () => {
            if (music.paused || music.muted) {
                music.muted = false;
                music.volume = 0.6; 
                music.play().then(() => {
                    musicIcon.classList.remove('fa-volume-mute');
                    musicIcon.classList.add('fa-volume-up');
                    localStorage.setItem('musicEnabled', 'true');
                }).catch(error => {
                    console.error("Autoplay failed on click:", error);
                    music.muted = true; 
                    musicIcon.classList.remove('fa-volume-up');
                    musicIcon.classList.add('fa-volume-mute');
                    alert("Musik tidak dapat diputar. Harap izinkan media autoplay.");
                });
            } else {
                music.pause();
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
                localStorage.setItem('musicEnabled', 'false');
            }
        });
    }


    // --- 3. Mobile Menu Toggle ---
    const hamburger = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    const toggleMenu = () => {
        if (hamburger && navLinks) {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        }
    };

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }


    // --- 4. Smooth Scrolling & Active Navbar State (Optimized) ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('#nav-links a');

    const updateActiveNav = () => {
        let currentId = '';
        const scrollPosition = window.scrollY + 80; 

        sections.forEach(section => {
            if (section.id) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentId = section.getAttribute('id');
                }
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            const targetId = a.getAttribute('href').substring(1); 
            if (targetId === currentId) {
                a.classList.add('active');
            }
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 70; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();


    // --- 5. Scroll-Based Animations (Projects, Timeline, Links, Media) ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const linkCards = document.querySelectorAll('.link-card');     // NEW: Link Pilihan
    const mediaItems = document.querySelectorAll('.media-item');   // NEW: Galeri Media

    const observerOptions = {
        root: null,
        threshold: 0.1, 
    };

    const fadeInCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const fadeInObserver = new IntersectionObserver(fadeInCallback, observerOptions);
    timelineItems.forEach(item => fadeInObserver.observe(item));
    projectCards.forEach(card => fadeInObserver.observe(card));
    linkCards.forEach(item => fadeInObserver.observe(item));      // Observe Link Cards
    mediaItems.forEach(item => fadeInObserver.observe(item));     // Observe Media Items


    // --- 6. Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isCurrentlyDarkMode = document.body.classList.contains('dark-mode');
            
            localStorage.setItem('darkMode', isCurrentlyDarkMode);

            if (isCurrentlyDarkMode) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
    
    // --- 8. Footer Year Update ---
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

});
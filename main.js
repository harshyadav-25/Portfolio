document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Typed.js Initialization
    const typedElement = document.querySelector(".typed-text");
    if (typedElement) {
        new Typed(".typed-text", {
            strings: [
                "Software Engineering Intern",
                "AI & ML Student",
                "Full-Stack Developer",
                "Problem Solver"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true
        });
    }

    // 2. Sticky Header Scroll Effect
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 3. Scroll Spy (Active Navigation Link Indicator)
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 160;
            const secHeight = sec.offsetHeight;
            if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });

    // 4. Mobile Menu Toggling
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");

    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", () => {
            navbar.classList.toggle("active");
            menuIcon.classList.toggle("bx-x");
        });

        // Close menu when clicking link items
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuIcon.classList.remove("bx-x");
            });
        });
    }

    // 5. Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Contact Form Validation and Mock Submit
    const contactForm = document.getElementById("contactForm");
    const formMsg = document.getElementById("formMsg");

    if (contactForm && formMsg) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            // Reset message styles
            formMsg.className = "form-message";
            formMsg.innerText = "";
            formMsg.style.display = "none";

            // Basic Field Validation
            if (!name || !email || !subject || !message) {
                formMsg.innerText = "Please fill in all fields.";
                formMsg.className = "form-message error";
                return;
            }

            // Email Address Format Regex Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMsg.innerText = "Please enter a valid email address.";
                formMsg.className = "form-message error";
                return;
            }

            // Disable submit button and show sending feedback
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending Message...";
            submitBtn.disabled = true;

            // Mocking API call with timeout delay
            setTimeout(() => {
                formMsg.innerText = "Thank you! Your message has been sent successfully.";
                formMsg.className = "form-message success";
                contactForm.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formMsg.innerText = "";
                    formMsg.className = "form-message";
                }, 5000);
            }, 1200);
        });
    }

});

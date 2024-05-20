// Mouse following
document.addEventListener('mousemove', function(event) {
    const follower = document.getElementById('follower');
    const mouseX = event.clientX - (follower.offsetWidth / 2); 
    const mouseY = event.clientY - (follower.offsetHeight / 2);
    follower.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});
// Mouse following ends

// scroll to top
var scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
};

scrollTopBtn.addEventListener('click', function() {
    const scrollDuration = 400;
    const scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function() {
        if (window.scrollY != 0) {
            window.scrollBy(0, scrollStep);
        } else clearInterval(scrollInterval);
    }, 15);
});

// IntersectionObserver to change button style on footer intersection
const footer = document.getElementById('footer');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            scrollTopBtn.classList.add('inverted');
        } else {
            scrollTopBtn.classList.remove('inverted');
        }
    });
}, {
    threshold: 0.1
});

observer.observe(footer);

// scroll to top ends

// Quick links scroll up
// Smooth scrolling to about section
document.getElementById("aboutBtn").addEventListener('click', function(event) {
    event.preventDefault();
    scrollToSection('second-section');
});

// Smooth scrolling to projects section
document.getElementById("projectsBtn").addEventListener('click', function(event) {
    event.preventDefault();
    scrollToSection('third-section');
});

// Function to scroll to a specific section smoothly
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const scrollDuration = 400;
    const targetPosition = section.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function scrollAnimation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        const elapsedTime = currentTime - startTime;
        const scrollProgress = Math.min(elapsedTime / scrollDuration, 1);
        window.scrollTo(0, startPosition + distance * scrollProgress);
        if (scrollProgress < 1) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    requestAnimationFrame(scrollAnimation);
}

// Initialising Lenis
const lenis = new Lenis();


function raf(time) {
  lenis.raf(time);   
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


// Initialising Lenis ends


// animations
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {

    // About, Projects and conclusion animation variables
    const sectionTitle1 = document.getElementById('section-title1');
    const aboutTitle = document.getElementById('about-title');
    const sectionTitle2 = document.getElementById('section-title2');
    const projectsTitle = document.getElementById('projects-title');
    const conclusion1 = document.getElementById('conclusion1');
    const conclusion2 = document.getElementById('conclusion2');    

    // Timeline for controlling the about animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#second-section",
            start: "top top",
            end: "bottom top",
            scrub: 1, 
            pin: true, 
            anticipatePin: 1 
        }
    });

    // Moving SECTION 1 text up and left
    tl.to(sectionTitle1, {
        xPercent: -50,
        yPercent: -400,
        opacity: 0,
        ease: "none"
    }, 0);

    // Scaling ABOUT ME text up from the center
    tl.fromTo(aboutTitle, {
        scale: 0.2,
        opacity: 0
    }, {
        scale: 2,
        opacity: 1,
        ease: "none"
    }, 0);

    const t2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#third-section",
            start: "top top",
            end: "bottom top",
            scrub: 1, 
            pin: true, 
            anticipatePin: 1
        }
    });

    // Moving SECTION 2 text up and left
    t2.to(sectionTitle2, {
        xPercent: -50,
        yPercent: -400,
        opacity: 0,
        ease: "none"
    }, 0);

    // Scaling PROJECTS text up from the center
    t2.fromTo(projectsTitle, {
        scale: 0.2,
        opacity: 0
    }, {
        scale: 2,
        opacity: 1,
        ease: "none"
    }, 0);


    // horizontal section scrolling
    const section_2 = document.getElementById("horizontal");
    let box_items = gsap.utils.toArray(".horizontal__item");

    let trigger = gsap.to(box_items, {
        xPercent: -100 * (box_items.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: section_2,
            pin: true,
            scrub: true,
            snap: false,
            start: "top top",
            end: () => "+=" + (box_items.length * window.innerWidth)
        }
    });

    const colLeft = document.getElementById('WhoAmI');
    const verticalSection = document.getElementById('vertical');
    const startStickingPoint = verticalSection.offsetTop; // Get the starting point of the vertical section\
    const endStickingPoint = verticalSection.offsetHeight + startStickingPoint - colLeft.offsetHeight; // Adjust end point calculation to account for the height of the sticky element

    function updatePosition() {
        const scrollY = window.scrollY;
        if (scrollY > startStickingPoint && scrollY < endStickingPoint) {
            // User is within the bounds where the column should be sticky
            colLeft.style.transform = `translateY(${scrollY - startStickingPoint}px)`;
        } else if (scrollY <= startStickingPoint) {
            // User is above the sticky region
            colLeft.style.transform = `translateY(0px)`;
        } else {
            // User has scrolled past the sticky region
            colLeft.style.transform = `translateY(${endStickingPoint - startStickingPoint - 100}px)`;
        }
    }

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    const t3 = gsap.timeline({
        scrollTrigger: {
            trigger: "#fourth-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    // Scaling conclusion1 (Thats it...) text up from the center
    t3.fromTo(conclusion1, {
        scale: 0.2,
        opacity: 0
    }, {
        scale: 1.7,
        opacity: 1,
        ease: "none"
    }, 0);

    const t4 = gsap.timeline({
        scrollTrigger: {
            trigger: "#fifth-section",
            start: "top top",
            end: "bottom top",
            scrub: 1, 
            pin: true, 
            anticipatePin: 1 
        }
    });

    // Scaling conclusion2 (For now...) text up from the center
    t4.fromTo(conclusion2, {
        scale: 0.2,
        opacity: 0
    }, {
        scale: 2,
        opacity: 1,
        ease: "none"
    }, 0);

    // progress bar
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

});

// redirect to project 1
function redirectToProject1() {
    window.open('https://github.com/aqualicious14/working-registration-system', '_blank');
}

// redirect to project 2
function redirectToProject2() {
    window.open('https://github.com/aqualicious14/pythonai', '_blank');
}

// redirect to project 3
function redirectToProject3() {
    window.open('https://github.com/aqualicious14/Cpp-wordle', '_blank');
}

// redirect to project 4
function redirectToProject4() {
    window.open('https://github.com/aqualicious14/tic-tac-toe-html', '_blank');
}

// redirect to project 5
function redirectToProject5() {
    window.open('https://github.com/aqualicious14/Pokedex', '_blank');
}


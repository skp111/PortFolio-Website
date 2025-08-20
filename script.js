document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once:true,
    duration:1000
  });
});

function menu() {
  const navbar = document.querySelector('.dropdown')
  navbar.style.display = "block"
}

function cancel() {
  const navbar = document.querySelector('.dropdown')
  navbar.style.display = "none"
}

const texts = [
  "Python Developer",
  "Web Developer",
  "Machine Learning Engineer"]

let speed = 100
const textElements = document.querySelector('.typewriter-text')
let textindex = 0
let characterindex = 0

function typewriter() {
  if (characterindex < texts[textindex].length) {
    textElements.innerHTML += texts[textindex].charAt(characterindex)
    characterindex++
    setTimeout(typewriter, speed)
  }
  else {
    setTimeout(eraseText, 1000)
  }
}

function eraseText() {
  if (textElements.innerHTML.length > 0) {
    textElements.innerHTML = textElements.innerHTML.slice(0, -1)
    setTimeout(eraseText, 50)
  }
  else {
    textindex = (textindex + 1) % texts.length
    characterindex = 0
    setTimeout(typewriter, 500)
  }
}
window.onload = typewriter

function toggleText() {
  const moreText = document.getElementById("moreText");
  const btn = document.getElementById("toggleBtn");

  if (moreText.style.display === "none" || moreText.style.display === "") {
    moreText.style.display = "inline";
    btn.textContent = "Read Less";
  }
  else {
    moreText.style.display = "none";
    btn.textContent = "Read More";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll(".skill-bar");

  skillBars.forEach((bar) => {
    const percentTextEl = bar.querySelector(".back p:last-child");
    const percentText = percentTextEl.textContent;   // e.g., "87%"
    const target = parseInt(percentText);            // e.g., 87

    const fill = bar.querySelector(".bar span");
    fill.style.width = "0%"; // start at 0

    let count = 0;
    const interval = setInterval(() => {
      if (count <= target) {
        fill.style.width = count + "%";                  // Fill bar
        percentTextEl.textContent = count + "%";         // Update number above
        count++;
      }
      else {
        clearInterval(interval);
      }
    }, 20); // You can adjust this speed (lower is faster)
  });
});

const percentElements = document.querySelectorAll(".percent");

percentElements.forEach((element) => {
  const outerCircle = element.parentElement.parentElement;

  // Store the two colors
  const main_color = '#00e0ff';     // Blue-sky color
  const hover_color = '#ffd700';    // Gold color
  const bg_color = '#333';          // Background gray

  let count = 0;
  let target = parseInt(element.getAttribute("data-target"));

  // Function to update the gradient
  const updateGradient = (color, degree) => {
    outerCircle.style.background = `conic-gradient(${color} ${degree}deg, ${bg_color} ${degree}deg)`;
  };

  // Initial interval animation
  const interval = setInterval(() => {
    if (count < target) {
      count++;
      element.textContent = count + "%";
      const degree = count * 3.6;
      updateGradient(main_color, degree);
    } else {
      clearInterval(interval);
    }
  }, 20);

  // Hover effect to switch to gold color
  outerCircle.parentElement.addEventListener("mouseenter", () => {
    const degree = count * 3.6;
    updateGradient(hover_color, degree);
  });

  // Remove hover effect
  outerCircle.parentElement.addEventListener("mouseleave", () => {
    const degree = count * 3.6;
    updateGradient(main_color, degree);
  });
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-container .links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // adjust offset for navbar
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default behavior

    const formData = new FormData(form);

    fetch("https://formspree.io/f/xeoknavz", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Show SweetAlert popup
          Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Thank you for contacting us.',
            showConfirmButton: false,
            timer: 2000
          });

          // Clear form
          form.reset();

          // Redirect after 2 seconds
          setTimeout(() => {
            window.location.href = "index.html"; // Replace with your homepage
          }, 2000);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong. Try again.',
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: error.message
        });
      });
  });
});
